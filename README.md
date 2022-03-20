<h1 align="center">Telegram Framework</h1>
<div align="center">

Build scalable telegram bots with NODE.JS
</div>

## Philosophy

Framework handles user message events and identification by itself and provides some functionality called `routes` similar to web routes we use in browser.

So, in this case we have a bunch of endpoints tha user can navigate. Also, we can easily specify logic behind each endpoint similar to http server apps with express.

## Setup

Set up project with [create-telegram-app](https://github.com/alexandrmaliovaniy/create-telegram-app)


## Usage


#### Create Bot instance

```javascript
const { Bot } = require('telegram-framework');
const bot = new Bot(<TELEGRAM_TOKEN>, <STORAGE>, <OPTIONS>);

// TELEGRAM_TOKEN   -> bot token you get from @BotFather
// STORAGE          -> Any javascript object that implements method 'async Get' (returns user data by id) and 'async Set' (set user data to database)
// OPTIONS          -> Constructor options: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node-telegram-bot-api/index.d.ts#L100
```

#### Create and register routers

```javascript
// main.router.js
const { Router } = require('telegram-framework');

const main = new Router();

main.on(<path>, (reqeust, response) => {
    // ...code
});
module.exports = main;
```
```javascript
// index.js
const main = require('/path/main.router.js');
// ... bot init

bot.use(<prefix>, main);
```

```javascript
const main = new Router();

main.on("/", (req, res) => {
    // fires when user location: '/'
});

main.on("/foo", (req, res) => {
    // fires when user location: '/foo'
});

main.on("/menu/*", (req, res) => {
    // fires when user location: '/menu/and no matter what text is placed here'
    // req.body = 'and no matter what text is placed here'
});

main.on("/user/:id", (req, res) => {
    // fires when user location: '/user/and no matter what text is placed here'
    // req.body.id = 'and no matter what text is placed here'
});
```

#### Middlewares

```javascript
const main = new Router();
const middleware = (req, res, next) => {
    if (req.message.from.id % 2 === 0) next(); // pass next if userId % 2 === 0
    res.message("No luck :(");
}
main.on("/", middleware, (req, res) => {
    res.reply("Lucky one!");
});
```

#### Router middlewares

```javascript
const main = new Router();

main.useMiddleware((req, res, next) => {
    console.log(`User ${req.message.chat.id} -> ${req.message.text}`) // logger fires every time any route in router is triggered
    next();
})
```

#### Handle user input

```javascript
const main = new Router();

main.on('/', (req, res) => {
    const msg = req.message.text;
    switch (msg) {
        case "Hi!":
        case "Hello!":    
            res.message("Hello");
            break;
        case "Bye!":    
            res.message("See you");
            break;
        default:
            res.message("...");
    }
})

// OR

main.on('/', (req, res) => {
    req.match(
        "Hi!",
        "Hello!",
        () => res.message("Hello"),
        "Bye!",
        () => res.message("See you"),
        "default",
        () => res.message("...")
    
    )
})

```
#### Routing

```javascript
const main = new Router();

main.on('/', (req, res) => {
    res.push('there');
})
main.on('/there', (req, res) => {
    res.redirect('/home');
})

main.on('/404', (req, res) => {
    res.pushBack();
})
```

#### Keyboard

```javascript
const { ReplyKeyboard } = require('telegram-framework');
const main = new Router();


const buttons = [
    ["Home", "User"],
    ["About Us", "Help"]
];

const keyboard = new ReplyKeyboard(buttons);

main.on('/', (req, res) => {
    res.push('Menu:', keyboard);
})
```
