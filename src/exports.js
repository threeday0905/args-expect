function definition() {
    return createExpect(
        rejectHandler.generate() // it will gen default throw handler
    );
}

if (typeof exports === 'object') {
    module.exports = definition();
} else if (root.KISSY && typeof root.KISSY.add === 'function') {
    KISSY.add(definition);
} else if (typeof root.define === 'function' && root.define.amd) {
    root.define(definition);
} else {
    root.expect = definition();
}
