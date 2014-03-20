;(function(root) {
    'use strict';

/**
 * Most of following contents are copied from underscore
 */

var tools = (function() {
    var tools = {};

    var toString = Object.prototype.toString;

    function addTypeCheck(typeName) {
        tools['is' + typeName] = function(obj) {
            return toString.call(obj) === '[object ' + typeName + ']';
        };
    }

    function getTypeName(fn) {
        if (tools.isNull(fn)) {
            return 'Null';
        } else if (fn.name) {
            return fn.name;
        } else {
            var mat = /function (.+)\(/.exec(String(fn));
            return mat ? mat[1] : '';
        }
    }

    function getIsMethod(name) {
        return tools['is' + name];
    }

    // Add some isType methods:
    //      isArguments, isFunction, isString, isNumber, isDate, isRegExp.
    addTypeCheck('Function');
    addTypeCheck('String');
    addTypeCheck('Number');
    addTypeCheck('Date');
    addTypeCheck('RegExp');


    // Is a given value a DOM element?
    tools.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };

    // Is a given variable an object?
    tools.isObject = function(obj) {
        return obj === Object(obj);
    };


    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    if (Array.isArray) {
        tools.isArray = Array.isArray;
    } else {
        addTypeCheck('Array');
    }

    // Optimize `isFunction` if appropriate.
    if (typeof(/./) !== 'function') {
        tools.isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }

    // Is a given value a boolean?
    tools.isBoolean = function(obj) {
        return obj === true || obj === false ||
            toString.call(obj) === '[object Boolean]';
    };


    tools.isEmpty = function(obj) {
        if (tools.isNull(obj)) {
            return true;
        } else if (tools.isArray(obj) || tools.isString(obj)) {
            return obj.length === 0;
        } else {
            return false;
        }
    };

    // Is a given value equal to null o equal to undefined?
    tools.isNull = function(obj) {
        return obj === null || obj === void 0;
    };

    tools.notNull = function(obj) {
        return !tools.isNull(obj);
    };

    tools.notEmpty = function(obj) {
        return !tools.isEmpty(obj);
    };


    tools.is = function(obj) {
        var args = arguments;
        for (var i = 1, len = args.length; i < len; i++) {
            var type = args[i],
                method = getIsMethod( getTypeName(type) );

            if (method && method(obj)) {
                return true;
            }

            if (tools.isFunction(type) && obj instanceof type) {
                return true;
            }
        }
        return false;
    };

    tools.has = function(obj, prop) {
        var result = true,
            key, type;

        if (tools.isString(prop)) {
            return !!obj[prop];
        } else if (tools.isArray(prop)) {
            for (key = prop.length; key--; ) {
                if (tools.isString(prop[key]) && !obj[prop[key]] ) {
                    result = false;
                    break;
                }
            }
        } else if (tools.isObject(prop)) {
            for (key in prop) {
                /*jshint forin:false */
                type = prop[key];
                if (!obj[key] || !tools.is(obj[key], type)) {
                    result = false;
                    break;
                }
            }
        } else {
            result = false;
        }
        return result;
    };

    return tools;
}());

var errorMessage = {
    prefix : 'Not Expected! ',
    defMsg : '{0} failed condition: {1} with \"{2}\"',
    msgs: {
        is: '{0) is not match expected type',
        has: '{0} does not have expected properties'
    },
    get: function(toolName, argName, value) {
        var msg = this.msgs[toolName] || this.defMsg;
        msg = msg.replace(/\{0\}/, argName || 'arg')
                 .replace(/\{1\}/, toolName + '()')
                 .replace(/\{2\}/, value ? value.toString() : '');

        return this.prefix + msg;
    }
    /* comment out the msg update method for reduce size
    ,
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
    }*/
};

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

var createExpect = function(onReject) {
    var chain = new ExpectChain(onReject);

    var expectFn = function(obj, name) {
        chain.start(obj, name);
        return chain;
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

})(this);
