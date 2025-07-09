<h1 align="center">Plus Two Bot</h1>

<p align="center">
  <a href="https://github.com/ShiroTohu/PlusTwo-Bot/blob/main/LICENSE.txt">
    <img src="https://img.shields.io/badge/GPL--3.0-red?style=for-the-badge" alt="LICENSE">
  </a>
  
  <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" alt="PYTHON">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NODEJS">
</p>

![example gif](./docs/example.gif)

Inspired by [Jerma985](https://www.twitch.tv/jerma985).



## Overview
The +2 Bot is a Discord bot that tracks the number of +2s and -2s among users.

This bot was inspired by Jerma's stream where he and Etalyx set out to beat Kane and Lynch 2: Dog Days in just under four hours. For every funny joke they made, two minutes were added to the timer; for every unfunny joke, two minutes were subtracted. The chat would spam "+2" or "-2" to voice their opinions on whether a joke was good or bad. Jerma and Etalyx beat the game with just 45 seconds remaining.

## Installation
This bot is supported by all major operating systems

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
