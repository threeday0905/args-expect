var expect = require('../lib/args-expect'),
    chai = require('chai');

var assert = chai.assert,
    should = chai.should();

describe('should throw error if arg type is not as expect: ', function() {
    it('isObject - pass', function() {
        should.not.Throw(function() {
            expect(arguments).isObject();
        });
        should.not.Throw(function() {
            expect([1, 2, 3]).isObject();
        });
        should.not.Throw(function() {
            expect(function() {}).isObject();
        });
        should.not.Throw(function() {
            expect({}).isObject();
        });
    });

    it('isObject - fail', function() {
        should.Throw(function() {
            expect(null).isObject();
        });
        should.Throw(function() {
            expect(undefined).isObject();
        });
        should.Throw(function() {
            expect('str').isObject();
        });
        should.Throw(function() {
            expect(12).isObject();
        });
        should.Throw(function() {
            expect(true).isObject();
        });
    });

    it('isArray - pass', function() {
        should.not.Throw(function() {
            expect([1,2,3]).isArray();
        });
    });

    it('isArray - fail', function() {
        should.Throw(function() {
            expect(undefined).isArray();
        });
        should.Throw(function() {
            expect(arguments).isArray();
        });
        should.Throw(function() {
            expect('str').isArray();
        });
    });


    it('isString - pass', function() {
        should.not.Throw(function() {
            expect('str').isString();
        });
    });

    it('isString - fail', function() {
        should.Throw(function() {
            expect(undefined).isString();
        });
        should.Throw(function() {
            expect([1,2,3]).isString();
        });
        should.Throw(function() {
            expect({}).isString();
        });
    });


    it('isNumber - pass', function() {
        should.not.Throw(function() {
            expect(3 * 4 - 7 / 10).isNumber();
        });
        should.not.Throw(function() {
            expect(NaN).isNumber();
        });
        should.not.Throw(function() {
            expect(Infinity).isNumber();
        });
    });

    it('isNumber - fail', function() {
        should.Throw(function() {
            expect(undefined).isNumber();
        });
        should.Throw(function() {
            expect('12').isNumber();
        });
    });


    it('isBoolean - pass', function() {
        should.not.Throw(function() {
            expect(true).isBoolean();
        });
        should.not.Throw(function() {
            expect(false).isBoolean();
        });
    });

    it('isBoolean - fail', function() {
        should.Throw(function() {
            expect(undefined).isBoolean();
        });
        should.Throw(function() {
            expect('12').isBoolean();
        });
    });


    it('isFunction - pass', function() {
        should.not.Throw(function() {
            expect(function(){}).isFunction();
        });
    });

    it('isFunction - fail', function() {
        should.Throw(function() {
            expect(undefined).isFunction();
        });
        should.Throw(function() {
            expect({}).isFunction();
        });
    });


    it('isDate - pass', function() {
        should.not.Throw(function() {
            expect(new Date()).isDate();
        });
    });

    it('isDate - fail', function() {
        should.Throw(function() {
            expect(100).isDate();
        });
        should.Throw(function() {
            expect({}).isDate();
        });
    });


    it('isRegExp - pass', function() {
        should.not.Throw(function() {
            expect(/identity/).isRegExp();
        });
    });

    it('isRegExp - fail', function() {
        should.Throw(function() {
            expect(function() {}).isRegExp();
        });
        should.Throw(function() {
            expect({}).isRegExp();
        });
    });
});
