define([
    "chat",
    "views/panel"
], function(chat, PanelChatView) {
    var $ = codebox.require("jQuery");
    var collaborators = codebox.require("core/collaborators");
    var search = codebox.require("core/search");
    var box = codebox.require("core/box");
    var user = codebox.require("core/user");
    var commands = codebox.require("core/commands");
    var panels = codebox.require("core/panels");


    // Handle messages
    box.on("box:chat:message", function(e) {
        if (e.data.to != "all"
        && e.data.to != user.get("userId")
        && e.data.from.userId != user.get("userId")) {
            return;
        }

        var boxTitle = e.data.to == "all" ? "All" : e.data.from.name;
        var boxId = (e.data.to == "all" || e.data.to != user.get("userId")) ? e.data.to : e.data.from.userId;

        var box = chat.open(boxId, boxTitle)
        box.list.collection.add(e.data);
    }, this);

    // Add search results
    search.handler({
        'id': "chat",
        'title': "Chat with"
    }, function(query) {
        query = query.toLowerCase();

        var results = _.map(collaborators.filter(function(cuser) {
            return (cuser.get("name").toLowerCase().search(query) >= 0
            && user.get("userId") != cuser.get("userId"));
        }), function(user) {
            return {
                'text': user.get("name"),
                'image': user.avatar({size: 48}),
                'callback': function() {
                    chat.open(user.get("userId"), user.get("name"));
                }
            }
        });
        results.unshift({
            'text': "All collaborators",
            'callback': function() {
                chat.open("all", "All");
            }
        });

        return results;
    });

    // Add search panel
    var panel = panels.register("chat", PanelChatView);
    
    // Add opening command
    var command = commands.register("chat.open", {
        title: "Chat",
        icon: "comments-o",
        position: 1,
        shortcuts: [
            "c"
        ]
    });
    panel.connectCommand(command);
});