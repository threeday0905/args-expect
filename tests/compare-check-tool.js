var expect = require('./lib/args-expect'),
    chai = require('chai');

var assert = chai.assert,
    should = chai.should();

describe('should throw error if arg not has specific properties: ', function() {

    it('can compare with equalTo Number', function() {
        should.not.Throw(function() {
            expect(1).equalTo(1);
        });
        should.Throw(function() {
            expect(1).equalTo(2);
            expect(1).equalTo('1');
        });
    });


    it('can compare with equalTo String', function() {
        should.not.Throw(function() {
            expect('1').equalTo('1');
        });
        should.Throw(function() {
            expect('1').equalTo('2');
            expect('1').equalTo(1);
        });
    });

    it('can compare with equalTo Boolean', function() {
        should.not.Throw(function() {
            expect(true).equalTo(true);
            expect(false).equalTo(false);
        });
        should.Throw(function() {
            expect(false).equalTo(true);
            expect(false).equalTo(null);
            expect(false).equalTo(undefined);
        });
    });

    it('can compare with equalTo Object', function() {
        should.not.Throw(function() {
            var obj = {};
            expect(obj).equalTo(obj);
        });
        should.Throw(function() {
            var obj1 = { a: 1 },
                obj2 = { a: 1 };

            expect(obj1).equalTo(obj2);
            expect(obj1).equalTo({a:1});
            expect({}).equalTo({});
        });
    });

    it('can compare with equalTo Null or Undefined', function() {
        should.not.Throw(function() {
            expect(null).equalTo(null);
            expect(undefined).equalTo(undefined);
        });

        should.Throw(function() {
            expect(null).equalTo(undefined);
            expect(undefined).equalTo(null);
        });
    });


});
