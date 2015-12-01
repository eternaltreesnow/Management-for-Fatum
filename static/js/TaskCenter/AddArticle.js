$(function() {
    var $submitBtn;
    var $selectType, $inputSrc, $inputTitle, $inputAdder;
    var ue = UE.getEditor('editorArticle');

    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");
    $inputAdder = $("#inputAdder");
    $submitBtn = $("#submitBtn");
    ue.ready(function() {
        $submitBtn.on('click', function() {
            var requestData = {
                "type" : $selectType.val(),
                "src" : $inputSrc.val(),
                "title" : $inputTitle.val(),
                "adder" : $inputAdder.val(),
                "content" : ue.getContent()
            }
            $.ajax({
                async: true,
                type: "GET",
                url: "addArticle", //补充添加文章api
                data: requestData,
                dataType: "json",
                success: function(data) {
                    if(data.type == 1) {
                        alert("添加成功!");
                        location.href = "ArticleManage.html";
                    } else {
                        alert("添加失败，请重试...");
                    }
                },
                error: function(data) {
                    alert("添加失败，请重试...");
                }
            });
        });
    });

});
