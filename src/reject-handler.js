var rejectHandler = {
    methods: {
        'throw': function(msg) {
            throw new Error(msg);
        },
        log: function(msg) {
            if (console && console.log) {
                console.log(msg);
            }
        },
        none: function() {

        }
    },
    generate: function(keyOrFn) {
        var rejectFn,
            methods = this.methods;

        if (tools.isString(keyOrFn)) {
            rejectFn = methods[keyOrFn];
            if (!rejectFn) {
                methods.log('can not find the reject method: ' + keyOrFn);
                rejectFn = methods.none;
            }
        } else if (tools.isFunction(keyOrFn)) {
            rejectFn = keyOrFn;
        } else {
            rejectFn = methods['throw'];
        }

        return rejectFn;
    }
};
