var ExpectChain = (function(lib) {

    function getErrorMsg(type, key) {
        return errorMessage.get(type, key);
    }

    function detectionWrapper(fnName, detectFn, self) {
        return function() {
            if (self.isRejected()) {
                return self;
            }

            var result = detectFn(self.hoster);

            if (!result) {
                self.reject(getErrorMsg(fnName, self.hosterName));
            }

            return self;
        };
    }

    function transferWrapper(fnName, transferFn, self) {
        return function(transferKey) {
            if (self.isRejected()) {
                return self;
            }

            var transferTarget = transferFn(self.hoster, transferKey),
                transferName;


            if (transferTarget === undefined) {
                self.transfer(undefined, '');
                self.reject(getErrorMsg(fnName, transferKey));
            } else {
                transferName =
                    (self.hosterName ? self.hosterName + '-' : '' ) + transferKey;

                self.transfer(transferTarget, transferKey);
            }

            return self;
        };
    }



    function ExpectChain(onReject) {
        for (var tranFnName in utilityTransfer) {
            /* jshint forin: false */
            this[tranFnName] = transferWrapper(
                tranFnName,
                utilityTransfer[tranFnName],
                this
            );
        }

        for (var detectFnKey in utilityDetection) {
            /* jshint forin: false */
            this[detectFnKey] = detectionWrapper(
                detectFnKey,
                utilityDetection[detectFnKey],
                this
            );
        }
        this.reset();
        this.setReject(onReject);
    }

    ExpectChain.prototype = {
        reset: function() {
            this.fail = false;
            this.hoster = this.lastHoster = null;
            this.hosterName = this.lastHosterName = '';
            return this;
        },
        transfer: function(obj, name) {
            if (this.hoster !== null) {
                this.lastHoster = this.hoster;
                this.lastHosterName = this.hosterName;
            }
            this.hoster = obj;
            this.hosterName = name;
            return this;
        },
        backToLast: function() {
            if (this.lastHoster !== null) {
                this.transfer(this.lastHoster, this.lastHosterName);
            }

            return this;
        },
        isRejected: function() {
            return this.fail === true;
        },
        setReject: function(onReject) {
            this.onReject = onReject;
            return this;
        },
        reject: function(message) {
            this.fail = true;
            if (typeof this.onReject === 'function') {
                this.onReject(message);
            }
            return this;
        }
    };

    return ExpectChain;

}());
