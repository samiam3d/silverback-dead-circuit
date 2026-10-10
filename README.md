# Silverback: Dead Circuit

A horror comic-book escape game made with Three.js. You play an escaped lab gorilla climbing three sub-levels of Kessler Robotics. On each floor a different machine hunts you through the dark. You'll free the other caged animals along the way, and each one gives you a new power.

## Play

Open `index.html` in a browser. It's a single file that loads Three.js and fonts from a CDN. Or serve it locally:

```bash
python3 -m http.server 8000
```

## Controls

| Input | Action |
|---|---|
| WASD / arrows | Move |
| Mouse | Aim (your headlamp follows the cursor) |
| Click | Attack / fire (hold to charge the Mega Cannon) |
| Hold right-click / Shift | Sprint |
| Tap right-click / Q | Dash, 2-second cooldown (boots make it go farther) |
| Space | Roar: stuns the hunter if it's close |
| F | Ground pound (needs the hammer) |
| R | Rhino stampede (needs the rhino): smashes cracked walls and gores the hunter |
| 1-5 / wheel | Switch weapons |
| M / N | Toggle music / all sound |

## Mobile

Touch devices get twin-stick controls automatically. Landscape is best, but portrait works too.

| Touch | Action |
|---|---|
| Left thumb, drag anywhere on the left half | Move. Push to the edge to sprint |
| Right thumb, drag anywhere on the right half | Aim and fire, with a little aim assist toward the hunter and generators |
| Right thumb, quick tap | Single attack |
| DASH / ROAR / POUND / RHINO buttons | Abilities |
| Weapon icons | Tap to switch |
| 🔊 | Sound on/off |

On iPhone, turn off silent mode to hear the audio. You can use "Add to Home Screen" to play it full-screen like an app.

## Floors

| Floor | Hunter | What you do |
|---|---|---|
| Sub-level 3: The Cages | **HOLLOW-9**, a skeletal humanoid that stalks you, stares, then lunges. Fires lasers once it's damaged | Wrench, then red key, then the red vault (hammer, parrot, blue key), then the blue vault (blaster, yellow key), then the core room (Mega Cannon, dash boots) |
| Sub-level 2: The Menagerie | **SPINDLE**, a six-legged crawler that pounces. It's shielded until both generators are smashed | Red key, then the rhino pen and the first generator. Rhino-charge the cracked wall to reach the blue key, then the owl pen and the second generator |
| Sub-level 1: The Core | **COLOSSUS**, a giant that stomps and fires laser bursts. It can't fit through narrow doorways | Red key, then three coolant valves (one is behind a cracked wall). Then bring it down |

Destroy each hunter to power up the elevator in its charging bay.

## Animal friends

- **Parrot**: rides on your shoulder and squawks when the hunter is close or behind you. It also shows the hunter on the minimap at all times
- **Rhino**: press R to call a stampede that smashes cracked walls, wrecks generators, and stuns bosses
- **Owl**: night vision. Blackouts are less dark, your headlamp is wider, and the whole map is revealed

## Story

Between floors there are comic-book pages: an intro, two interludes, and an epilogue. The panels are rendered live from the game's own 3D models through the same comic shader.

## Horror

- **Jump scares**: the camera slams into the hunter's face. Each hunter has its own layered sound: a sub-bass drop, a distorted impact, a dissonant shrieking cluster, a metal screech, a robotic stutter, and a ringing tinnitus tail
- **Dread silence**: when something is close and you can't see it, the music drops out and a sour drone creeps in
- **Blackouts**: the power cuts out at random and when you grab keys, and the hunter repositions while it's dark
- **Stalking**, a **heartbeat**, **headlamp flicker**, **phantom noises**, and a **fog-of-war minimap**

## Audio

Everything is synthesized live with Web Audio. There are no audio files.

- **Adaptive score**: each floor has its own key and tempo. It moves from calm (a music box and pads), to tension (a pulsing bass and a ticking clock), to chase (drums, arpeggios and a screeching lead) depending on whether the hunter is near and whether it can see you
- **Ambience**: wind through the vents, generator hum, the hunter's servo whine, your footsteps and breathing, and the animals chattering

## Art style

Toon shading with ink outlines from depth creases, halftone dots, cross-hatched shadows, and Spider-Verse-style color misregistration that gets stronger out of focus.
