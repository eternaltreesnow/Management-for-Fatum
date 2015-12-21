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

    var profitDetails;
    var $inputTimePicker;
    var $creditId, $userId, $inputCredit, $inputTime, $inputReason, $selectStatus, $time;
    var $submitBtn;
    var $successModal, $errorModal, $errorMsg;

    var tempdata = [
        {
            "id" : "1",
            "user" : {
                "id" : "1111",
                "phone" : "13300000000"
            },
            "points" : "11",
            "time" : "2015/12/15 15:30",
            "reason" : "因为完成xx任务获得积分",
            "status" : "1"
        }
    ];

    $creditId = $("#creditId");
    $userId = $("#userId");
    $inputPoints = $("#inputPoints");
    $inputTime = $("#inputTime");
    $inputReason = $("#inputReason");
    $selectStatus = $("#selectStatus");
    $time = $("#time");

    /**
     * init 初始化
     */
    var url = location.search;
    if(url.indexOf("?") != -1) {
        var id = url.substr(1).split("&")[0].split("=")[1];
        $.ajax({
            url: "/_admin/s/user_profit_details/" + id,
            type: "GET",
            success: function(data) {
                if(data.code == 200) {
                    profitDetails = data.data.profitDetails;
                    initialForm(profitDetails);
                } else {
                    console.log(data.error);
                }
            },
            error: function(data) {
            }
        });
    } else {

    }

    function initialForm(data) {
        $creditId.val(data.id);
        $userId.val(data.user.id);
        $inputPoints.val(data.points);
        $inputReason.val(data.reason);
        $selectStatus.find('option[value="' + data["status"] + '"]').attr("selected", true);
        $datetimepicker.data('DateTimePicker').defaultDate(moment(data.time).format('YYYY-MM-DD HH:mm'));
    }

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm'
    });

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        var requestData = {
            id: $creditId.val(),
            points: $inputPoints.val(),
            time: $inputTime.val(),
            reason: $inputReason.val(),
            status: $selectStatus.val()
        };
        $time.val(moment($inputTime.val()).format('x'));
        var formdata = new FormData($("#creditForm")[0]);
        $.ajax({
            type: "POST",
            url: "/_admin/s/user_profit_details/" + $creditId.val(),
            data: formdata,
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
