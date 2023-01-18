# WoT tools discord bot

World of tanks discord bot which brings some interesting tools.

Features:

- Replay informations
- ... more to come

Needs [wot-replay-api](https://github.com/gabrielhamel/wot-replay-api) to work.

## Installation

```bash
npm i
```

## Environment variables

Can be a `.env` file

```bash
DISCORD_TOKEN=your_discord_token
REPLAY_API_URL=wot_replay_api_base_url # ex: http://localhost:8080
```

## Run (in dev)

```bash
npm run start:dev
```

## Run (in production)

```bash
npm run build
npm run start:prod
```
