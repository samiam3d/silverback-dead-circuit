const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const html = readFileSync(new URL('../index.html', `file://${__filename}`), 'utf8');
const lifecycle = html.slice(html.indexOf('let AC = null, master, noiseBuf;'), html.indexOf('function initAudio()'));

function setup() {
  const windowEvents = new Map(), documentEvents = new Map();
  const calls = [];
  const context = { state: 'running',
    async suspend() { await Promise.resolve(); this.state = 'suspended'; calls.push('suspend'); },
    async resume() { await Promise.resolve(); this.state = 'running'; calls.push('resume'); },
    async close() { this.state = 'closed'; calls.push('close'); },
  };
  const document = { hidden: false, hasFocus: () => true,
    addEventListener: (name, fn) => documentEvents.set(name, fn),
  };
  const sandbox = vm.createContext({ document, Promise, context,
    addEventListener: (name, fn) => windowEvents.set(name, fn),
    Music: { stop: () => calls.push('stop-music') },
    masterNode: { disconnect: () => calls.push('disconnect') },
  });
  vm.runInContext(lifecycle, sandbox);
  vm.runInContext('AC = context; master = masterNode;', sandbox);
  return { context, calls, document,
    emit: (name, event = {}) => windowEvents.get(name)(event),
    visibility: () => documentEvents.get('visibilitychange')(),
    settled: () => vm.runInContext('audioStateChange', sandbox),
  };
}

test('silences all audio on blur and resumes only after focus returns', async () => {
  const h = setup();
  h.emit('blur'); await h.settled();
  assert.equal(h.context.state, 'suspended');
  h.emit('focus'); await h.settled();
  assert.equal(h.context.state, 'running');
  assert.deepEqual(h.calls, ['suspend', 'resume']);
});

test('hidden tabs stay silent even if a focus event arrives', async () => {
  const h = setup();
  h.document.hidden = true; h.visibility(); h.emit('focus'); await h.settled();
  assert.equal(h.context.state, 'suspended');
  h.document.hidden = false; h.visibility(); await h.settled();
  assert.equal(h.context.state, 'running');
});

test('rapid focus changes settle in the latest state', async () => {
  const h = setup();
  h.emit('blur'); h.emit('focus'); h.emit('blur'); await h.settled();
  assert.equal(h.context.state, 'suspended');
  h.emit('focus'); await h.settled();
  assert.equal(h.context.state, 'running');
});

test('back-forward cache suspends audio and restores it on pageshow', async () => {
  const h = setup();
  h.emit('pagehide', { persisted: true }); await h.settled();
  assert.equal(h.context.state, 'suspended');
  assert.ok(!h.calls.includes('close'));
  h.emit('pageshow'); await h.settled();
  assert.equal(h.context.state, 'running');
});

test('leaving the page clears music scheduling and disconnects and closes audio', async () => {
  const h = setup();
  h.emit('pagehide', { persisted: false }); await h.settled();
  assert.equal(h.context.state, 'closed');
  assert.deepEqual(h.calls, ['stop-music', 'disconnect', 'close']);
  h.emit('focus'); await h.settled();
  assert.equal(h.context.state, 'closed');
});
