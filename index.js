module.exports = class Registration {
    constructor() {
        this.availableProviders = {};
        this.loadedProviders = {};
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
                this.availableProviders['closure-' + this.closureCount ++] = {register:provider}
                delete providerNames[key]

            } else if (typeof provider === 'object' && provider.hasOwnProperty('register')) {
                // pass the object as 
                this.availableProviders[key] = provider
            } else if(typeof provider === 'string'){
                try {
                    // Try to require the provider, if we cannot then just log the error.
                    this.availableProviders[key] = require(provider);
                } catch (err) {
                    console.log('[!] Failed to load provider [' + provider + ']');
                }
            }
            
        }

        // Loop through the providers
        for (let provider in this.availableProviders) {
            if (typeof this.availableProviders[provider].register !== 'function') {
                // If register isn't a function, don't try to run it...
                break;
            }
            
            // Run register
            let result = this.availableProviders[provider].register();
            
            // If it returns false don't load it.
            if (result == false) {
                break;
            }
            
            this.loadedProviders[provider] = result;
        }
    }
}

