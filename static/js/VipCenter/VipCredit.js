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

    var datatable;
    var $vipCreditTable;
    var $linkCheck, $linkPass, $linkModify;
    var $datetimepicker;
    var $filterDate, $inputKeyword;
    var $checkId, $passId;
    var $checkModal, $passModal;
    var $checkModalBtn, $uncheckModalBtn, $passModalBtn, $unpassModalBtn;

    $filterDate = $("#filterDate");
    $inputKeyword = $("#inputKeyword");
    $checkId = $("#checkId");
    $checkModal = $("#checkModal");
    $passId = $("#passId");
    $passModal = $("#passModal");

    var column = [
        {"data": "id"},
        {"data": "user.id"},
        {"data": "user.phone"},
        {"data": "points"},
        {"data": "time"},
        {"data": "reason"},
        {"data": "status"},
        {"data": ""}
    ];
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

    /**
     * 初始化表格
     * $vipCreditTable 积分表格
     */
    $vipCreditTable = $("#vipCreditTable");
    datatable = $vipCreditTable.DataTable({
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
        columns: column,
        pagingType: "full_numbers",
        dom: 'rtlp',
        serverSide: true,
        ajax: {
            url: '/_admin/s/user_profit_details',
            type: 'GET',
            data: function(d) {
                delete d.columns;
                delete d.order;
                d.limit = d.length;
                delete d.length;
                d.search.time = moment($filterDate.val()).format('x');
                d.search.keyword = $("#inputKeyword").val();
                d.keyword = $("#inputKeyword").val();
            },
            dataSrc: function(json) {
                for(var i=0; i<json.data.length; i++) {
                    json.data[i]['time'] = moment(json.data[i]['time']).format('YYYY-MM-DD HH:mm:ss');
                }
                return json.data;
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
        drawCallback: function(settings, json) {
            bindBtnEvent();
        }
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload(function ( json ) {
            bindBtnEvent();
        });
    });

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY-MM-DD'
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
            location.href = "EditVipCredit.html?id=" + id;
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
