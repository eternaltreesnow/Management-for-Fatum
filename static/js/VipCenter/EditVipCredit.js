$(function() {
    var $inputTimePicker;
    var $creditId, $inputPhone, $inputCredit, $inputTime, $inputReason, $inputTask, $inputArticle, $inputSignin;
    var $submitBtn;

    var $tempdata = {
        id: 1,
        phone: "13300000000",
        credit: 30,
        time: '2015/12/05 11:11',
        reason: '因xxx而获得积分30',
        task: '任务名1',
        article: '文章名1',
        signin: '已签到'
    };

    $creditId = $("#creditId");
    $inputPhone = $("#inputPhone");
    $inputCredit = $("#inputCredit");
    $inputTime = $("#inputTime");
    $inputReason = $("#inputReason");
    $inputTask = $("#inputTask");
    $inputArticle = $("#inputArticle");
    $inputSignin = $("#inputSignin");
    /**
     * init 初始化
     */
    $creditId.val($tempdata['id']);
    $inputPhone.val($tempdata['phone']);
    $inputCredit.val($tempdata['credit']);
    $inputReason.val($tempdata['reason']);
    $inputTask.val($tempdata['task']);
    $inputArticle.val($tempdata['article']);
    $inputSignin.val($tempdata['signin']);

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm',
        defaultDate: $tempdata['time']
    });

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        var requestData = {
            id: $creditId.val(),
            phone: $inputPhone.val(),
            credit: $inputCredit.val(),
            time: $inputTime.val(),
            reason: $inputReason.val(),
            task: $inputTask.val(),
            article: $inputArticle.val(),
            signin: $inputSignin.val()
        };
        $.ajax({
            async: true,
            type: "GET",
            url: "editVipCredit", //补充修改积分api
            data: requestData,
            dataType: "json",
            success: function(data) {
                if(data.type == 1) {
                    alert("修改成功!");
                    location.href = "VipCredit.html";
                } else {
                    alert("修改失败，请重试...");
                }
            },
            error: function(data) {
                alert("修改失败，请重试...");
            }
        });
    });
});
