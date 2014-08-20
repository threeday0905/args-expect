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
