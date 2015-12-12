$(function() {
    var $articleId, $selectType, $inputSrc, $inputTitle, $inputAdder, $inputFile, $selectStatus;
    var $submitBtn;

    $articleId = $("#articleId");
    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");
    $inputFile = $("#inputFile");
    $selectStatus = $("#selectStatus");

    /**
     * init 初始化
     */
    var url = location.search;
    if(url.indexOf("?") != -1) {
        var id = url.substr(1).split("&")[0].split("=")[1];
        $.ajax({
            url: "/_admin/s/task/articles/",
            type: "GET",
            data: function(data) {
                data.id = id;
            },
            dataType: 'json',
            success: function(data) {
                if(data.error == "") {
                    initialForm(data.article);
                } else {
                    alert(data.error);
                }
            },
            error: function(data) {
                alert(data.error);
            }
        });
    }

    function initialForm(data) {
        $articleId.val(data.id);
        $selectType.find('option[value="' + data.type + '"]').attr('selected', true);
        $inputTitle.val(data.title);
        $inputSrc.val(data.source);
        $inputFile.val(data.thumbnails);
        $selectStatus.find('option[value="' + data.status + '"]').attr('selected', true);
        // 未初始化富文本编辑器内容
    }

    // ue.ready(function() {
    //     ue.setContent($tempdata['content']);
    // });

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        var formdata = new FormData($("#editArticleForm"));
        $.ajax({
            type: "POST",
            url: "/_admin/s/task/articles/" + $articleId.val(),
            // data: $("#editArticleForm"),
            data: formdata,
            processData: false,
            contentTypt: false,
            success: function(data) {
                if(data) {
                    alert('form submitted');
                }
            },
            error: function(data) {
                alert(data.data.msg);
            }
        });
    });
});
