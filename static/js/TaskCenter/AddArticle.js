$(function() {
    var $submitBtn;
    var $selectType, $inputSrc, $inputTitle, $inputAdder;
    var $successModal, $errorMsg, $errorModal;

    $successModal = $("#successModal");
    $errorMsg = $("#errorMsg");
    $errorModal = $("#errorModal");

    $selectType = $("#selectType");
    $inputSrc = $("#inputSrc");
    $inputTitle = $("#inputTitle");

    $submitBtn = $("#submitBtn");
    $submitBtn.on('click', function(event) {
        var formdata = new FormData($("#addArticleForm")[0]);
        formdata.append('time', event.timeStamp);
        $.ajax({
            type: "POST",
            url: "/_admin/s/task/articles",
            cache: false,
            data: formdata,
            processData: false,
            contentType: false,
            success: function(data) {
                if(data.code == 200) {
                    $successModal.modal({
                        dropback: 'static',
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
