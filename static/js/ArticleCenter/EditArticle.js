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
    var $articleId, $selectType, $inputSrc, $inputTitle, $inputAdder, $inputFile, $selectStatus, $selectDomain, $inputIntro;
    var $scheduleId, $AdId1, $Price1, $Count1, $AdId2, $Price2, $Count2, $beginTime, $endTime, $begintime, $endtime, $time, $selectPlatform;
    var $submitBtn;
    var $deleteScheduleBtn, $deleteConfirmBtn, $confirmModal, $confirmContent;
    var $fetchUrl, $fetchBtn;
    var $previewBtn, $previewModal, $previewContent;
    var $successModal;
    var $errorModal, $errorMsg;
    var $videoUrl, $videoLinkBtn;

    var $inputTitleHint, $inputSrcHint;
    var ue;

    $inputTitleHint = $("#inputTitleHint");
    $inputSrcHint = $("#inputSrcHint");

    $articleId = $("#articleId");
    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");
    $selectDomain = $("#selectDomain");
    $inputFile = $("#inputFile");
    $selectStatus = $("#selectStatus");
    $inputUrl = $("#inputUrl");
    $inputIntro = $("#inputIntro");
    $scheduleId = $("#scheduleId");
    $AdId1 = $("#AdId1");
    $Price1 = $("#Price1");
    $Count1 = $("#Count1");
    $AdId2 = $("#AdId2");
    $Price2 = $("#Price2");
    $Count2 = $("#Count2");
    $beginTime = $("#beginTime");
    $endTime = $("#endTime");
    $begintime = $("#begintime");
    $endtime = $("#endtime");
    $time = $("#time");
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
        format: 'YYYY/MM/DD HH:mm',
        defaultDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    });
    $endDatetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm',
        useCurrent: false,
        minDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
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
            url: "/_admin/s/article/articles/" + id,
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
        ue = UE.getEditor('editorArticle', {
            toolbars: [
                ['fullscreen', 'source', 'undo', 'redo'],
                ['customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight'],
                ['directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'pagebreak', 'horizontal', 'date', 'time', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|', 'drafts']
            ]
        });
        ue.ready(function() {
            ue.setContent(data.content);
            bindBtnEvent(ue);

            // initial fetch
            $fetchBtn = $("#fetchBtn");
            $fetchUrl = $("#fetchUrl");
            $fetchBtn.on('click', function() {
                $.ajax({
                    url: "/_admin/s/crawl_article",
                    type: "GET",
                    data: {
                        url: $fetchUrl.val()
                    },
                    success: function(data) {
                        if(data.code == 200) {
                            ue.setContent(data.data.html);
                        } else {
                            $errorMsg.html(data.data.msg);
                            $errorModal.modal('show');
                        }
                    },
                    error: function(data) {
                        console.log(data.error);
                    }
                });
            });
        });

        if(info.advertiserId1 == null && info.advertiserId2 == null) {

        } else {
            // initial Schedule info
            $scheduleId.val(info.id);
            $AdId1.val(info.advertiserId1);
            $Price1.val(info.price1);
            $Count1.val(info.limitViewCount1);
            $AdId2.val(info.advertiserId2);
            $Price2.val(info.price2);
            $Count2.val(info.limitViewCount2);
            if(info.beginTime != null) {
                $beginDatetimepicker.data("DateTimePicker").defaultDate(moment(info.beginTime).format('YYYY-MM-DD HH:mm:ss'));
            }
            if(info.endTime != null) {
                $endDatetimepicker.data("DateTimePicker").defaultDate(moment(info.endTime).format('YYYY-MM-DD HH:mm:ss'));
            }
            $selectPlatform.find('option[value="' + info.limitDestination + '"]').attr('selected', true);

            // set schedule form disable
            setSchduleFormDisable(true);
        }
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

    // Form validation
    $inputSrc.on('input', function() {
        $inputSrc.parent().removeClass('has-error');
    });
    $inputSrc.on('blur', function() {
        if($inputSrc.val() !== "") {
            $inputSrcHint.removeClass("form-hint-nec").addClass("form-hint-suc");
            $inputSrcHint.html('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $inputSrcHint.removeClass("form-hint-suc").addClass("form-hint-nec");
            $inputSrcHint.html('(*必填)');
        }
    });

    $inputTitle.on('input', function() {
        $inputTitle.parent().removeClass('has-error');
    });
    $inputTitle.on('blur', function() {
        if($inputTitle.val() !== "") {
            $inputTitleHint.removeClass("form-hint-nec").addClass("form-hint-suc");
            $inputTitleHint.html('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $inputTitleHint.removeClass("form-hint-suc").addClass("form-hint-nec");
            $inputTitleHint.html('(*必填)');
        }
    });

    function setSchduleFormDisable(disableStatus) {
        if(disableStatus == false) {
            $scheduleId.val('');
            $AdId1.val('');
            $Price1.val('');
            $Count1.val('');
            $AdId2.val('');
            $Price2.val('');
            $Count2.val('');
            $beginDatetimepicker.data("DateTimePicker").defaultDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
            $endDatetimepicker.data("DateTimePicker").clear();
            $selectPlatform.find('option[value=0]').attr('selected', true);
        }
        $AdId1.attr('disabled', disableStatus);
        $Price1.attr('disabled', disableStatus);
        $Count1.attr('disabled', disableStatus);
        $AdId2.attr('disabled', disableStatus);
        $Price2.attr('disabled', disableStatus);
        $Count2.attr('disabled', disableStatus);
        $("#beginTime").attr('disabled', disableStatus);
        $("#endTime").attr('disabled', disableStatus);
        $selectPlatform.attr('disabled', disableStatus);
    }

    function bindBtnEvent() {
        $confirmModal = $("#confirmModal");
        $confirmContent = $("#confirmContent");
        $deleteScheduleBtn = $("#deleteScheduleBtn");
        $deleteScheduleBtn.on('click', function() {
            if($scheduleId.val() == "") {
                $confirmContent.text("该文章无排期，请直接添加排期信息");
                $deleteConfirmBtn.hide();
            } else {
                $confirmContent.text("重置排期将会删除原有排期的信息，请问是否确认重置？");
                $deleteConfirmBtn.show();
            }
            $confirmModal.modal('show');
        });

        $deleteConfirmBtn = $("#deleteConfirmBtn");
        $deleteConfirmBtn.on('click', function() {
            $confirmContent.text("删除中");
            $.ajax({
                type: "DELETE",
                url: "/_admin/s/article/infos/" + $scheduleId.val(),
                success: function(data) {
                    if(data.code == 200) {
                        $confirmContent.text("删除成功!");
                        $confirmModal.modal('hide');
                        setSchduleFormDisable(false);
                    }
                }
            });
        });

        $videoUrl = $("#videoUrl");
        $videoLinkBtn = $("#videoLinkBtn");
        $videoLinkBtn.on('click', function() {
            var html = getVideoHtmlTemplate($videoUrl.val());
            if(html !== '') {
                $('#videoModal').modal('hide');
                ue.execCommand('inserthtml', html);
                $videoUrl.val('');
            } else {
                $('#videoModal').modal('hide');
                $errorMsg.html("视频链接转换失败，请确保链接属于腾讯视频或优酷视频.");
                $errorModal.modal('show');
            }
        });

        console.log();
        $submitBtn = $("#submitBtn");
        $submitBtn.on('click', function(event) {
            if($inputSrc.val() === "") {
                $inputSrc.parent().addClass('has-error');
                $inputSrc.focus();
                return;
            }
            if($inputTitle.val() === "") {
                $inputTitle.parent().addClass('has-error');
                $inputTitle.focus();
                return;
            }
            $time.val(event.timeStamp);
            $begintime.val(moment($("#beginTime").val()).format('x'));
            $endtime.val(moment($("#endTime").val()).format('x'));
            var formdata = new FormData($("#editArticleForm")[0]);
            $.ajax({
                type: "POST",
                url: "/_admin/s/article/articles/" + $articleId.val(),
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
