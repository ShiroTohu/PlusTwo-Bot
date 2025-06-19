# +2 Bot
Inspired by [Jerma985](https://www.twitch.tv/jerma985).

![example gif](./docs/example.gif)
Inspired by [Jerma985](https://www.twitch.tv/jerma985).

## Overview
The +2 Bot is a Discord bot that tracks the number of +2s and -2s among users.

This bot was inspired by Jerma's stream where he and Etalyx set out to beat Kane and Lynch 2: Dog Days in just under four hours. For every funny joke they made, two minutes were added to the timer; for every unfunny joke, two minutes were subtracted. The chat would spam "+2" or "-2" to voice their opinions on whether a joke was good or bad. Jerma and Etalyx beat the game with just 45 seconds remaining.

## Installation
This bot is supported by all major operating system

 - [Windows](./docs/installation/Windows.md)
 - [MacOS](./docs/installation/MacOS.md)
 - [Linux](./docs/installation/Ubuntu.md)

## Environment variables in .env file
The required environment variables
- `DISCORD_TOKEN`

Non-essential environment variables (used for production)
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_TEST_HOST`
- `CLIENT_ID`
