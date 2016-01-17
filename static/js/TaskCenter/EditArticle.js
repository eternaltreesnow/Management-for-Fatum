$(function() {
    $("#userName").text(localStorage['user']);
    $("#logoutBtn").on('click', function() {
        $.ajax({
            url: "/_admin/s/logout",
            type: 'GET',
            success: function(data) {
                if(data.code == 200) {
                    localStorage.removeItem('user');
                    location.href = '../index.html';
                } else {
                    console.log(data.error);
                }
            },
            error: function(data) {
                console.log(data.error);
            }
        });
    });

    var article, info;
    var $articleId, $selectClassify, $selectType, $inputSrc, $inputTitle, $inputAdder, $inputFile, $selectStatus, $selectDomain, $inputUrl, $inputIntro;
    var $scheduleId, $AdId, $Price, $Count, $beginTime, $endTime, $begintime, $endtime, $time, $profitLimit, $selectPlatform;
    var $submitBtn;
    var $previewBtn, $previewModal, $previewContent;
    var $successModal;
    var $errorModal, $errorMsg;

    $articleId = $("#articleId");
    $selectClassify = $("#selectClassify");
    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");
    $selectDomain = $("#selectDomain");
    $inputFile = $("#inputFile");
    $selectStatus = $("#selectStatus");
    $inputUrl = $("#inputUrl");
    $inputIntro = $("#inputIntro");
    $scheduleId = $("#scheduleId");
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

    $successModal = $("#successModal");
    $errorMsg = $("#errorMsg");
    $errorModal = $("#errorModal");

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
                    info = data.data.info;
                    initialForm(article, info);
                } else {
                    console.log(data.error);
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    }

    function initialForm(data, info) {
        $articleId.val(data.id);
        $selectClassify.find('option[value="' + data.classify + '"]').attr('selected', true);
        // initial select type of article
        Papa.parse('../../lib/article_type.csv', {
            download: true,
            header: true,
            complete: function(result) {
                var options = '';
                result.data.map(function(item) {
                    options += '<option value="' + item['id'] + '">' + item['article_class_name'] + '</option>';
                });
                $selectType.append(options);
                $selectType.find('option[value="' + data.articleClassId + '"]').attr('selected', true);
            }
        });
        // initial domain
        $.ajax({
            url: '/_admin/s/article_domains',
            type: 'GET',
            async: true,
            success: function(result) {
                if(result.code == 200) {
                    var options = '';
                    result.data.map(function(value) {
                        options += '<option value="' + value + '">' + value + '</option>';
                    });
                    $selectDomain.append(options);
                    $selectType.find('option[value="' + data.domain + '"]').attr('selected', true);
                } else {
                    console.log(result.error);
                }
            },
            error: function(result) {
                console.log(result);
            }
        });
        $inputTitle.val(data.title);
        $inputSrc.val(data.source);
        $selectStatus.find('option[value="' + data.status + '"]').attr('selected', true);

        $inputIntro.val(data.intro);
        // initial UEditor and content
        var ue = UE.getEditor('editorArticle', {
            toolbars: [
                ['fullscreen', 'source', 'undo', 'redo'],
                ['customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight'],
                ['directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'pagebreak', 'horizontal', 'date', 'time', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|', 'drafts']
            ]
        });

        // judge the classify
        if(data.classify == 1) {
            ue.ready(function() {
                ue.setContent(data.content);
                bindBtnEvent();
            });
            $("#inputUrlContainer").hide();
            $("#adIdContainer").show();
            $("#editorContainer").show();
        } else {
            bindBtnEvent();
            $inputUrl.val(data.content);
            $("#inputUrlContainer").show();
            $("#adIdContainer").hide();
            $("#editorContainer").hide();
        }

        // initial Schedule info
        $scheduleId.val(info.id);
        $AdId.val(info.advertiserId1);
        $Price.val(info.price1);
        $Count.val(info.limitRetweetCount1);
        if(info.beginTime != null) {
            $beginDatetimepicker.data("DateTimePicker").defaultDate(moment(info.beginTime).format('YYYY-MM-DD HH:mm:ss'));
        }
        if(info.endTime != null) {
            $endDatetimepicker.data("DateTimePicker").defaultDate(moment(info.endTime).format('YYYY-MM-DD HH:mm:ss'));
        }
        $profitLimit.val(info.limitProfit);
        $selectPlatform.find('option[value="' + info.limitDestination + '"]').attr('selected', true);
    }

    $previewModal = $("#previewModal");
    $previewContent = $("#previewContent");
    $previewBtn = $("#previewBtn");
    $previewBtn.on('click', function() {
        $previewContent.html('<div style="text-align: center;"><img class="previewImage" src="' + article.thumbnails + '"></img></div>');
        $(".previewImage").css("max-width", '558px');
        $previewModal.modal('show');
    });
    $previewModal.on('shown.bs.modal', function() {
        if($previewContent.width() > 558) {
            $(".previewImage").css("max-width", $previewContent.width() + 'px');
        }
    });

    $selectClassify.on('change', function() {
        if($selectClassify.val() == 1) {
            $("#inputUrlContainer").hide();
            $("#adIdContainer").show();
            $("#editorContainer").show();
        } else {
            $("#inputUrlContainer").show();
            $("#adIdContainer").hide();
            $("#editorContainer").hide();
        }
    });

    function bindBtnEvent() {
        $submitBtn = $("#submitBtn");
        $submitBtn.on('click', function(event) {
            console.log(1);
            $time.val(event.timeStamp);
            $begintime.val(moment($("#beginTime").val()).format('x'));
            $endtime.val(moment($("#endTime").val()).format('x'));
            var formdata = new FormData($("#editArticleForm")[0]);
            $.ajax({
                type: 'POST',
                url: "/_admin/s/task/articles/" + $articleId.val(),
                cache: false,
                data: formdata,
                processData: false,
                contentType: false,
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
