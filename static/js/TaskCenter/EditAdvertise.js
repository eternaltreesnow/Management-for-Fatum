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

    /**
     * init 初始化
     */
    var url = location.search;
    if(url.indexOf("?") != -1) {
        id = url.substr(1).split("&")[0].split("=")[1];
        $.ajax({
            url: "/_admin/s/task/editadvertise",
            type: "GET",
            data: function(data) {
                data.id = id;
            },
            dataType: "json",
            success: function(data) {
                if(data.error == "") {
                    initialForm(data.advertise);
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
        $advertiseId.val(data['id']);
        $selectType.find('option[value="' + data["type"] + '"]').attr("selected", true);
        $inputOwner.val(data["advertiser"]);
        $inputTitle.val(data["name"]);
        $inputNick.val(data["alias"]);
        $uploadedFile.html(data["image"]);
        $inputAdder.val(data["adder"]);
    }


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
        var formdata = new FormData($("#editAdvertiseForm"));
        $.ajax({
            type: 'POST',
            url: '/_admin/s/task/advertises',
            // data: $("#editAdvertiseForm").serialize(),
            data: formdata,
            processData: false,         // tell jQuery not to process the data
            contentType: false,         // tell jQuery not to set the request header
            success: function(data) {
                if(data) {
                    alert('form submitted');
                }
            },
            error: function(data) {
                alert(data.data.msg);
            }
        });
    });
});
