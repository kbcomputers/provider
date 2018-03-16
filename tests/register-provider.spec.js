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
        Provider.register({
            'TestProvider': './tests/TestProvider'
        })
        
        assert.isTrue(Provider.availableProviders.hasOwnProperty('TestProvider'))
        assert.isTrue(typeof Provider.availableProviders.TestProvider === 'object')
        
        done()
    });
    
    it('has an available provider from a string.', function testSlash(done) {
        Provider.register('TestProvider', './tests/TestProvider')
        
        assert.isTrue(Provider.loadedProviders.hasOwnProperty('TestProvider'))
        
        done()
    });
    
    
    it('can register the closure provider.', function testSlash(done) {
        Provider.register({
            register() {}
        })

        assert.isTrue(Provider.availableProviders.hasOwnProperty('closure-0'))
        
        done()
    });
    
    it('does not register the closure provider if it returns false', function testSlash(done) {
        Provider.register({
            'TestProviderNoLoad':'./tests/TestProviderNoLoad'
        })

        assert.isTrue(Provider.availableProviders.hasOwnProperty('TestProviderNoLoad'))
        assert.isFalse(Provider.loadedProviders.hasOwnProperty('TestProviderNoLoad'))
        assert.isTrue(Object.keys(Provider.loadedProviders).length === 0)
        
        done()
    });
    
});