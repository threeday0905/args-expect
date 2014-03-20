var errorMessage = {
    prefix : 'Not Expected! ',
    defMsg : '{0} failed condition: {1}',
    msgs: {
        is: '{0) is not match expected type',
        has: '{0} does not have expected properties'
    },
    get: function(toolName, argNey) {
        var msg = this.msgs[toolName] || this.defMsg;
        msg = msg.replace(/\{0\}/, argNey || 'arg')
                 .replace(/\{1\}/, toolName + '()');
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
