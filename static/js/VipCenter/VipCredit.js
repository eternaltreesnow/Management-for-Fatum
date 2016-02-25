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

    var ids = [4, 42];
    initialMenuTreeByIds(ids);

    if (!initalModulePage(42)) {
        return;
    }

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

    var column = [{
        "data": "id"
    }, {
        "data": "user.id"
    }, {
        "data": "user.phone"
    }, {
        "data": "points"
    }, {
        "data": "time"
    }, {
        "data": "profitreason"
    }, {
        "data": "status"
    }];
    var tempdata = [{
        "id": "1",
        "user": {
            "id": "1111",
            "phone": "13300000000"
        },
        "points": "11",
        "time": "2015/12/15 15:30",
        "reason": "因为完成xx任务获得积分",
        "status": "1"
    }];

    $.ajax({
        url: "../../lib/ProfitReason.json",
        type: "GET",
        success: function(data) {
            initDatatable(data);
        },
        error: function(data) {
            console.log(data);
        }
    })

    /**
     * 初始化表格
     * $vipCreditTable 积分表格
     */
    function initDatatable(reasonData) {
        $vipCreditTable = $("#vipCreditTable");
        datatable = $vipCreditTable.DataTable({
            processing: true,
            language: {
                "search": "内容搜索: ",
                "searchPlaceholder": "ID/手机号/...",
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
                    for (var i = 0; i < json.data.length; i++) {
                        json.data[i]['time'] = moment(json.data[i]['time']).format('YYYY-MM-DD HH:mm:ss');
                        for (var j = 0; j < reasonData.length; j++) {
                            if (json.data[i]['reason'] == reasonData[j]['code']) {
                                json.data[i]['profitreason'] = reasonData[j]['name'];
                            }
                        }
                    }
                    return json.data;
                }
            },
            sortClasses: false
        });
    }

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload();
    });

    $datetimepicker = $("#datetimepicker");
    $datetimepicker.datetimepicker({
        sideBySide: true,
        format: 'YYYY-MM-DD'
    });

});
