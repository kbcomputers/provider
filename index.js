module.exports = class Registration {
    constructor() {
        this.availableProviders = [];
        this.closureCount = 0;
    }
    
    register(providerNames) {
        if (!Array.isArray(providerNames)) {
            providerNames = [providerNames];
        }
        let providers = providerNames.map(provider => {
            let p = {}
            
            if (typeof provider === 'function') {
                p['closure-' + this.closureCount ++] = {register:provider}
            } else if (typeof provider === 'object') {
                p['closure-' + this.closureCount ++] = provider
            } else {
                p[provider] = require(provider);
            }
            
            return p;
        }).reduce((f,s) => (Object.assign(f,s)))

        for (let provider in providers) {
            if (
                providers[provider].hasOwnProperty('register') && 
                typeof providers[provider].register === 'function' &&
                providers[provider].register() !== false
            ) {
                this.availableProviders.push(provider);
            }
        }
    }
}

