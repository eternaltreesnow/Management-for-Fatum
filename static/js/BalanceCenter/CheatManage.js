$(function() {
    var $cheatTable;

    var tempcolumn = [
        {"data": "id"},
        {"data": "phone"},
        {"data": "alipay"},
        {"data": "date"},
        {"data": "type"}
    ];
    var tempdata = [
        {
            "id" : "1",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
        {
            "id" : "2",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
        {
            "id" : "3",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
        {
            "id" : "4",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
        {
            "id" : "5",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
        {
            "id" : "6",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
        {
            "id" : "7",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
        {
            "id" : "8",
            "phone" : "13300000000",
            "alipay" : "13300000000",
            "date" : '2015/11/30 15:30',
            "type" : '类型1'
        },
    ];

    /**
     * 初始化表格
     * $cheatTable 广告表格
     */
    $cheatTable = $("#cheatTable");
    $cheatTable.DataTable({
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
    $("div#cheatTable_filter").append('<b class="table-title pull-left">作弊列表</b>');

});
