var createExpect = function(onReject) {
    var chain = new ExpectChain(onReject);

    var expectFn = function(obj, name) {
        chain.reset();
        chain.transfer(obj, name);
        return chain;
    };

    expectFn.mode = function(keyOrFn) {
        return createExpect(
            rejectHandler.getOrCreate(keyOrFn)
        );
    };

    expectFn.msg = function(msgs, type) {
        errorMessage.update(msgs, type);
        return this;
    };

    return expectFn;
};
