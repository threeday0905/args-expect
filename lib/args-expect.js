;(function(root) {
    'use strict';

/**
 * Most of following contents are copied from underscore
 */

var utilityDetection = (function() {
    var utilities = {};

    var toString = Object.prototype.toString,
        i, len, nativeTypes;

    function addTypeCheck(typeName) {
        utilities['is' + typeName] = function(obj) {
            return toString.call(obj) === '[object ' + typeName + ']';
        };
    }

    // Is a given value a DOM element?
    utilities.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };

    // Is a given variable an object?
    utilities.isObject = function(obj) {
        return obj === Object(obj);
    };


    // Add some isType methods:
    //      isArguments, isFunction, isString, isNumber, isDate, isRegExp.

    nativeTypes = ['Function', 'String', 'Number', 'Date', 'RegExp'];
    for (i = 0, len = nativeTypes.length; i < len; i +=1 ) {
        addTypeCheck(nativeTypes[i]);
    }

    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    if (Array.isArray) {
        utilities.isArray = Array.isArray;
    } else {
        addTypeCheck('Array');
    }

    // Optimize `isFunction` if appropriate.
    if (typeof(/./) !== 'function') {
        utilities.isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }

    // Is a given value a boolean?
    utilities.isBoolean = function(obj) {
        return obj === true || obj === false ||
            toString.call(obj) === '[object Boolean]';
    };


    utilities.isEmpty = function(obj) {
        if (utilities.isNull(obj)) {
            return true;
        } else if (utilities.isArray(obj) || utilities.isString(obj)) {
            return obj.length === 0;
        } else {
            return false;
        }
    };

    // Is a given value equal to null o equal to undefined?
    utilities.isNull = function(obj) {
        return obj === null || obj === void 0;
    };

    utilities.notNull = function(obj) {
        return !utilities.isNull(obj);
    };

    utilities.notEmpty = function(obj) {
        return !utilities.isEmpty(obj);
    };

    return utilities;
}());

var utilityTransfer = {
    has: function(obj, key) {
        return obj[key];
    }
};

var errorMessage = {
    prefix     : 'Not Expected! ',
    defaultMsg : 'has error',
    messages: {
        isEmpty: '{0} is not empty',
        isElement: '{0} is not an element',
        isObject: '{0} is not an obejct',
        isArray: '{0} is not an array',
        isArguments: '{0} is not arguments',
        isFunction: '{0} is not a function',
        isString: '{0} is not a string',
        isNumber: '{0} is not a number',
        isDate: '{0} is not a date',
        isRegExp: '{0} is not a regexp',
        isBoolean: '{0} is not a boolean',
        isNull: '{0} is not null or undefined',
        notNull: '{0} is null or undefined',
        notEmpty: '{0} is empty',
        has: 'does not has {0} property'
    },
    get: function(type, key) {
        var msg = this.messages[type] || this.defaultMsg;
        msg = msg.replace(/\{0\}/, key || 'arg');
        return this.prefix + msg;
    },
    update: function(msgs, type) {
        if (typeof msgs === 'object') {
            for (var key in msgs) {
                if (msgs.hasOwnPeoperty(key)) {
                    this.messages[key] = msgs[key];
                }

            }
        } else if (typeof msgs === 'string' && typeof type === 'string') {
            this.messages[type] = msgs;
        }
    }
};

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

function definition() {
    return new createExpect(
        rejectHandler.getOrCreate('throw')
    );
}

if (root.KISSY && typeof root.KISSY.add === 'function') {
    KISSY.add(definition);
} else if (typeof exports === 'object') {
    module.exports = definition();
} else if (typeof root.define === 'function' && root.define.amd) {
    root.define(definition);
} else {
    root.expect = definition();
}

})(this);
