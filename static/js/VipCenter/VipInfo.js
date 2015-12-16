$(function() {
    var datatable, ajaxData;
    var $vipInfoTable;
    var $searchBtn;

    var column = [
        {"data": "id"},
        {"data": "avatarUrl"},
        {"data": "nickname"},
        {"data": "phone"},
        {"data": "email"},
        {"data": "wechat"},
        {"data": "qq"},
        {"data": "gender"},
        {"data": "alipay"},
        {"data": "province" + "city"},
        {"data": "inviteCode"},
        {"data": "status"}
    ];
    var tempdata = [
        {
            "id" : "1",
            "nickname" : "nickname",
            "phone" : "13300000000",
            "email" : "xxxxx@xx.com",
            "avatarUrl" : "avatarUrl",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "gender" : "1",
            "alipay" : "13300000000",
            "province" : "1",
            "city" : "1",
            "inviteCode" : "sdlk123vxcjh8lasdfj12",
            "status" : "1"
        }
    ];

    /**
     * 初始化表格
     * $vipInfoTable 基本信息表格
     */
    $vipInfoTable = $("#vipInfoTable");
    datatable = $vipInfoTable.DataTable({
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
        pagingType: "full_numbers",
        dom: 'rtlp',
        serverSide: true,
        ajax: {
            url: '/_admin/s/users',
            type: 'GET',
            data: function(d) {
                delete d.columns;   // delete request parameters columns
                delete d.order;     // delete request parameters order
                d.limit = d.length; // reset length as limit
                delete d.length;
                d.keyword = $("#searchInput").val();
                d.search.value = $("#searchInput").val();
            }
        },
        sortClasses: false,
        columns: column
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload();
    });
});
