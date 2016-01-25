$(function() {
    $("#userName").text(localStorage['user']);
    $("#logoutBtn").on('click', function() {
        $.ajax({
            url: "/_admin/s/logout",
            type: 'GET',
            success: function(data) {
                if (data.code == 200) {
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

    var ids = [3, 32];
    initialMenuTreeByIds(ids);

    var $submitBtn;
    var $selectDomain, $selectType, $time, $inputSrc, $inputTitle, $inputIntro, $inputFile, $AdId1, $AdId2;
    var $successModal, $errorMsg, $errorModal;
    var $beginDatetimepicker, $endDatetimepicker;
    var $fetchUrl, $fetchBtn;
    var $videoUrl, $videoLinkBtn;

    var $inputTitleHint, $inputSrcHint;

    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");
    $inputIntro = $("#inputIntro");
    $inputFile = $("#inputFile");
    $AdId1 = $("#AdId1");
    $AdId2 = $("#AdId2");

    $inputTitleHint = $("#inputTitleHint");
    $inputSrcHint = $("#inputSrcHint");

    $selectType = $("#selectType");
    $selectDomain = $("#selectDomain");

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

    /**
     * 初始化域名
     * $selectDomain 域名
     */
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
            ['directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'pagebreak', 'horizontal', 'date', 'time', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|', 'drafts', 'videoLinkBtn']
        ]
    });
    ue.ready(function() {
        bindBtnEvent();
    });

    // Form validation
    $inputSrc.on('input', function() {
        $inputSrc.parent().removeClass('has-error');
    });
    $inputTitle.on('input', function() {
        $inputTitle.parent().removeClass('has-error');
    });
    $inputFile.on('change', function() {
        $inputFile.parent().removeClass('has-error');
    });
    $AdId1.on('input', function() {
        $AdId1.parent().removeClass('has-error');
    });
    $AdId2.on('input', function() {
        $AdId2.parent().removeClass('has-error');
    });

    function bindBtnEvent() {
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
                    if (data.code == 200) {
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
        $submitBtn.on('click', function() {
            if ($inputTitle.val() === "") {
                $inputTitle.parent().addClass('has-error');
                $inputTitle.focus();
                return;
            }
            if ($inputSrc.val() === "") {
                $inputSrc.parent().addClass('has-error');
                $inputSrc.focus();
                return;
            }
            if ($inputFile.val() === "") {
                $inputFile.parent().addClass('has-error');
                $inputFile.focus();
                return;
            }
            if ($AdId1.val() === "") {
                $AdId1.parent().addClass('has-error');
                $AdId1.focus();
                return;
            }
            if ($AdId2.val() === "") {
                $AdId2.parent().addClass('has-error');
                $AdId2.focus();
                return;
            }
            $time.val(event.timeStamp);
            $begintime.val(moment($("#beginTime").val()).format('x'));
            $endtime.val(moment($("#endTime").val()).format('x'));
            var formdata = new FormData($("#addArticleForm")[0]);
            $.ajax({
                type: "POST",
                url: "/_admin/s/article/articles",
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
