UE.registerUI('videolinkbtn', function(editor, uiName) {
    editor.registerCommand(uiName, {
        execCommand: function() {
            $("#videoModal").modal('show');
        }
    });

    var btn = new UE.ui.Button({
        name: uiName,
        title: "转换视频链接",
        cssRules: 'background-position: -320px -20px;',
        onclick: function() {
            editor.execCommand(uiName);
        }
    });
    return btn;
});
