define([
    "views/chat"
], function(ChatView) {
    var chat = new ChatView();
    chat.$el.appendTo($("body"));
    return chat;
});