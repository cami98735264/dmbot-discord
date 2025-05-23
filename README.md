# Discord Selfbot Group Manager

A Discord selfbot that helps manage group DMs by implementing a voting system to remove members. This bot uses Discord.js Selfbot v13 and requires specific permissions to function.

## ⚠️ Important Note
This bot uses Discord.js Selfbot, which is against Discord's Terms of Service. Use at your own risk.

## Features

- Group DM member removal through voting system
- Command-based interface
- Reaction-based voting system
- Time-limited polls
- Owner-only evaluation command

## Commands

- `/sacar @user` - Initiates a vote to remove a user from the group
  - Requires 4 positive reactions (✅) to pass
  - Poll lasts for 7 minutes
  - Cannot remove group owner or yourself
- `/eval` - Owner-only command for evaluating JavaScript code

## Prerequisites

- Node.js installed
- Discord account
- Group DM access

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the following variables:
```
TOKEN=your_discord_token
ALLOWED_GROUP=your_group_dm_id
OWNERID=your_discord_id
```

## Usage

1. Start the bot:
```bash
node index.js
```
2. In your group DM, use the `/sacar @user` command to initiate a removal vote
3. Members can react with ✅ to approve or ❌ to reject
4. If 4 or more members approve, the user will be removed

## Dependencies

- discord.js-selfbot-v13: ^2.15.0
- dotenv: ^16.3.1

## Security

- The bot requires a Discord token to operate
- Keep your token secure and never share it
- The eval command is restricted to the owner only

## License

This project is for educational purposes only. Use responsibly and in accordance with Discord's Terms of Service.
