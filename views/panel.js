define([
    "chat",
    "less!stylesheets/panel.less"
], function(chat) {
    var _ = codebox.require("underscore");
    var $ = codebox.require("jQuery");
    var hr = codebox.require("hr/hr");
    var collaborators = codebox.require("core/collaborators");
    var PanelBaseView = codebox.require("views/panels/base");

    var PanelChatView = PanelBaseView.extend({
        className: "cb-panel-chat",
        templateLoader: "addon.chat.templates",
        template: "panel.html",
        events: {
            "click .chat-all": "chatWithAll",
            "click li[data-chatwith]": "chatWith"
        },

        initialize: function() {
            PanelChatView.__super__.initialize.apply(this, arguments);
            collaborators.on("add remove reset change", this.update, this);
        },

        // Open chat with all
        chatWithAll: function(e) {
            if (e) e.preventDefault();
            chat.open("all", "All");
        },

        // Open chat with person
        chatWith: function(e) {
            if (!e) return;
            var user = collaborators.getById($(e.currentTarget).data("chatwith"));
            console.log(user, user.toJSON());
            chat.open(user.get("userId"), user.get("name"));
        }
    });

    return PanelChatView;
});