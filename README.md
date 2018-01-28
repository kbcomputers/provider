# What is @kbco/provider?

Well it's a way to simply define plugins for your package, and register them in a special order.

## How to use?
```node
const Registration = require('@kbco/provider');

const Provider = new Registration();

// Provider will register every service in the order you list them in.
Provider.register([
    './tests/TestProvider',
    '@re-base/termianl',
    {
        register() {
        
        }
    }
])
```

The following is an example service provider which would register two routes with express.
```js
// AuthServiceProvider.js

const express = require('express')

const app = express()

const router = require('@kbco/router')(app);

module.exports = {
    register() {
        router.get('/register', (req, res) => ('Register an account!!'))
        router.get('/login', (req, res) => ('Log into your account!!'))
    }
}
```

With Provider, you can register packages that export a register method on an object, or you can register personal packages, or even new classes with just a register method. 

I tried to keep it simple, amd easy to use. If you have suggestions for how we can improve the way this works, make a PR or you can make an issue. :smile:
