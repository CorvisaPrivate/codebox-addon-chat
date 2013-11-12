define([], function() {
    var hr = codebox.require("hr/hr");
    var collaborators = codebox.require("core/collaborators");

    var Message = hr.Model.extend({
        defaults: {
            'to': null,
            'content': null,
            'from': {}
        },

        // Return user who posted
        user: function() {
            return collaborators.getById(this.get("from.userId"));
        }
    });

    return Message;
});