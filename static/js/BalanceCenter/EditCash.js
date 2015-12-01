$(function() {
    var $inputTimePicker;
    var $cashId, $inputPhone, $inputAlipay, $inputMoney, $inputTime;
    var $submitBtn;

    var $tempdata = {
        id: 1,
        phone: "13300000000",
        alipay: "13300000000",
        money: "300.00",
        time: '2015/12/05 11:11'
    };

    $cashId = $("#cashId");
    $inputPhone = $("#inputPhone");
    $inputAlipay = $("#inputAlipay");
    $inputMoney = $("#inputMoney");
    $inputTime = $("#inputTime");
    /**
     * init 初始化
     */
    $cashId.val($tempdata['id']);
    $inputPhone.val($tempdata['phone']);
    $inputAlipay.val($tempdata['alipay']);
    $inputMoney.val($tempdata['money']);

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm',
        defaultDate: $tempdata['time']
    });

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        var requestData = {
            id: $cashId.val(),
            phone: $inputPhone.val(),
            alipay: $inputAlipay.val(),
            money: $inputMoney.val(),
            time: $inputTime.val()
        };
        $.ajax({
            async: true,
            type: "GET",
            url: "editCash", //补充修改提现信息api
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
