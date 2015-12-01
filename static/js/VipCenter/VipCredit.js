$(function() {
    var $vipCreditTable;
    var $linkCheck, $linkPass, $linkModify;
    var $datetimepicker;
    var $checkId, $passId;
    var $checkModal, $passModal;
    var $checkModalBtn, $uncheckModalBtn, $passModalBtn, $unpassModalBtn;
    var $filterDate, $filterSearchBtn, $filterClearBtn;

    var tempcolumn = [
        {"data": "id"},
        {"data": "phone"},
        {"data": "credit"},
        {"data": "date"},
        {"data": "reason"},
        {"data": "task"},
        {"data": "article"},
        {"data": "signin"},
        {"data": "edit"}
    ];
    var tempdata = [
        {
            "id" : "1",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "2",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "3",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "4",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "5",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "6",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "7",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "8",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
        {
            "id" : "9",
            "phone" : "13300000000",
            "credit" : "文章1",
            "date" : "上线",
            "reason" : "因为完成xx任务获得积分",
            "task" : "XXX任务",
            "article" : "文章名称XXX",
            "signin" : "已签到",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">通过</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="modify">修改</a>',
        },
    ];

    /**
     * 初始化表格
     * $vipCreditTable 积分表格
     */
    $vipCreditTable = $("#vipCreditTable");
    $vipCreditTable.DataTable({
        processing: true,
        language: {
            "search" : "内容搜索: ",
            "searchPlaceholder" : "ID/手机号/...",
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
    $("div#articleTable_filter").append('<b class="table-title pull-left">积分信息列表</b>');

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY/MM/DD'
    });

    $filterDate = $("#filterDate");
    $filterSearchBtn = $("#filterSearchBtn");
    $filterSearchBtn.on('click', function() {
        var requestData = {
            date: $filterDate.val()
        };
        $.ajax({
            async: true,
            type: "GET",
            url: "searchCreditByDate", //补充搜索api
            data: requestData,
            dataType: "json",
            success: function(data) {
                // 获取搜索结果
            },
            error: function(data) {
            }
        });
    });
    $filterClearBtn = $("#filterClearBtn");
    $filterClearBtn.on('click', function() {
        $("#filterDate").val(null);
    });

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

    $linkModify.on('click', function() {
        var $this = $(this);
        var id = $this.parents("tr").children(":first").html();
        location.href = "EditVipCredit.html?id=" + id;
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
            url: "checkCredit", //补充审核积分信息api
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
            url: "checkCredit", //补充审核积分信息api
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
            url: "passCredit", //补充通过积分信息api
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
            url: "passCredit", //补充通过积分信息api
            data: requestData,
            dataType: "json",
            success: function(data) {
            },
            error: function(data) {
            }
        });
    });
});
