$(function() {
    var $advertiseId, $selectType, $inputOwner, $inputTitle, $inputNick, $uploadedFile, $inputAdder;
    var $submitBtn;
    var $inputOwnerHint, $inputTitleHint;

    $advertiseId = $("#advertiseId");
    $selectType = $("#selectType");
    $inputOwner = $("#inputOwner");
    $inputTitle = $("#inputTitle");
    $inputNick = $("#inputNick");
    $uploadedFile = $("#uploadedFile");
    $inputAdder = $("#inputAdder");

    var $tempdata = {
        id: "1",
        type: "2",
        owner: "广告主",
        title: "标题1:",
        nick: "别名1",
        file: "filename1.xxxx",
        adder: "username"
    };

    /**
     * init 初始化
     */
    $advertiseId.val($tempdata['id']);
    $selectType.find('option[value="' + $tempdata["type"] + '"]').attr("selected", true);
    $inputOwner.val($tempdata["owner"]);
    $inputTitle.val($tempdata["title"]);
    $inputNick.val($tempdata["nick"]);
    $uploadedFile.html($tempdata["file"]);
    $inputAdder.val($tempdata["adder"]);

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
        $("#editAdvertiseForm").submit();
    });
});
