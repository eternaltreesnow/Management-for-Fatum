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

    var $submitBtn;
    var $selectDomain;
    var $selectClassify, $time, $selectType, $inputSrc, $inputTitle, $inputIntro, $inputFile, $inputUrl, $AdId1, $Count, $profitLimit, $endTime;
    var $successModal, $errorMsg, $errorModal;
    var $beginDatetimepicker, $endDatetimepicker;
    var $videoUrl, $videoLinkBtn;

    var $inputTitleHint, $inputSrcHint, $inputIntroHint, $inputFileHint, $inputUrlHint, $AdId1Hint, $AdId2Hint, $profitLimitHint;

    var $permissionModal;
    $permissionModal = $("#permissionModal");

    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");
    $inputIntro = $("#inputIntro");
    $inputFile = $("#inputFile");
    $inputUrl = $("#inputUrl");
    $AdId1 = $("#AdId1");
    $Count = $("#Count");
    $profitLimit = $("#profitLimit");
    $endTime = $("#endTime");

    $inputSrcHint = $("#inputSrcHint");
    $inputTitleHint = $("#inputTitleHint");
    $inputIntroHint = $("#inputIntroHint");
    $inputFileHint = $("#inputFileHint");
    $inputUrlHint = $("#inputUrlHint");
    $AdId1Hint = $("#AdId1Hint");
    // $AdId2Hint = $("#AdId2Hint");
    $profitLimitHint = $("#profitLimitHint");

    $successModal = $("#successModal");
    $errorMsg = $("#errorMsg");
    $errorModal = $("#errorModal");

    $selectClassify = $("#selectClassify");
    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");

    /**
     * 初始化分类
     * $selectType 文章分类
     */
    $selectType = $("#selectType");
    Papa.parse('../../lib/article_type.csv', {
        download: true,
        header: true,
        complete: function(result) {
            var options = '';
            result.data.map(function(item) {
                options += '<option value="' + item['id'] + '">' + item['article_class_name'] + '</option>';
            });
            $selectType.append(options);
        }
    });

    $selectDomain = $("#selectDomain");
    $.ajax({
        url: '/_admin/s/article_domains',
        type: 'GET',
        async: true,
        success: function(data) {
            if (data.code == 200) {
                var options = '';
                data.data.map(function(value) {
                    options += '<option value="' + value + '">' + value + '</option>';
                });
                $selectDomain.append(options);
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

    // initial UEditor
    var ue = UE.getEditor('editorArticle', {
        toolbars: [
            ['fullscreen', 'source', 'undo', 'redo'],
            ['customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight'],
            ['directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'pagebreak', 'horizontal', 'date', 'time', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|', 'drafts']
        ]
    });

    // Form validation
    $inputTitle.on('input', function() {
        $inputTitle.parent().removeClass('has-error');
    });
    $inputSrc.on('input', function() {
        $inputSrc.parent().removeClass('has-error');
    });
    $inputIntro.on('input', function() {
        $inputIntro.parent().removeClass('has-error');
    });
    $inputFile.on('change', function() {
        $inputFile.parent().removeClass('has-error');
    });
    $inputUrl.on('input', function() {
        $inputUrl.parent().removeClass('has-error');
    });
    $AdId1.on('input', function() {
        $AdId1.parent().removeClass('has-error');
    });
    $Count.on('input', function() {
        $Count.parent().removeClass('has-error');
    });
    $profitLimit.on('input', function() {
        $profitLimit.parent().removeClass('has-error');
    });

    ue.ready(function() {
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
        $time = $("#time");
        $begintime = $("#begintime");
        $endtime = $("#endtime");
        $submitBtn = $("#submitBtn");
        $submitBtn.on('click', function(event) {
            if (!checkFormValidation()) {
                return;
            }

            $time.val(moment(new Date()).format('x'));
            $begintime.val(moment($("#beginTime").val()).format('x'));
            $endtime.val(moment($("#endTime").val()).format('x'));
            var formdata = new FormData($("#addArticleForm")[0]);
            $.ajax({
                type: "POST",
                url: "/_admin/s/task/articles",
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
    });

    function checkFormValidation() {
        if ($inputTitle.val() === "") {
            $inputTitle.parent().addClass('has-error');
            $inputTitle.focus();
            return 0;
        }
        if ($inputSrc.val() === "") {
            $inputSrc.parent().addClass('has-error');
            $inputSrc.focus();
            return 0;
        }
        if ($inputIntro.val() === "") {
            $inputIntro.parent().addClass('has-error');
            $inputIntro.focus();
            return 0;
        }
        if ($inputFile.val() === "") {
            $inputFile.parent().addClass('has-error');
            $inputFile.focus();
            return 0;
        }
        if ($selectClassify.val() == 2 && $inputUrl.val() === "") {
            $inputUrl.parent().addClass('has-error');
            $inputUrl.focus();
            return 0;
        }
        if ($selectClassify.val() == 1 && $AdId1.val() === "") {
            $AdId1.parent().addClass('has-error');
            $AdId1.focus();
            return 0;
        }
        if ($Count.val() === "") {
            $Count.focus();
            return 0;
        }
        if ($endTime.val() === "") {
            $endTime.focus();
            return 0;
        }
        if ($profitLimit.val() === "") {
            $profitLimit.parent().addClass('has-error');
            $profitLimit.focus();
            return 0;
        }
        return 1;
    }

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
        useCurrent: false
    });
    $beginDatetimepicker.on("dp.change", function(e) {
        $endDatetimepicker.data("DateTimePicker").minDate(e.date);
    });
    $endDatetimepicker.on("dp.change", function(e) {
        $beginDatetimepicker.data("DateTimePicker").maxDate(e.date);
    });

    $inputUrlContainer = $("#inputUrlContainer");
    $adIdContainer = $("#adIdContainer");
    $editorContainer = $("#editorContainer");
    $selectClassify.on('change', function() {
        if ($selectClassify.val() == 1) {
            $inputUrlContainer.hide();
            $adIdContainer.show();
            $editorContainer.show();
        } else {
            $inputUrlContainer.show();
            $adIdContainer.hide();
            $editorContainer.hide();
        }
    });
});
