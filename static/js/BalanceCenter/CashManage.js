$(function() {
    var datatable;
    var $cashTable;
    var $linkCheck, $linkPass, $linkModify;
    var $checkId, $passId;
    var $checkModal, $passModal;
    var $checkModalBtn, $uncheckModalBtn, $passModalBtn, $unpassModalBtn;

    $checkId = $("#checkId");
    $checkModal = $("#checkModal");
    $passId = $("#passId");
    $passModal = $("#passModal");

    var column = [
        {"data": "id"},
        {"data": "user.id"},
        {"data": "user.phone"},
        {"data": "user.alipay"},
        {"data": "cash"},
        {"data": "time"},
        {"data": "profitReason"},
        {"data": ""}
    ];
    var tempdata = [
        {
            "id" : "1",
            "user" : {
                "id" : "1",
                "phone" : "13300000000",
                "alipay" : "13300000000"
            },
            "cash" : "500.00",
            "time" : '2015/11/30 15:30',
            "profitReason" : "ReasonReason"
        }
    ];

    /**
     * 初始化表格
     * $cashTable 广告表格
     */
    $cashTable = $("#cashTable");
    datatable = $cashTable.DataTable({
        processing: true,
        language: {
            "search" : "内容搜索: ",
            "searchPlaceholder" : "输入搜索条件",
            "processing": "数据加载中, 请稍后...",
            "zeroRecords": "记录数为0...",
            "emptyTable":  "记录数为0...",
            "paginate": {
                "first": "首页",
                "previous": "上一页",
                "next": "下一页",
                "last": "尾页"
            },
            "lengthMenu": '每页显示 _MENU_ 条记录'
        },
        columns: column,
        pagingType: "full_numbers",
        dom: 'rtlp',
        serverSide: true,
        ajax: {
            url: '/_admin/s/user_withdraw',
            type: 'GET',
            data: function(d) {
                delete d.columns;
                delete d.order;
                d.limit = d.length;
                delete d.length;
                d.search.keyword = $inputKeyword.val();
                d.keyword = $inputKeyword.val();
            }
        },
        sortClasses: false,
        columnDefs: [{
            "targets" : -1,
            "data" : null,
            "defaultContent" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                               '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                               '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>'
        }],
        initComplete: function(settings, json) {
            bindBtnEvent();
        }
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload(function ( json ) {
            bindBtnEvent();
        });
    });

    function bindBtnEvent() {
        $linkCheck = $('[data-link="check"]');
        $linkPass = $('[data-link="pass"]');
        $linkModify = $('[data-link="modify"]');

        $linkCheck.on('click', function() {
            var $this = $(this);
            $checkId.val($this.parents("tr").children(":first").html());
            $checkModal.modal('show');
        });

        $linkPass.on('click', function() {
            var $this = $(this);
            $passId.val($this.parents("tr").children(":first").html());
            $passModal.modal('show');
        });

        $linkModify.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            location.href = "EditCash.html?id=" + id;
        });
    }

    $checkModalBtn = $("#checkModalBtn");
    $checkModalBtn.on('click', function() {
        var requestData = {
            "id" : $checkId.val(),
            "check" : true
        };
        $.ajax({
            type: "POST",
            url: "",
            data: requestData,
            dataType: "json",
            success: function(data) {
            },
            error: function(data) {
            }
        });
    });
    $uncheckModalBtn = $("#uncheckModalBtn");
    $uncheckModalBtn.on('click', function() {
        var requestData = {
            "id" : $checkId.val(),
            "check" : false
        };
        $.ajax({
            type: "POST",
            url: "",
            data: requestData,
            dataType: "json",
            success: function(data) {
            },
            error: function(data) {
            }
        });
    });
    $passModalBtn = $("#passModalBtn");
    $passModalBtn.on('click', function() {
        var requestData = {
            "id" : $passId.val(),
            "check" : true
        };
        $.ajax({
            type: "POST",
            url: "",
            data: requestData,
            dataType: "json",
            success: function(data) {
            },
            error: function(data) {
            }
        });
    });
    $unpassModalBtn = $("#unpassModalBtn");
    $unpassModalBtn.on('click', function() {
        var requestData = {
            "id" : $passId.val(),
            "check" : false
        };
        $.ajax({
            type: "POST",
            url: "",
            data: requestData,
            dataType: "json",
            success: function(data) {
            },
            error: function(data) {
            }
        });
    });
});
