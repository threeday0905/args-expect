var expect = require('../lib/args-expect'),
    chai = require('chai');

var assert = chai.assert,
    should = chai.should();

describe('should call error handler correctly: ', function() {
    it('default mode: should throw error', function() {
        should.Throw(function() {
            expect(null).isString();
        });
    });

    it('none mode: should do nothing', function() {
        should.not.Throw(function() {
            var newExpect = expect.mode('none');
            newExpect(null).isString();
        });
    });


    it('log mode: should call console.warn', function() {
        var hasBeenCalled = false,
            actualWarn = console.warn;

        console.warn = function() {
            hasBeenCalled = true;
        };

        should.not.Throw(function() {
            var newExpect = expect.mode('log');
            newExpect(null).isString();
        });

        hasBeenCalled.should.equal(true);

        console.warn = actualWarn;
    });

    it('cutsomize mode: should call cutsomize function', function() {
        var hasBeenCalled = false;

        function onReject() {
            hasBeenCalled = true;
        }

        should.not.Throw(function() {
            var newExpect = expect.mode(onReject);
            newExpect(null).isString();
        });

        hasBeenCalled.should.equal(true);
    });
});
