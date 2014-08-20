var expect = require('./lib/args-expect'),
    chai = require('chai');

var assert = chai.assert,
    should = chai.should();

describe('should check multi args via all function', function() {

    it('with multi args', function() {
        should.not.Throw(function() {
            expect.all(1, 2, 3).isNumber();
            expect.all('a', 'b', 'c').isString().notEmpty();
            expect.all(1, 2, 3).notNull();
            expect.all([1, 2, 3]).isArray().notEmpty();
        });

        should.Throw(function() {
            expect.all(1, 2, '3').isNumber();
            expect.all('a', 'b', '').isString().notEmpty();
            expect.all(1, 2, null).notNull();
        });
    });


    it('with arguments object', function() {
        function testNumber() {
            expect.all(arguments).isNumber();
        }
        function testString() {
            expect.all(arguments).isString().notEmpty();
        }
        function testNotNull() {
            expect.all(arguments).notNull();
        }

        should.not.Throw(function() {
            testNumber(1, 2, 3);
            testString('a', 'b', 'c');
            testNotNull(1, 2, 3);
        });

        should.Throw(function() {
            testNumber(1, 2, '3');
            testString('a', 'b', '');
            testNotNull(1, 2, null);
        });
    });
});
