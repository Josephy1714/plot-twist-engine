# Plot Twist Engine

**A browser-based arcade strategy game where the whole room votes to change the rules.**

Plot Twist Engine is an early multiplayer prototype for 2–6 players. Each pilot joins from a phone or computer with a room code, races a rover across a shared grid, collects energy fragments, and tries to reach the exit. Before each of the first three rounds, the room votes between two rule twists. Each winning twist stays active, so the fourth round combines the choices the group has made.

> **Prototype status:** This build is intended for local playtests and iteration. It has no accounts, persistent room storage, daily challenge, or global leaderboard yet. The leaderboard currently ranks players inside the active room.

## Features

- Room creation and joining with a five-character code; no login or installation.
- Rooms for 2–6 players, with a shared rover grid and host-controlled match start.
- Keyboard, arrow-key, and touch controls.
- Three collection rounds followed by a final round with all selected modifiers.
- Two-option group votes with a visible countdown and deterministic tie resolution.
- Server-side movement validation, fragment collection, exits, and scoring.
- Live room standings, score totals, and a same-room rematch.
- Responsive interface for mobile and desktop.
- A Render Blueprint for a free playtest deployment.

## How to play

1. One player creates a room and shares the code.
2. At least one more player joins; the host starts when the group is ready.
3. Vote for one of the two twists before each of the first three rounds. A vote lasts up to 18 seconds. If the group has not all voted when time expires, current votes are counted and ties are broken consistently for that room and round.
4. Move around the 11 × 8 grid, collect fragments, and reach the exit. Each round lasts up to 40 seconds. Walls and active rovers block movement.
5. Fragments are worth 10 points each; reaching the exit adds 25 points. Selected twists can change those values or movement.
6. The fourth round combines the twists selected earlier. Highest total score wins. Use **Rematch** to play again in the same room.

### Current rule twists

| Twist | Effect |
| --- | --- |
| Turbo Treads | Each move can glide one extra tile when the path is clear. |
| Rich Pockets | Fragments are worth 15 points instead of 10. |
| Edge Portal | Moving off one edge wraps the rover to the opposite edge. |
| Fragment Field | Two extra fragments appear each round. |
| Exit Boost | Reaching the exit is worth 40 bonus points instead of 25. |
| Corner Drift | Every second move can slide one extra tile. |

Modifiers persist once selected. If one appears again and wins another vote, it is not stacked twice.

## Run locally

Requires Node.js 20 or newer. There are no third-party runtime dependencies.

### Windows

```powershell
./Start-Game.ps1
```

### macOS, Linux, or any shell with Node.js

```sh
node server.js
```

Open [http://localhost:4173](http://localhost:4173). To play from other devices on the same Wi-Fi, use the host computer's LAN address with port `4173`, for example `http://192.168.1.20:4173`. The hosting computer must remain on and the server process must stay running.

## Deploy to Render

[`render.yaml`](render.yaml) configures a free Node web service in Singapore. The app listens on the `PORT` supplied by the host and exposes `/health` for service health checks.

1. Push this repository to a Git provider that your Render account can access.
2. In Render, create a **Blueprint** from the repository and review the service plan and region before applying it.
3. Wait for the first deploy, then open the generated `onrender.com` URL and create a room.
4. Share the URL and room code with players. HTTPS is provided by Render.

The free plan is for playtesting. Free web services may sleep when idle and may restart. Room state is held in server memory, so an instance restart or redeploy clears active rooms. Keep to a single service instance: the prototype does not share room state across servers. See [Render's free service limitations](https://render.com/docs/free).

## Technical overview

- `index.html` contains the responsive interface and browser-side game client.
- `server.js` serves the app and owns room state, voting, timers, movement checks, scoring, and rematches. The browser polls room state while connected.
- `package.json` defines the zero-dependency Node start command.
- `render.yaml` describes the hosted test service.

Room state is in memory and rooms expire after six hours while inactive. There is no database, identity verification, global score persistence, or anti-cheat system. Do not use this prototype for sensitive information or high-stakes competition.

## Playtest checklist

- How quickly do players understand the vote and each modifier?
- Do movement, collisions, and reaching the exit feel fair?
- Is 40 seconds long enough, and does voting feel brisk?
- Do accumulated modifiers make the final round exciting or confusing?
- Is the live leaderboard and score breakdown clear?
- Are reconnects, stale rooms, or mobile controls a problem?

The first follow-up improvement should target the clearest problem observed in a multi-player session.

## Roadmap

1. Playtest with a group and improve the core round loop from observed feedback.
2. Add seeded daily challenges with shareable links.
3. Add device-saved personal bests, then a persistent daily leaderboard with score validation.
4. Add room recovery and durable storage if rooms need to survive server restarts.
