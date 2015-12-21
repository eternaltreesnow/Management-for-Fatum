$(function() {
    var article;
    var $articleId, $selectType, $inputSrc, $inputTitle, $inputAdder, $inputFile, $selectStatus;
    var $AdId, $Price, $Count, $beginTime, $endTime, $begintime, $endtime, $time, $profitLimit, $selectPlatform;
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
    $AdId = $("#AdId");
    $Price = $("#Price");
    $Count = $("#Count");
    $beginTime = $("#beginTime");
    $endTime = $("#endTime");
    $begintime = $("#begintime");
    $endtime = $("#endtime");
    $time = $("#time");
    $profitLimit = $("#profitLimit");
    $selectPlatform = $("#selectPlatform");

    /**
     * [$beginDatetimepicker 排期起始时间选择器]
     * [$endDatetimepicker 排期结束时间选择器]
     * dp.change 通过监听change事件设置结束时间大于起始时间
     */
    $beginDatetimepicker = $("#beginDatetimepicker");
    $endDatetimepicker = $("#endDatetimepicker");
    $beginDatetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm'
    });
    $endDatetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm',
        useCurrent: false
    });
    $beginDatetimepicker.on("dp.change", function(e) {
        $endDatetimepicker.data("DateTimePicker").minDate(e.date);
    });
    $endDatetimepicker.on("dp.change", function(e) {
        $beginDatetimepicker.data("DateTimePicker").maxDate(e.date);
    });

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
        // initial UEditor and content
        var ue = UE.getEditor('editorArticle');
        ue.ready(function() {
            ue.setContent(data.content);
            bindBtnEvent();
        });

        $AdId.val(data.ad);
        $Price.val(data.price);
        $Count.val(data.count);
        if(data.begintime != null) {
            $beginDatetimepicker.data("DateTimePicker").defaultDate(moment(data.begintime).format('YYYY-MM-DD HH:mm:ss'));
        }
        if(data.endtime != null) {
            $endDatetimepicker.data("DateTimePicker").defaultDate(moment(data.endtime).format('YYYY-MM-DD HH:mm:ss'));
        }
        $profitLimit.val(data.profitLimit);
        $selectPlatform.find('option[value="' + data.platform + '"]').attr('selected', true);
    }

    $previewModal = $("#previewModal");
    $previewContent = $("#previewContent");
    $previewBtn = $("#previewBtn");
    $previewBtn.on('click', function() {
        $previewContent.html('<div style="text-align: center;"><img src="' + article.thumbnails + '"></img></div>');
        $previewModal.modal('show');
    });

    function bindBtnEvent() {
        $submitBtn = $("#submitBtn");
        $submitBtn.on('click', function(event) {
            $("#content").val(ue.getContent());
            $time.val(event.timeStamp);
            $begintime.val(moment($("#beginTime").val()).format('x'));
            $endtime.val(moment($("#endTime").val()).format('x'));
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
                            backdrop: 'static',
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
    }
});
