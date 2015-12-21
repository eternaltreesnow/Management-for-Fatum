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
    var $cheatTable, $searchBtn;

    var tempcolumn = [
        {"data": "id"},
        {"data": "user.id"},
        {"data": "user.phone"},
        {"data": "user.alipay"},
        {"data": "cash"},
        {"data": "time"},
        {"data": "reason"}
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
            "reason" : '1'
        }
    ];

    /**
     * 初始化表格
     * $cheatTable 广告表格
     */
    $cheatTable = $("#cheatTable");
    datatable = $cheatTable.DataTable({
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
        columns: tempcolumn,
        pagingType: "full_numbers",
        dom: 'rtlp',
        serverSide: true,
        ajax: {
            url: '/_admin/s/user_cheatings',
            type: 'GET',
            data: function(d) {
                delete d.columns;   // delete request parameters columns
                delete d.order;     // delete request parameters order
                d.limit = d.length; // reset length as limit
                delete d.length;
                d.keyword = $("#searchInput").val();
                d.search.value = $("#searchInput").val();
            },
            dataSrc: function(json) {
                for(var i=0; i<json.data.length; i++) {
                    json.data[i]['time'] = moment(json.data[i]['time']).format('YYYY-MM-DD HH:mm:ss');
                }
                return json.data;
            }
        },
        sortClasses: false
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload();
    });
});
