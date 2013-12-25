define([
    "views/panel"
], function(PanelChatView) {
    var $ = codebox.require("jQuery");
    var collaborators = codebox.require("core/collaborators");
    var search = codebox.require("core/search");
    var user = codebox.require("core/user");
    var commands = codebox.require("core/commands/toolbar");
    var panels = codebox.require("core/panels");

    // Add search panel
    var panel = panels.register("chat", PanelChatView);
    
    // Add opening command
    var command = commands.register("chat.open", {
        title: "Chat",
        icon: "comment-o",
        position: 1,
        offline: false,
        shortcuts: [
            "c"
        ]
    });
    panel.connectCommand(command);
});