function ExpectChain(onReject) {
    var self = this;

    function createCheckWrapper(fnName, checkIt) {
        return function(par) {
            var args = arguments.length ?
                    [ self.obj ].concat(Array.prototype.slice.call(arguments)) :
                    [ self.obj ];

            if (ExpectChain.isEnable && !checkIt.apply(self.obj, args)) {
                self.reject(
                    errorMessage.get(fnName, self.name, self.obj)
                );
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

    this.rejected = false;
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
        this.obj = obj;
        this.name = name;
        this.rejected = false;
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
