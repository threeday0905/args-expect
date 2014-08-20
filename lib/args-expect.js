;(function(root) {
    'use strict';

/**
 * Most of following contents are copied from underscore
 */

 /* jshint unused: false, -W079 */
var tools = (function() {
    /* jshint maxstatements: 30 */

    var tools = {};

    var ObjProto = Object.prototype,
        toString = ObjProto.toString,
        hasOwn = ObjProto.hasOwnProperty;

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
    addTypeCheck('Arguments');
    addTypeCheck('Function');
    addTypeCheck('String');
    addTypeCheck('Number');
    addTypeCheck('Date');
    addTypeCheck('RegExp');

    // Define a fallback version of the method in browsers (ahem, IE), where
    // there isn't any inspectable "Arguments" type.
    if (!tools.isArguments(arguments)) {
        tools.isArguments = function(obj) {
            return !!(obj && hasOwn.call(obj, 'callee'));
        };
    }



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
        for (var i = 1, len = args.length; i < len; i += 1) {
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
            return tools.notNull(obj[prop]);
        } else if (tools.isArray(prop)) {
            /* jshint plusplus: false */
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

    tools.equalTo = function(obj, value) {
        return obj === value;
    };

    return tools;
}());

/* jshint unused: false, -W079 */
var errorMessage = {
    prefix : 'Not Expected! ',
    defMsg : '{0} failed condition: {1} with \"{2}\"',
    msgs: {
        is: '{0} is not match expected type',
        has: '{0} does not have expected properties',
        equalTo: '{0} is not equal to {3}'
    },
    get: function(toolName, argName, obj, arg1) {
        var msg = this.msgs[toolName] || this.defMsg;
        msg = msg.replace(/\{0\}/, argName || 'arg') // argument name
                 .replace(/\{1\}/, toolName + '()')  // tool name
                 .replace(/\{2\}/, obj ? obj.toString() : '') // obj value
                 .replace(/\{3\}/, arg1 ? arg1 : ''); // compare value

        return this.prefix + msg;
    }
};

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

/* jshint unused: false, -W079 */

var createExpect = function(onReject) {
    var chain = new ExpectChain(onReject);

    var expectFn = function(obj, name) {
        return chain.start(obj, name);
    };

    expectFn.all = function() {
        var args = arguments;
        if (args.length === 1 && tools.isArguments(args[0])) {
            args = args[0];
        }
        return chain.all.apply(chain, args);
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
