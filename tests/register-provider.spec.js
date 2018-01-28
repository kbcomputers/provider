var request = require('supertest');
var chai = require('chai');

var assert = chai.assert;

describe('Registering the providers', function () {
    var Registration;
    
    beforeEach(function () {
        Registration = require('../');
        Provider = new Registration();
    });
    
    afterEach(function () {
        Provider = null;
        Registration = null;
    });
    
    it('has an available provider.', function testSlash(done) {
        Provider.register([
            './tests/TestProvider'
        ])
        
        assert.isTrue(Provider.availableProviders.includes('./tests/TestProvider'))
        
        done()
    });
    
    it('has an available provider from a string.', function testSlash(done) {
        Provider.register('./tests/TestProvider')
        
        assert.isTrue(Provider.availableProviders.includes('./tests/TestProvider'))
        
        done()
    });
    
    
    it('can register the closure provider.', function testSlash(done) {
        Provider.register({
            register() {}
        })

        assert.isTrue(Provider.availableProviders.includes('closure-0'))
        
        done()
    });
    
});