$(function() {
    var $vipInfoTable;

    var tempcolumn = [
        {"data": "id"},
        {"data": "phone"},
        {"data": "wechat"},
        {"data": "qq"},
        {"data": "nickname"},
        {"data": "gender"},
        {"data": "area"},
        {"data": "alipay"},
        {"data": "invitation"},
        {"data": "mail"}
    ];
    var tempdata = [
        {
            "id" : "1",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "2",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "3",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "4",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "5",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "6",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "7",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "8",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "9",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "10",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
        {
            "id" : "11",
            "phone" : "13300000000",
            "wechat" : "13300000000",
            "qq" : "555555555",
            "nickname" : "nickname",
            "area" : "华南地区",
            "gender" : "男",
            "alipay" : "13300000000",
            "invitation" : "sdlk123vxcjh8lasdfj12",
            "mail" : "xxxxx@xx.com"
        },
    ];

    /**
     * 初始化表格
     * $vipInfoTable 基本信息表格
     */
    $vipInfoTable = $("#vipInfoTable");
    $vipInfoTable.DataTable({
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
    $("div#articleTable_filter").append('<b class="table-title pull-left">基本信息列表</b>');

});
