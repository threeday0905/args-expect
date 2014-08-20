var expect = require('./lib/args-expect');

require('chai').should();

describe('stack filter', function() {
    beforeEach(function() {
        expect.enable();
        expect.mode('throw');
    });

    function getFirstStack(err) {
        return /at.+\n/.exec(err.stack)[0];
    }

    it('should not be displayed confusing stack', function() {
        var firstStack;
        try {
            expect(undefined).notNull();
        } catch (ex) {
            firstStack = getFirstStack(ex);
        }

        /*
          before modified:
            at rejectHandler.methods.throw (args-expect/test/lib/args-expect.js:206:19)
            at ExpectChain.reject (args-expect/test/lib/args-expect.js:282:17)
            at check (args-expect/test/lib/args-expect.js:245:22)
            at ExpectChain.notNull (args-expect/test/lib/args-expect.js:261:21)
            ...

          afeter modified
            at Context.<anonymous> (args-expect/test/stack-filter.js:20:31)
            ...

        */


        firstStack.should.contain('stack-filter.js');
        firstStack.should.not.contain('args-expect.js');
        //console.log(firstStack);
    });

});
