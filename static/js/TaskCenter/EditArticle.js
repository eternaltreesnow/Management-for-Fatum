$(function() {
    $("#userName").text(localStorage['user']);
    $("#logoutBtn").on('click', function() {
        $.ajax({
            url: "/_admin/s/logout",
            type: 'GET',
            success: function(data) {
                if (data.code == 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('moduleIds');
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

    var ids = [2, 22];
    initialMenuTreeByIds(ids);

    if (!initalModulePage(22)) {
        return;
    }

    var article, info;
    var $articleId, $selectClassify, $selectType, $inputSrc, $inputTitle, $inputAdder, $inputFile, $selectStatus, $selectDomain, $inputUrl, $inputIntro;
    var $scheduleId, $AdId, $Price, $Count, $beginTime, $endTime, $begintime, $endtime, $profitLimit, $selectPlatform;
    var $submitBtn;
    var $deleteScheduleBtn, $deleteConfirmBtn, $confirmModal, $confirmContent;
    var $previewBtn, $previewModal, $previewContent;
    var $successModal;
    var $errorModal, $errorMsg;
    var $videoUrl, $videoLinkBtn;
    var ue;

    var $inputTitleHint, $inputSrcHint, $inputIntroHint, $CountHint;

    var $permissionModal;
    $permissionModal = $("#permissionModal");

    var $classifyModal, $confirmDeleteBtn, $classifyContent;
    $classifyModal = $("#classifyModal");
    $classifyContent = $("#classifyContent");
    $confirmDeleteBtn = $("#confirmDeleteBtn");

    $inputTitleHint = $("#inputTitleHint");
    $inputSrcHint = $("#inputSrcHint");
    $inputIntroHint = $("#inputIntroHint");
    $CountHint = $("#CountHint");

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
    if (url.indexOf("?") != -1) {
        var id = url.substr(1).split("&")[0].split("=")[1];
        $.ajax({
            url: "/_admin/s/task/articles/" + id,
            type: "GET",
            success: function(data) {
                if (data.code == 200) {
                    article = data.data.article;
                    info = data.data.info;
                    initialForm(article, info);
                } else if (data.code == 403) {
                    $permissionModal.modal('show');
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
                if (result.code == 200) {
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

        // judge the classify
        if (data.classify == 1) {
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

        if (info.beginTime == null) {
            $beginDatetimepicker.data("DateTimePicker").defaultDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
        } else {
            // initial Schedule info
            $scheduleId.val(info.id);
            $AdId.val(info.advertiserId1);
            $Price.val(info.price1);
            $Count.val(info.limitRetweetCount1);
            if (info.beginTime != null) {
                $beginDatetimepicker.data("DateTimePicker").defaultDate(moment(info.beginTime).format('YYYY-MM-DD HH:mm:ss'));
            }
            if (info.endTime != null) {
                $endDatetimepicker.data("DateTimePicker").defaultDate(moment(info.endTime).format('YYYY-MM-DD HH:mm:ss'));
            }
            $profitLimit.val(info.limitProfit);
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
        if ($previewContent.width() > 558) {
            $(".previewImage").css("max-width", $previewContent.width() + 'px');
        }
    });

    // Form validation
    $inputSrc.on('input', function() {
        $inputSrc.parent().removeClass('has-error');
    });
    $inputSrc.on('blur', function() {
        if ($inputSrc.val() !== "") {
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
        if ($inputTitle.val() !== "") {
            $inputTitleHint.removeClass("form-hint-nec").addClass("form-hint-suc");
            $inputTitleHint.html('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $inputTitleHint.removeClass("form-hint-suc").addClass("form-hint-nec");
            $inputTitleHint.html('(*必填)');
        }
    });

    $inputIntro.on('input', function() {
        $inputIntro.parent().removeClass('has-error');
    });
    $inputIntro.on('blur', function() {
        if ($inputIntro.val() !== "") {
            $inputIntroHint.removeClass("form-hint-nec").addClass("form-hint-suc");
            $inputIntroHint.html('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $inputIntroHint.removeClass("form-hint-suc").addClass("form-hint-nec");
            $inputIntroHint.html('(*必填)');
        }
    });

    $Count.on('input', function() {
        $Count.parent().removeClass('has-error');
    });
    $Count.on('blur', function() {
        if ($Count.val() !== "") {
            $CountHint.removeClass("form-hint-nec").addClass("form-hint-suc");
            $CountHint.html('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $CountHint.removeClass("form-hint-suc").addClass("form-hint-nec");
            $CountHint.html('(*必填)');
        }
    });

    $selectClassify.on('change', function() {
        if ($scheduleId.val() != "") {
            $classifyModal.modal('show');
        } else {
            if ($selectClassify.val() == 1) {
                $("#inputUrlContainer").hide();
                $("#adIdContainer").show();
                $("#editorContainer").show();
            } else {
                $("#inputUrlContainer").show();
                $("#adIdContainer").hide();
                $("#editorContainer").hide();
            }
        }
    });

    $confirmDeleteBtn.on('click', function() {
        $classifyContent.text('重置中...');
        $.ajax({
            type: "DELETE",
            url: "/_admin/s/task/infos/" + $scheduleId.val(),
            success: function(data) {
                if (data.code == 200) {
                    $classifyContent.text("重置成功!");
                    $classifyModal.modal('hide');
                    if ($selectClassify.val() == 1) {
                        $("#inputUrlContainer").hide();
                        $("#adIdContainer").show();
                        $("#editorContainer").show();
                    } else {
                        $("#inputUrlContainer").show();
                        $("#adIdContainer").hide();
                        $("#editorContainer").hide();
                    }
                    setSchduleFormDisable(false);
                } else if (data.code == 403) {
                    $permissionModal.modal('show');
                } else {
                    console.log(data);
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    });

    function setSchduleFormDisable(disableStatus) {
        if (disableStatus == false) {
            $scheduleId.val('');
            $AdId.val('');
            $Price.val('');
            $Count.val('');
            $profitLimit.val('');
            $beginDatetimepicker.data("DateTimePicker").defaultDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
            $endDatetimepicker.data("DateTimePicker").clear();
            $selectPlatform.find('option[value=0]').attr('selected', true);
        }
        $AdId.attr('disabled', disableStatus);
        $Price.attr('disabled', disableStatus);
        $Count.attr('disabled', disableStatus);
        $profitLimit.attr('disabled', disableStatus);
        $("#beginTime").attr('disabled', disableStatus);
        $("#endTime").attr('disabled', disableStatus);
        $selectPlatform.attr('disabled', disableStatus);
    }

    function bindBtnEvent() {
        $confirmModal = $("#confirmModal");
        $confirmContent = $("#confirmContent");
        $deleteScheduleBtn = $("#deleteScheduleBtn");
        $deleteScheduleBtn.on('click', function() {
            if ($scheduleId.val() == "") {
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
                url: "/_admin/s/task/infos/" + $scheduleId.val(),
                success: function(data) {
                    if (data.code == 200) {
                        $confirmContent.text("删除成功!");
                        $confirmModal.modal('hide');
                        setSchduleFormDisable(false);
                    } else if (data.code == 403) {
                        $permissionModal.modal('show');
                    }
                }
            });
        });

        $videoUrl = $("#videoUrl");
        $videoLinkBtn = $("#videoLinkBtn");
        $videoLinkBtn.on('click', function() {
            var html = getVideoHtmlTemplate($videoUrl.val());
            if (html !== '') {
                $('#videoModal').modal('hide');
                ue.execCommand('inserthtml', html);
                $videoUrl.val('');
            } else {
                $('#videoModal').modal('hide');
                $errorMsg.html("视频链接转换失败，请确保链接属于腾讯视频或优酷视频.");
                $errorModal.modal('show');
            }
        });

        $submitBtn = $("#submitBtn");
        $submitBtn.on('click', function(event) {
            if (!checkFormValidation()) {
                return;
            }
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
                    if (data.code == 200) {
                        $successModal.modal({
                            backdrop: 'static',
                            show: true
                        });
                    } else if (data.code == 403) {
                        $permissionModal.modal('show');
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

    function checkFormValidation() {
        if ($inputSrc.val() === "") {
            $inputSrc.parent().addClass('has-error');
            $inputSrc.focus();
            return 0;
        }
        if ($inputTitle.val() === "") {
            $inputTitle.parent().addClass('has-error');
            $inputTitle.focus();
            return 0;
        }
        if ($inputIntro.val() === "") {
            $inputIntro.parent().addClass('has-error');
            $inputIntro.focus();
            return 0;
        }
        if ($Count.val() === "") {
            $Count.parent().addClass('has-error');
            $Count.focus();
            return 0;
        }
        return 1;
    }
});
