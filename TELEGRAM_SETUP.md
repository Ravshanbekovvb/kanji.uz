# Telegram Bot Setup for Help Page

## How to Setup Telegram Bot Integration

### Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Save the bot token you receive

### Step 2: Get Your Chat ID

1. Search for `@userinfobot` on Telegram
2. Send any message to get your user ID
3. Or add your bot to a group and get the group chat ID

### Step 3: Configure Environment Variables

1. Open `.env.local` file in your project root
2. Replace the placeholder values:
   ```env
   TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   TELEGRAM_CHAT_ID=1234567890
   ```

### Step 4: Test the Integration

1. Run your Next.js application
2. Go to `/help` page
3. Fill out the contact form
4. Submit the form
5. Check your Telegram for the message

## Features

- ✅ Contact form with validation
- ✅ Real-time form submission feedback
- ✅ Formatted Telegram messages
- ✅ FAQ section
- ✅ Multiple contact methods
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## API Endpoint

The help form sends data to `/api/help/send-message` which formats and forwards the message to your Telegram bot.
