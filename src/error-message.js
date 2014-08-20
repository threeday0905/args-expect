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
