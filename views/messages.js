define([
    "collections/messages",
    "less!stylesheets/messages.less"
], function(Messages) {
    var _ = codebox.require("underscore");
    var $ = codebox.require("jQuery");
    var hr = codebox.require("hr/hr");
    var user = codebox.require("core/user");

    // List Item View
    var MessageItem = hr.List.Item.extend({
        templateLoader: "addon.chat.templates",
        template: "message.html",
        className: "message-item",
        events: {},

        // template arguments
        templateContext: function() {
            return {
                'message': this.model,
                'from': this.model.user()
            };
        },

        // Finish rendering
        finish: function() {
            this.$el.toggleClass("self", this.model.get("from.userId") == user.get("userId"));
            return MessageItem.__super__.finish.apply(this, arguments);
        }
    });

    // Logs list
    var MessagesList = hr.List.extend({
        className: "messages-list",
        Collection: Messages,
        Item: MessageItem,
        defaults: _.defaults({
            
        }, hr.List.prototype.defaults)
    });

    return MessagesList;
});