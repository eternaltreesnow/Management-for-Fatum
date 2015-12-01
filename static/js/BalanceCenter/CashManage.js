$(function() {
    var $cashTable;
    var $linkCheck, $linkPass, $linkModify;
    var $checkId, $passId;
    var $checkModal, $passModal;
    var $checkModalBtn, $uncheckModalBtn, $passModalBtn, $unpassModalBtn;

    var tempcolumn = [
        {"data": "id"},
        {"data": "phone"},
        {"data": "alipay"},
        {"data": "money"},
        {"data": "date"},
        {"data": "edit"}
    ];
    var tempdata = [
        {
            "id" : "1",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "2",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "3",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "4",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "5",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "6",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "7",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "8",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "money" : "500.00",
            "date" : '2015/11/30 15:30',
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        }
    ];

    /**
     * 初始化表格
     * $cashTable 广告表格
     */
    $cashTable = $("#cashTable");
    $cashTable.DataTable({
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
        data: tempdata,
        columns: tempcolumn,
        pagingType: "full_numbers",
        dom: 'frtlp'
    });
    $("div#cashTable_filter").append('<b class="table-title pull-left">提现列表</b>');

    $linkCheck = $('[data-link="check"]');
    $linkPass = $('[data-link="pass"]');
    $linkModify = $('[data-link="modify"]');

    $checkId = $("#checkId");
    $checkModal = $("#checkModal");
    $linkCheck.on('click', function() {
        var $this = $(this);
        $checkId.val($this.parents("tr").children(":first").html());
        $checkModal.modal('show');
    });

    $passId = $("#passId");
    $passModal = $("#passModal");
    $linkPass.on('click', function() {
        var $this = $(this);
        $passId.val($this.parents("tr").children(":first").html());
        $passModal.modal('show');
    });

    $checkModalBtn = $("#checkModalBtn");
    $checkModalBtn.on('click', function() {
        var requestData = {
            "id" : $checkId.val(),
            "check" : true
        };
        $.ajax({
            async: true,
            type: "GET",
            url: "checkCash", //补充审核积分信息api
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
            async: true,
            type: "GET",
            url: "checkCash", //补充审核积分信息api
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
            async: true,
            type: "GET",
            url: "passCash", //补充通过积分信息api
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
            async: true,
            type: "GET",
            url: "passCash", //补充通过积分信息api
            data: requestData,
            dataType: "json",
            success: function(data) {
            },
            error: function(data) {
            }
        });
    });

    $linkModify.on('click', function() {
        var $this = $(this);
        var id = $this.parents("tr").children(":first").html();
        location.href = "EditCash.html?id=" + id;
    });
});
