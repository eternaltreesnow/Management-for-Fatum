$(function() {
    var datatable, ajaxData;
    var $vipInfoTable;
    var $searchBtn;

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

    var column = [
        {"data": "id"},
        {"data": "img"},
        {"data": "nickname"},
        {"data": "phone"},
        {"data": "email"},
        {"data": "wechat"},
        {"data": "qq"},
        {"data": "gender"},
        {"data": "alipay"},
        {"data": "area"},
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
    Papa.parse('../../lib/sqlResult_352424.csv', {
        download: true,
        header: true,
        complete: function(result) {
            initDataTable(result);
        }
    });

    function initDataTable(result) {
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
                },
                dataSrc: function(json) {
                    json = resetData(json, result.data);
                    return json.data;
                }
            },
            sortClasses: false,
            columns: column
        });
    }


    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload();
    });

    function resetData(json, areaData) {
        for(var i=0; i<json.data.length; i++) {
            json.data[i]['img'] = '<img src="' + json.data[i]['avatarUrl'] + '" height="50"></img>';
            json.data[i]['area'] = setArea(areaData, json.data[i]['city']);
            if(json.data[i]['status'] == 1) {
                json.data[i]['status'] = '正常';
            } else {
                json.data[i]['status'] = '封号';
            }
        }
        return json;
    }

    function setArea(data, id) {
        var area = '';
        for(var i=0; i<data.length; i++) {
            if(id == data[i]['city_id']) {
                area = data[i]['province_name'] + '-' + data[i]['city_name'];
            }
        }
        return area;
    }
});
