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

    var $advertiseId, $selectType, $inputOwner, $inputTitle, $inputNick;
    var $submitBtn;
    var $previewBtn, $previewModal, $previewContent;
    var $inputOwnerHint, $inputTitleHint;
    var $successModal;
    var $errorModal, $errorMsg;
    var advertise;

    $advertiseId = $("#advertiseId");
    $selectType = $("#selectType");
    $inputOwner = $("#inputOwner");
    $inputTitle = $("#inputTitle");
    $inputNick = $("#inputNick");
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
            url: "/_admin/s/task/advertises/" + id,
            type: "GET",
            success: function(data) {
                if(data.code == 200) {
                    advertise = data.data.advertise;
                    initialForm(advertise);
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
        $advertiseId.val(data['id']);
        $selectType.find('option[value="' + data["type"] + '"]').attr("selected", true);
        $inputOwner.val(data["advertiser"]);
        $inputTitle.val(data["name"]);
        $inputNick.val(data["alias"]);
    }

    $previewModal = $("#previewModal");
    $previewContent = $("#previewContent");
    $previewBtn = $("#previewBtn");
    $previewBtn.on('click', function() {
        $previewContent.html('<div style="text-align: center;"><img src="' + advertise.image + '"></img></div>');
        $previewModal.modal('show');
    });

    $inputOwnerHint = $("#inputOwnerHint");
    $inputTitleHint = $("#inputTitleHint");
    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        if($inputOwner.val() === "") {
            $inputOwner.parent().addClass('has-error');
            $inputOwner.focus();
            return;
        }
        if($inputTitle.val() === "") {
            $inputTitle.parent().addClass('has-error');
            $inputTitle.focus();
            return;
        }
        var formdata = new FormData($("#editAdvertiseForm")[0]);
        $.ajax({
            type: 'POST',
            url: '/_admin/s/task/advertises/' + $advertiseId.val(),
            cache: false,
            data: formdata,
            processData: false,         // tell jQuery not to process the data
            contentType: false,         // tell jQuery not to set the request header
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
