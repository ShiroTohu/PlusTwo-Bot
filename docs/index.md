# +2 Discord Bot Documentation

![example gif](./example.gif)
Inspired by [Jerma985](https://www.twitch.tv/jerma985).

## Overview
The +2 Bot is a Discord bot that tracks the number of +2s and -2s among users.

This bot was inspired by Jerma's stream where he and Etalyx set out to beat Kane and Lynch 2: Dog Days in just under four hours. For every funny joke they made, two minutes were added to the timer; for every unfunny joke, two minutes were subtracted. The chat would spam "+2" or "-2" to voice their opinions on whether a joke was good or bad. Jerma and Etalyx beat the game with just 45 seconds remaining.

<iframe width="1266" height="712" src="https://www.youtube.com/embed/KSp3Q_jvGGs" title="The Kane and Lynch Challenge" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Installation
This bot is supported by all major operating systems

 - [Windows](installation/Windows.md)
 - [MacOS](installation/MacOS.md)
 - [Linux](installation/Ubuntu.md)

## Environment variables in .env file
The required environment variables

```
DISCORD_TOKEN =
CLIENT_ID = 
```

Non-essential environment variables (used for production)
```
// not required
DB_NAME = 
DB_USER = 
DB_PASSWORD = 
DB_HOST = 
DB_TEST_HOST = 
CLIENT_ID = 
```
