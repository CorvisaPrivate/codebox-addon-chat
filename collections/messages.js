define([
    "models/message"
], function(Message) {
    var hr = codebox.require("hr/hr");

    var Messages = hr.Collection.extend({
        model: Message
    });

    return Messages;
});