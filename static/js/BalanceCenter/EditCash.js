$(function() {
    var withdraws;
    var $inputTimePicker;
    var $cashId, $userId, $inputAlipay, $inputCash, $inputTime, $inputReason;
    var $submitBtn;

    var $tempdata = {
        id: 1,
        user: {
            id: 1,
            phone: "13300000000",
            alipay: "13300000000"
        },
        cash: "300.00",
        time: '2015/12/05 11:11',
        profitReason : "reasonreason"
    };

    $cashId = $("#cashId");
    $userId = $("#userId");
    $inputAlipay = $("#inputAlipay");
    $inputCash = $("#inputCash");
    $inputTime = $("#inputTime");
    $inputReason = $("#inputReason");
    /**
     * init 初始化
     */
    var url = location.search;
    if(url.indexOf("?") != -1) {
        var id = url.substr(1).split("&")[0].split("=")[1];
        $.ajax({
            url: "/_admin/s/user_withdraw/" + id,
            type: "GET",
            success: function(data) {
                if(data.error == "") {
                    withdraws = data.withdraws;
                    initialForm(withdraws);
                } else {
                    alert(data.error);
                }
            },
            error: function(data) {
            }
        });
    } else {

    }

    function initialForm(data) {
        $cashId.val(data.id);
        $userId.val(data.user.id);
        $inputAlipay.val(data.alipay);
        $inputCash.val(data.cash);
        $inputReason.val(data.profitReason);
    }

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm',
        defaultDate: withdraws['time']
    });

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        var requestData = {
            id: $cashId.val(),
            cash: $inputCash.val(),
            time: $inputTime.val(),
            profitReason : $inputReason.val()
        };
        $.ajax({
            type: "POST",
            url: "/_admin/s/user_withdraw",
            data: requestData,
            dataType: "json",
            success: function(data) {
                if(data) {
                    alert('form submitted!');
                }
            },
            error: function(data) {
                alert(data.data.msg);
            }
        });
    });
});
