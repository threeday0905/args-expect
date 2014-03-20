var createExpect = function(onReject) {
    var chain = new ExpectChain(onReject);

    var expectFn = function(obj, name) {
        chain.start(obj, name);
        return chain;
    };

    expectFn.mode = function(keyOrFn) {
        return createExpect(
            rejectHandler.generate(keyOrFn)
        );
    };

    expectFn.enable = function() {
        ExpectChain.enable();
        return this;
    };
    expectFn.disable = function() {
        ExpectChain.disable();
        return this;
    };

    /* comment out the msg update method for reduce size
    expectFn.msg = function(msgs, type) {
        errorMessage.update(msgs, type);
        return this;
    };
    */

    return expectFn;
};
