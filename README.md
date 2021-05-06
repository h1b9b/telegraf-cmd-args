# telegraf-cmd-args

This is a plugin for the [Telegraf](http://telegraf.js.org/) Telegram
Bot Framework.

It provides a middleware that splits a command in a Telegram text message.  
The parsed command is stored in `ctx.state.command`.

For example, if your text message is `/start Hello world!`, the
`ctx.state.command` will be set to:
```json
{
  "text": "/start Hello world!",
  "command": "start",
  "args": "Hello world!",
  "splitArgs": ["Hello", "world!"],
}
```

## installation

```bash
npm install telegraf-cmd-args
```

## Usage

```javascript
const { Telegraf } = require('telegraf');
const commandMiddleware = require('telegraf-cmd-args');

app.use(commandMiddleware);
```