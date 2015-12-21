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

    var withdraws;
    var $inputTimePicker;
    var $cashId, $userId, $inputAlipay, $inputCash, $time, $inputTime, $inputReason;
    var $submitBtn;
    var $successModal, $errorModal, $errorMsg;

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
    $time = $("#time");

    $successModal = $("#successModal");
    $errorModal = $("#errorModal");
    $errorMsg = $("#errorMsg");

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
                if(data.code == 200) {
                    withdraws = data.data.withdraws;
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
        $datetimepicker.data('DateTimePicker').defaultDate(moment(data.time).format('YYYY-MM-DD HH:mm'));
    }

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY-MM-DD HH:mm'
    });

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        $time.val(moment($inputTime.val()).format('x'));
        var formdate = new FormDate($("#cashForm")[0]);
        $.ajax({
            type: "POST",
            url: "/_admin/s/user_withdraw/" + $cashId.val(),
            data: formdate,
            cache: false,
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
