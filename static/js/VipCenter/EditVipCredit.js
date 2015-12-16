$(function() {
    var profitDetails;
    var $inputTimePicker;
    var $creditId, $userId, $inputCredit, $inputTime, $inputReason, $selectStatus;
    var $submitBtn;

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
                if(data.error == "") {
                    profitDetails = data.profitDetails;
                    initialForm(profitDetails);
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
        $creditId.val(data.id);
        $userId.val(data.user.id);
        $inputPoints.val(data.points);
        $inputTime.val(data.time);
        $inputReason.val(data.reason);
        $selectStatus.find('option[value="' + data["status"] + '"]').attr("selected", true);
    }

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD HH:mm',
        defaultDate: profitDetails['time']
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
        $.ajax({
            type: "POST",
            url: "/_admin/s/user_profit_details",
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
