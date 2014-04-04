var createExpect = function(onReject) {
    var chain = new ExpectChain(onReject);

    var expectFn = function(obj, name) {
        return chain.start(obj, name);
    };

    expectFn.all = function() {
        var args = arguments;
        if (args.length === 1 && tools.isArguments(args[0])) {
            args = args[0];
        }
        return chain.all.apply(chain, args);
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
