var expect = require('./lib/args-expect'),
    chai = require('chai');

var assert = chai.assert,
    should = chai.should();

describe('should throw error if arg is the specific Type: ', function() {
    it('is null or undefined', function() {
        should.not.Throw(function() {
            expect(null).is(null);
            expect(null).is(undefined);
        });
        should.Throw(function() {
            expect(123).is(null);
            expect('123').is(undefined);
        });
    });


    it('is native Type', function() {
        should.not.Throw(function() {
            expect(123).is(Number);
            expect('123').is(String);
        });
        should.Throw(function() {
            expect(123).is(Function);
            expect('123').is(Object);
        });
    });


    it('is instance of Class', function() {
        function Q() {}
        var item = new Q();

        should.not.Throw(function() {
            expect(Q).is(Function);
            expect(item).is(Q);
            expect(item).is(Object);
        });

        should.Throw(function() {
            expect(123).is(Q);
            expect(item).is(Function);
        });
    });

    it('instance', function() {
        should.Throw(function() {
            expect(123).is(123);
            expect('123').is('123');
        });
    });


    it('multi condition ', function() {
        should.not.Throw(function() {
            expect(123).is(String, Number);
            expect('123').is(String, Number);
        });

        should.Throw(function() {
            expect(123).is(Object);
        });
    });


});
