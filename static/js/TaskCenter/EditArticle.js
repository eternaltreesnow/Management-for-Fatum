$(function() {
    var article;
    var $articleId, $selectType, $inputSrc, $inputTitle, $inputAdder, $inputFile, $selectStatus;
    var $submitBtn;
    var $previewBtn, $previewModal, $previewContent;
    var $successModal;
    var $errorModal, $errorMsg;

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
            url: "/_admin/s/task/articles/" + id,
            type: "GET",
            success: function(data) {
                if(data.code == 200) {
                    article = data.data.article;
                    initialForm(article);
                } else {
                    console.log(data.error);
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    }

    function initialForm(data) {
        $articleId.val(data.id);
        $selectType.find('option[value="' + data.type + '"]').attr('selected', true);
        $inputTitle.val(data.title);
        $inputSrc.val(data.source);
        $selectStatus.find('option[value="' + data.status + '"]').attr('selected', true);
        // 未初始化富文本编辑器内容
    }

    $previewModal = $("#previewModal");
    $previewContent = $("#previewContent");
    $previewBtn = $("#previewBtn");
    $previewBtn.on('click', function() {
        $previewContent.html('<div style="text-align: center;"><img src="' + article.thumbnails + '"></img></div>');
        $previewModal.modal('show');
    });

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        var formdata = new FormData($("#editArticleForm")[0]);
        $.ajax({
            type: "POST",
            url: "/_admin/s/task/articles/" + $articleId.val(),
            cache: false,
            data: formdata,
            processData: false,
            contentTypt: false,
            success: function(data) {
                if(data.code == 200) {
                    $successModal.modal({
                        dropback: 'static',
                        show: true
                    });
                } else {
                    $errorMsg.html(data.error);
                    $errorModal.modal('show');
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    });
});
