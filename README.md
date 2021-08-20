# RBLXVerify
 
![Version](https://img.shields.io/npm/v/rblxverify?logo=npm) ![Downloads](https://img.shields.io/npm/dw/rblxverify?logo=npm) ![Discord](https://img.shields.io/discord/774121617240358932?logo=discord)

## Table of contents
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Support](#support)

## About
RBLXVerify allows you to easily interact with Roblox verification APIs, in a simple npm package. You can switch between the `Bloxlink`, `RoVer`, `RoWifi` and `RBXBolt` APIs, with almost zero code changes. You don't even need to make a seperate request to get the user's Roblox username.

## Installation
Use the package manager [npm](https://www.npmjs.com/) to install rblxverify:

```bash
npm install rblxverify
```

## Usage
```js
const rblxverify = require('rblxverify');

(async () => {
    try {
        console.log(await rblxverify.bloxlink('discordid'));
        console.log(await rblxverify.rover('discordid'));
        console.log(await rblxverify.rowifi('discordid'));
        console.log(await rblxverify.rbxbolt('discordid', 'apikey'));
    }
    catch (error) {
        console.log(error);
    }
})();
```

## Schemas

### Success
```js
{
    status: 'success',
    robloxID: 123456789,
    robloxUsername: 'robloxUsername'
}
```

### Error
```js
{
    status: 'error',
    errorCode: 123,
    errorType: 'bloxlink', //Can be verification api name, roblox or node
    error: 'There was an error.', //The formatted error. May be null.
    rawError: { status: 'error', error: 'There was an error.' } //The raw error. May be null.
}
```

## Functions

### .services
#### Example:
```js
let services = rblxverify.services;
console.log(services); //An array of possible verification services
```

### .bloxlink()
#### Params: 
* discordid
* guildid: (optional)
#### Example:
```js
(async () => {
    try {
        let request = await rblxverify.bloxlink('discordid', 'guildid');
        console.log(request);
    }
    catch (error) {
        console.log(error);
    }
})();
```

### .rover()
#### Params: 
* discordid
#### Example:
```js
(async () => {
    try {
        let request = await rblxverify.rover('discordid');
        console.log(request);
    }
    catch (error) {
        console.log(error);
    }
})();
```

### .rowifi()
#### Params: 
* discordid
* guildid: (optional)
#### Example:
```js
(async () => {
    try {
        let request = await rblxverify.rowifi('discordid', 'guildid');
        console.log(request);
    }
    catch (error) {
        console.log(error);
    }
})();
```

### .rbxbolt()
#### Params: 
* discordid
* apikey
#### Example:
```js
(async () => {
    try {
        let request = await rblxverify.rbxbolt('discordid', 'apikey');
        console.log(request);
    }
    catch (error) {
        console.log(error);
    }
})();
```

## Support
If you need any help with this package, you can join my [discord server](https://discord.com/invite/AY7WHt4Nrw).