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
