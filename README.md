# What is @kbco/provider?

Well it's a way to simply define plugins for your package, and register them in a special order.

## How to use?
```js
const Registration = require('@kbco/provider');

const Provider = new Registration();

// Provider will register every service in the order you list them in.
Provider.register({
    'TestProvider': './tests/TestProvider',
    'terminal': '@re-base/termianl',
    'customProvider': {
        register() {
        
        }
    }
})
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
        // Returning an object binds the objects to the registered service making
        // them more globally accessable.
        return router
    }
}
```

With Provider, you can register packages that export a register method on an object, or you can register personal packages, or even new classes with just a register method. 

I tried to keep it simple, amd easy to use. If you have suggestions for how we can improve the way this works, make a PR or you can make an issue. :smile:
