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

    var $submitBtn;
    var $selectDomain, $selectType;
    var $selectClassify, $time, $selectType, $inputSrc, $inputTitle, $inputAdder;
    var $successModal, $errorMsg, $errorModal;
    var $beginDatetimepicker, $endDatetimepicker;

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
            if(data.code == 200) {
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
    })

    // initial UEditor
    var ue = UE.getEditor('editorArticle', {
        toolbars: [
            ['fullscreen', 'source', 'undo', 'redo'],
            ['customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight'],
            ['directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'pagebreak', 'horizontal', 'date', 'time', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|', 'drafts']
        ]
    });
    ue.ready(function() {
        $time = $("#time");
        $begintime = $("#begintime");
        $endtime = $("#endtime");
        $submitBtn = $("#submitBtn");
        $submitBtn.on('click', function(event) {
            $("#content").val(ue.getContent());
            $time.val(event.timeStamp);
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
    });

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
});
