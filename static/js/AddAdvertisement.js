$(function() {
    var $submitBtn, $cancerBtn;
    var $selectType, $inputOwner, $inputTitle, $inputNick, $inputFile;
    var $selectTypeHint, $inputOwnerHint, $inputTitleHint, $inputNickHint;
    var $cancerModal;

    $submitBtn = $("#submitBtn");
    $cancerBtn = $("#cancerBtn");

    $selectType = $("#selectType");
    $inputOwner = $("#inputOwner");
    $inputTitle = $("#inputTitle");
    $inputNick = $("#inputNick");
    $inputFile = $("#inputFile");

    $selectTypeHint = $("#selectTypeHint");
    $inputOwnerHint = $("#inputOwnerHint");
    $inputTitleHint = $("#inputTitleHint");
    $inputNickHint = $("#inputNickHint");

    $cancerModal = $("#cancerModal");

    $submitBtn.on('click', function() {
        if($inputOwner.val() === "") {
            $inputOwner.parent().addClass('has-error');
            $inputOwner.focus();
        } else {
            $inputOwnerHint.html('<span class="glyphicon glyphicon-ok"></span>');
        }
        if($inputTitle.val() === "") {
            $inputTitle.parent().addClass('has-error');
            $inputTitle.focus();
        }
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

    $cancerBtn.on('click', function() {
        if($inputOwner.val() !== "" || $inputTitle.val() !== "" || $inputNick.val() !== "" || $inputFile.val() !== "") {
            $cancerModal.modal('show');
        } else {
            location.href = "AdvertisementManagement.html";
        }
    });
});
