$(function() {
    var $advertisementTable;
    var $addBtn;

    var tempcolumn = [
        {"data": "No"},
        {"data": "type"},
        {"data": "name"},
        {"data": "altername"},
        {"data": "status"},
        {"data": "edit"}
    ];
    var tempdata = [
        {
            "No" : "1",
            "type" : "生活",
            "name" : "广告1",
            "altername" : "ad1",
            "status" : "上线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "2",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "3",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "4",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "5",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "6",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "7",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "8",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "9",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "10",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        },
        {
            "No" : "11",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="#" class="btn btn-primary btn-xs">预览</a>' +
                     '<a href="#" class="btn btn-success btn-xs">修改</a>' +
                     '<a href="#" class="btn btn-default btn-xs">删除</a>'
        }
    ];

    /**
     * 初始化表格
     * $advertisementTable 广告表格
     */
    $advertisementTable = $("#advertisementTable");
    $advertisementTable.DataTable({
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
        // dom: 'rtl<"ecg-table-paginate"p>'
    });
    $("div#advertisementTable_filter").append('<b class="table-title pull-left">广告列表</b>');
    $("div#advertisementTable_filter").append('<a href="AddAdvertisement.html"  class="btn btn-default btn-sm">' +
                                                  '<span class="glyphicon glyphicon-plus"></span>' +
                                                  '&nbsp;添加广告' +
                                              '</a>');

});
