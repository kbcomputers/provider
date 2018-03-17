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
        
        assert.isTrue(Provider.available.hasOwnProperty('TestProvider'))
        assert.isTrue(typeof Provider.available.TestProvider === 'object')
        
        done()
    });
    
    it('has an available provider from a string.', function testSlash(done) {
        Provider.register('TestProvider', './tests/TestProvider')
        
        assert.isTrue(Provider.loaded.hasOwnProperty('TestProvider'))
        
        done()
    });
    
    
    it('can register the closure provider.', function testSlash(done) {
        Provider.register({
            register() {}
        })

        assert.isTrue(Provider.available.hasOwnProperty('closure_0'))
        
        done()
    });
    
    it('does not register the closure provider if it returns false', function testSlash(done) {
        Provider.register({
            'TestProviderNoLoad':'./tests/TestProviderNoLoad'
        })

        assert.isTrue(Provider.available.hasOwnProperty('TestProviderNoLoad'))
        assert.isFalse(Provider.loaded.hasOwnProperty('TestProviderNoLoad'))
        assert.isTrue(Object.keys(Provider.loaded).length === 0)
        
        done()
    });
    
});