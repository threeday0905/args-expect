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
