/* jshint unused: false, -W079 */
var rejectHandler = {
    methods: {
        'throw': function(msg) {
            var err =  new Error(msg);
            if (tools.isString(err.stack)) {
                err.stack =
                    err.stack.replace(/^ *at.+args-expect.js.+\n/gm, '');
            }
            throw err;
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
                methods.log('failed to find the reject method: ' + keyOrFn);
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
