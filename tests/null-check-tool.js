var expect = require('./lib/args-expect'),
    chai = require('chai');

var assert = chai.assert,
    should = chai.should();

describe('should throw error if arg is not pass the null check: ', function() {
    it('isEmpty - pass', function() {
        should.not.Throw(function() {
            expect(null).isEmpty();
        });
        should.not.Throw(function() {
            expect(undefined).isEmpty();
        });
        should.not.Throw(function() {
            expect([]).isEmpty();
        });
        should.not.Throw(function() {
            expect('').isEmpty();
        });

        should.not.Throw(function() {
            expect().isEmpty();
        });

    });

    it('isEmpty - fail', function() {
        should.Throw(function() {
            expect({ a: 1 }).isEmpty();
        });
        should.Throw(function() {
            expect([1]).isEmpty();
        });
        should.Throw(function() {
            expect('str').isEmpty();
        });
    });

    it('notEmpty - pass', function() {
        should.not.Throw(function() {
            expect(1).notEmpty();
        });
        should.not.Throw(function() {
            expect('1').notEmpty();
        });
        should.not.Throw(function() {
            expect(function() {}).notEmpty();
        });
        should.not.Throw(function() {
            expect(/1234/).notEmpty();
        });
        should.not.Throw(function() {
            expect({a:1}).notEmpty();
        });
        should.not.Throw(function() {
            expect(false).notEmpty();
        });
    });

    it('notEmpty - fail', function() {
        should.Throw(function() {
            expect(undefined).notEmpty();
        });
        should.Throw(function() {
            expect(null).notEmpty();
        });
        should.Throw(function() {
            expect('').notEmpty();
        });
    });


    it('isNull - pass', function() {
        should.not.Throw(function() {
            expect(null).isNull();
        });
        should.not.Throw(function() {
            expect(undefined).isNull();
        });
    });

    it('isNull - fail', function() {
        should.Throw(function() {
            expect({}).isNull();
        });
        should.Throw(function() {
            expect(function(){}).isNull();
        });
        should.Throw(function() {
            expect('').isNull();
        });
        should.Throw(function() {
            expect(0).isNull();
        });
        should.Throw(function() {
            expect(false).isNull();
        });
        should.Throw(function() {
            expect({}).isNull();
        });
    });

    it('notNull - pass', function() {
        should.not.Throw(function() {
            expect({}).notNull();
        });
        should.not.Throw(function() {
            expect(function(){}).notNull();
        });
        should.not.Throw(function() {
            expect('').notNull();
        });
        should.not.Throw(function() {
            expect(0).notNull();
        });
        should.not.Throw(function() {
            expect(false).notNull();
        });
        should.not.Throw(function() {
            expect({}).notNull();
        });
    });

    it('notNull - fail', function() {
        should.Throw(function() {
            expect(null).notNull();
        });
        should.Throw(function() {
            expect(undefined).notNull();
        });
    });


});
