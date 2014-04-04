var expect = require('./lib/args-expect'),
    chai = require('chai');

var assert = chai.assert,
    should = chai.should();

describe('should throw error if arg not has specific properties: ', function() {
    var obj;
    beforeEach(function() {
        obj = {
            a: 123,
            b: '123',
            c: { },
            d: [1, 2, 3],
            f: function() {},
            m: false,
            n: null,
            o: undefined

        };
    });

    it('has prop', function() {
        should.not.Throw(function() {
            expect(obj).has('a');
            expect(obj).has('b');
            expect(obj).has('c');
            expect(obj).has(['c', 'd', 'f']);
        });
        should.Throw(function() {
            expect(obj).has(['c', 'd', 'g']);
            expect(obj).has('g');
        });
    });

    it('can check prop type', function() {
        should.not.Throw(function() {
            expect(obj).has({
                a: Number,
                b: String,
                c: Object,
                d: Array,
                f: Function
            });
        });

        should.Throw(function() {
            expect(obj).has({
                a: Number,
                b: String,
                c: Object,
                d: Array,
                f: Number
            });

            expect(obj).has({
                a: Number,
                b: String,
                c: Object,
                d: Array,
                g: Function
            });
        });
    });

    it('can detct false', function() {
        should.not.Throw(function() {
            expect(obj).has('m');
        });

        should.Throw(function() {
            expect(obj).has('n');
            expect(obj).has('o');
            expect(obj).has('p');

        });
    });

});
