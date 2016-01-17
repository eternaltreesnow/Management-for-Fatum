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

    var $submitBtn, $cancerBtn;
    var $selectType, $inputOwner, $inputTitle, $inputNick, $inputFile, $inputUrl;
    var $selectTypeHint, $inputOwnerHint, $inputTitleHint, $inputNickHint;
    var $successModal, $cancerModal;
    var $errorModal, $errorMsg;

    $selectType = $("#selectType");
    $inputOwner = $("#inputOwner");
    $inputTitle = $("#inputTitle");
    $inputNick = $("#inputNick");
    $inputFile = $("#inputFile");
    $inputUrl = $("#inputUrl");

    $selectTypeHint = $("#selectTypeHint");
    $inputOwnerHint = $("#inputOwnerHint");
    $inputTitleHint = $("#inputTitleHint");
    $inputNickHint = $("#inputNickHint");
    $successModal = $("#successModal");

    $errorModal = $("#errorModal");
    $errorMsg = $("#errorMsg");

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function() {
        if($inputOwner.val() === "") {
            $inputOwner.parent().addClass('has-error');
            $inputOwner.focus();
            return;
        } else {
            $inputOwnerHint.html('<span class="glyphicon glyphicon-ok"></span>');
        }
        if($inputTitle.val() === "") {
            $inputTitle.parent().addClass('has-error');
            $inputTitle.focus();
            return;
        }
        var formdata = new FormData($("#addAdvertiseForm")[0]);
        $.ajax({
            type: 'POST',
            url: '/_admin/s/task/advertises',
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

    $inputOwner.on('input', function() {
        $inputOwner.parent().removeClass('has-error');
    });
    $inputOwner.on('blur', function() {
        if($inputOwner.val() !== "") {
            $inputOwnerHint.removeClass("form-hint-nec").addClass("form-hint-suc");
            $inputOwnerHint.html('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $inputOwnerHint.removeClass("form-hint-suc").addClass("form-hint-nec");
            $inputOwnerHint.html('(*必填)');
        }
    });

    $inputTitle.on('input', function() {
        $inputTitle.parent().removeClass('has-error');
    });
    $inputTitle.on('blur', function() {
        if($inputTitle.val() !== "") {
            $inputTitleHint.removeClass("form-hint-nec").addClass("form-hint-suc");
            $inputTitleHint.html('<span class="glyphicon glyphicon-ok"></span>');
        } else {
            $inputTitleHint.removeClass("form-hint-suc").addClass("form-hint-nec");
            $inputTitleHint.html('(*必填)');
        }
    });

    $cancerModal = $("#cancerModal");
    $cancerBtn = $("#cancerBtn");
    $cancerBtn.on('click', function() {
        if($inputOwner.val() !== "" || $inputTitle.val() !== "" || $inputNick.val() !== "" || $inputFile.val() !== "") {
            $cancerModal.modal('show');
        } else {
            location.href = "AdvertiseManage.html";
        }
    });
});
