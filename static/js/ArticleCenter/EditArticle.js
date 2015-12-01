$(function() {
    var $articleId, $selectType, $inputSrc, $inputTitle, $inputAdder;
    var $submitBtn;

    $articleId = $("#articleId");
    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");
    $inputAdder = $("#inputAdder");

    var $tempdata = {
        id: "1",
        type: "2",
        owner: "文章来源1",
        title: "标题1:",
        adder: "username",
        content: "<p><b>hahahah</b></p>"
    };

    /**
     * init 初始化
     */
    $articleId.val($tempdata['id']);
    $selectType.find('option[value="' + $tempdata['type'] + '"]').attr('selected', true);
    $inputSrc.val($tempdata['owner']);
    $inputTitle.val($tempdata['title']);
    $inputAdder.val($tempdata['adder']);

    var ue = UE.getEditor('editorArticle');
    ue.ready(function() {
        ue.setContent($tempdata['content']);

        $submitBtn = $("#submitBtn");
        $submitBtn.on('click', function() {
            var requestData = {
                "id" : $articleId.val(),
                "type" : $selectType.val(),
                "src" : $inputSrc.val(),
                "title" : $inputTitle.val(),
                "adder" : $inputAdder.val(),
                "content" : ue.getContent()
            }
            $.ajax({
                async: true,
                type: "GET",
                url: "editArticle", //补充修改文章api
                data: requestData,
                dataType: "json",
                success: function(data) {
                    if(data.type == 1) {
                        alert("修改成功!");
                        location.href = "ArticleManage.html";
                    } else {
                        alert("修改失败，请重试...");
                    }
                },
                error: function(data) {
                    alert("修改失败，请重试...");
                }
            });
        });
    });
});
