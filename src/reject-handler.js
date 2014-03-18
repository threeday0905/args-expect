var rejectHandler = {
    methods: {
        'throw': function(msg) {
            throw new Error(msg);
        },
        log: function(msg) {
            if (console) {
                if (console.warn) {
                    console.warn(msg);
                } else if (console.log) {
                    console.log(msg);
                }
            }
        },
        none: function(msg) {

        }
    },
    getOrCreate: function(keyOrFn) {
        var rejectFn,
            methods = this.methods;

        if (typeof keyOrFn === 'string') {
            rejectFn = methods[keyOrFn];
            if (!rejectFn) {
                methods.log('can not find the reject method: ' + keyOrFn);
            }
        } else if (typeof keyOrFn === 'function') {
            rejectFn = keyOrFn;
        }

        if (typeof rejectFn !== 'function') {
            methods.log('the reject fn is empty');
            rejectFn = function() {};
        }
        return rejectFn;
    }
};
