define([
    "views/messages",
    "less!stylesheets/panel.less"
], function(MessagesList) {
    var _ = codebox.require("underscore");
    var $ = codebox.require("jQuery");
    var hr = codebox.require("hr/hr");
    var box = codebox.require("core/box");
    var api = codebox.require("core/api");
    var collaborators = codebox.require("core/collaborators");
    var PanelBaseView = codebox.require("views/panels/base");

    var PanelChatView = PanelBaseView.extend({
        className: "cb-panel-chat",
        templateLoader: "addon.chat.templates",
        template: "panel.html",
        events: {
            "keydown .chat-input textarea": "messageInput"
        },

        initialize: function() {
            PanelChatView.__super__.initialize.apply(this, arguments);
            this.animation = null;

            // Message list
            this.list = new MessagesList();
            this.list.on("change:add", function() {
                if (this.animation != null) {
                    this.animation.stop();
                }

                this.animation = this.$(".chat-messages").animate({
                    scrollTop: this.$(".chat-messages")[0].scrollHeight
                }, 60);
            }, this);

            // Handle messages
            box.on("box:chat:message", function(e) {
                this.list.collection.add(e.data);
            }, this);
        },

        // Finish rendering
        finish: function() {
            this.list.$el.appendTo(this.$(".chat-messages"));
            return ChatBoxView.__super__.finish.apply(this, arguments);
        },

        // Focus the message input
        focus: function() {
            this.$(".box-input").focus();
        },

        // Blur the message input
        blur: function() {
            this.$(".box-input").blur();
        },

        // Key input on message
        messageInput: function(e) {
            var key = e.keyCode || e.which;
            var $input = $(e.currentTarget);
            var val = $input.val();

            if (key === 13 && val.length > 0) {
                e.preventDefault();
                
                api.rpc("/chat/send", {
                    "message": val
                }).then(function() {
                    $input.val("");
                });
            }
        }
    });

    return PanelChatView;
});