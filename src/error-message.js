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
