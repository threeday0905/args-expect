var slice = Array.prototype.slice;
function ExpectChain(onReject) {
    var self = this;

    function createCheckWrapper(fnName, checkIt) {
        function check(obj, name, args) {
            var items = [obj].concat(args);
            if (!checkIt.apply(null, items)) {
                self.reject(
                    errorMessage.get(fnName, name, obj, items[1])
                );
            }
        }

        return function() {
            var args = slice.call(arguments),
                obj = self.obj;

            if (ExpectChain.isEnable) {
                if (self.multiArg && obj.length) {
                    for (var i = 0, len = obj.length; i < len; i += 1) {
                        check(obj[i], '', args);
                    }
                } else {
                    check(obj, self.name, args);
                }
            }
            return self;
        };
    }


    for (var detectFnKey in tools) {
        /* jshint forin: false */
        this[detectFnKey] = createCheckWrapper(
            detectFnKey,
            tools[detectFnKey]
        );
    }


    this.reject = function(msg) {
        if (!this.rejected) {
            this.rejected = true;
            if (tools.isFunction(onReject)) {
                onReject(msg);
            }
        }
        return this;
    };

    this.start = function(obj, name) {
        this.multiArg = this.rejected = false;
        this.name = name ||'';
        this.obj = obj;
        return this;
    };

    this.all = function() {
        this.start(slice.call(arguments));
        this.multiArg = true;
        return this;
    };
}

ExpectChain.isEnable = true;
ExpectChain.enable = function() {
    ExpectChain.isEnable = true;
};
ExpectChain.disable = function() {
    ExpectChain.isEnable = false;
};
