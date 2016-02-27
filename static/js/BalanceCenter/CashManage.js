$(function() {
    $("#userName").text(localStorage['user']);
    $("#logoutBtn").on('click', function() {
        $.ajax({
            url: "/_admin/s/logout",
            type: 'GET',
            success: function(data) {
                if (data.code == 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('moduleIds');
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

    var ids = [5, 51];
    initialMenuTreeByIds(ids);

    if (!initalModulePage(51)) {
        return;
    }

    var datatable;
    var $cashTable;
    var $linkCheck, $linkPass, $linkModify;
    var $checkId, $passId;
    var $datetimepicker;
    var $checkModal, $passModal;
    var $checkModalBtn, $uncheckModalBtn, $passModalBtn, $returnModalBtn;
    var $checkContent, $passContent;
    var $filterDate;

    $filterDate = $("#filterDate");
    $checkId = $("#checkId");
    $checkModal = $("#checkModal");
    $passId = $("#passId");
    $passModal = $("#passModal");
    $checkContent = $("#checkContent");
    $passContent = $("#passContent");

    var column = [{
        "data": "id"
    }, {
        "data": "user.id"
    }, {
        "data": "user.phone"
    }, {
        "data": "user.alipay"
    }, {
        "data": "cash"
    }, {
        "data": "time"
    }, {
        "data": "permitted"
    }, {
        "data": "withdraw"
    }, {
        "data": "edit"
    }];

    /**
     * 初始化表格
     * $cashTable 广告表格
     */
    $cashTable = $("#cashTable");
    datatable = $cashTable.DataTable({
        processing: true,
        language: {
            "search": "内容搜索: ",
            "searchPlaceholder": "输入搜索条件",
            "processing": "数据加载中, 请稍后...",
            "zeroRecords": "记录数为0...",
            "emptyTable": "记录数为0...",
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
                d.search.time = moment($filterDate.val()).format('x');
                d.search.keyword = $("#searchInput").val();
                d.keyword = $("#searchInput").val();
            },
            dataSrc: function(json) {
                for (var i = 0; i < json.data.length; i++) {
                    json.data[i]['time'] = moment(json.data[i]['time']).format('YYYY-MM-DD HH:mm:ss');
                    if(json.data[i]['isPermitted'] == -1) {
                        json.data[i]['permitted'] = "已驳回";
                        json.data[i]['withdraw'] = "";
                        json.data[i]['edit'] = '';
                    } else if (json.data[i]['isPermitted'] == 1) {
                        json.data[i]['permitted'] = "通过审核";
                        if (json.data[i]['isWithdraw'] == 1) {
                            json.data[i]['withdraw'] = "已提现";
                            json.data[i]['edit'] = '';
                        } else {
                            json.data[i]['withdraw'] = "未提现";
                            json.data[i]['edit'] = '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="pass">提现</a>';
                        }
                    } else {
                        json.data[i]['permitted'] = "未审核";
                        json.data[i]['withdraw'] = "未提现";
                        json.data[i]['edit'] = '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="check">审核</a>'
                    }
                }
                return json.data;
            }
        },
        sortClasses: false,
        drawCallback: function(settings, json) {
            bindBtnEvent();
        }
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload(function(json) {
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
            $checkContent.text("是否审核该提现信息？");
            $checkModalBtn.show();
            $uncheckModalBtn.show();
            $returnModalBtn.hide();
            $checkModal.modal('show');
        });

        $linkPass.on('click', function() {
            var $this = $(this);
            $passId.val($this.parents("tr").children(":first").html());
            $passContent.text("是否确认该提现信息？");
            $passModalBtn.show();
            $passModal.modal('show');
        });

        $linkModify.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            location.href = "EditCash.html?id=" + id;
        });
    }
    $returnModalBtn = $("#returnModalBtn");
    $checkModalBtn = $("#checkModalBtn");
    $uncheckModalBtn = $("#uncheckModalBtn");
    $checkModalBtn.on('click', function() {
        var requestData = {
            "isPermitted": 1
        };
        $.ajax({
            type: "POST",
            url: "/_admin/s/user_withdraw/" + $checkId.val(),
            data: requestData,
            success: function(data) {
                if (data.code == 200) {
                    $checkContent.text("审核成功！");
                    datatable.ajax.reload(function(json) {
                        bindBtnEvent();
                    });
                } else if (data.code == 403) {
                    $permissionModal.modal('show');
                } else {
                    $checkContent.text(data.error);
                }
                $checkModalBtn.hide();
                $uncheckModalBtn.hide();
                $returnModalBtn.show();
            },
            error: function(data) {
                console.log(data);
            }
        });
    });
    $uncheckModalBtn.on('click', function() {
        var requestData = {
            "isPermitted": -1
        };
        $.ajax({
            type: "POST",
            url: "/_admin/s/user_withdraw/" + $checkId.val(),
            data: requestData,
            success: function(data) {
                if (data.code == 200) {
                    $checkContent.text("驳回成功！");
                    datatable.ajax.reload(function(json) {
                        bindBtnEvent();
                    });
                } else if (data.code == 403) {
                    $permissionModal.modal('show');
                } else {
                    $checkContent.text(data.error);
                }
                $checkModalBtn.hide();
                $uncheckModalBtn.hide();
                $returnModalBtn.show();
            },
            error: function(data) {
                console.log(data);
            }
        });
    });
    $passModalBtn = $("#passModalBtn");
    $passModalBtn.on('click', function() {
        var requestData = {
            "isWithdraw": 1
        };
        $.ajax({
            type: "POST",
            url: "/_admin/s/user_withdraw/" + $passId.val(),
            data: requestData,
            success: function(data) {
                if (data.code == 200) {
                    $passContent.text("提现修改成功！");
                    datatable.ajax.reload(function(json) {
                        bindBtnEvent();
                    });
                } else if (data.code == 403) {
                    $permissionModal.modal('show');
                } else {
                    $passContent.text(data.error);
                }
                $passModalBtn.hide();
            },
            error: function(data) {
                console.log(data);
            }
        });
    });
});
