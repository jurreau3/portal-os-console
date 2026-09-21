# BE-MAX Portal (Interactive Module)

An audio-reactive, holographic portal interface designed for Portal-OS.
Built with TypeScript, Three.js, Cloudflare Workers, Durable Objects, and Hono.

## Features
- Twin-ring holographic portal
- Vertical energy beam with dynamic opacity
- BE-MAX text rendered in neon cyan
- Audio-reactive modulation (bass → rotation, treble → shimmer)
- Interaction layer (hover, click, OS events)
- Cloudflare Worker backend for state sync
- Portal-OS console integration

## Installation
npm install
npm run dev

## Build
npm run build

## Deploy (Cloudflare)
wrangler publish

## File Structure
See /src for core logic:
- core/portal.ts → Three.js scene
- core/audio.ts → audio-reactive engine
- core/interactions.ts → user + OS events
- os/worker.ts → Cloudflare Worker API
- os/durable.ts → Durable Object state
- ui/console-frame.tsx → Portal-OS integration

## Portal-OS Events
POST /portal/update
GET /portal/state

## License
MIT
