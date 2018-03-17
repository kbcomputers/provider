module.exports = class Registration {
    constructor() {
        this.available = {};
        this.loaded = {};
        this.closureCount = 0;
    }
    
    register(providerNames) {
        if (typeof providerNames === 'string') {
            let [name, provider] = arguments
            
            providerNames = {};
            providerNames[name] = provider;
        }
        
        for (let key in providerNames) {
            let provider = providerNames[key];
            
            // Check if the provider is a function. if it is, accept it, and make it 
            // conform to the register style object
            if (typeof provider === 'function') {
                this.available['closure_' + this.closureCount ++] = {register:provider}
                delete providerNames[key]

            } else if (typeof provider === 'object' && provider.hasOwnProperty('register')) {
                // pass the object as 
                this.available[key] = provider
            } else if(typeof provider === 'string'){
                try {
                    // Try to require the provider, if we cannot then just log the error.
                    this.available[key] = require(provider);
                } catch (err) {
                    console.log('[!] Failed to load provider [' + provider + ']');
                }
            }
            
        }

        // Loop through the providers
        for (let provider in this.available) {
            if (typeof this.available[provider].register !== 'function') {
                // If register isn't a function, don't try to run it...
                break;
            }
            
            // Run register
            let result = this.available[provider].register();
            
            // If it returns false don't load it.
            if (result == false) {
                break;
            }
            
            this.loaded[provider] = result;
        }
    }
}

