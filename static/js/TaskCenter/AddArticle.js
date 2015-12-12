$(function() {
    var $submitBtn;
    var $selectType, $inputSrc, $inputTitle, $inputAdder;
    // var ue = UE.getEditor('editorArticle');

    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function(event) {
        $("#time").val(event.timeStamp);
        var formdata = new FormData($("#addArticleForm"));
        $.ajax({
            type: "POST",
            url: "/_admin/s/task/articles",
            // data: $("#addArticleForm").serialize(),
            data: formdata,
            processData: false,
            contentType: false,
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
