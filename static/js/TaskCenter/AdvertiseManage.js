$(function() {
    var $advertisementTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent, $previewRefresh;

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
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "2",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "3",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "4",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "5",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "6",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "7",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "8",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "9",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "10",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        },
        {
            "No" : "11",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
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
    $("div#advertisementTable_filter").append('<a href="AddAdvertise.html"  class="btn btn-default btn-sm">' +
                                                  '<span class="glyphicon glyphicon-plus"></span>' +
                                                  '&nbsp;添加广告' +
                                              '</a>');

    $linkPreview = $('[data-link="preview"]');
    $linkModify = $('[data-link="modify"]');
    $linkDelete = $('[data-link="delete"]');

    $previewModal = $("#previewModal");
    $previewContent = $("#previewContent");
    $previewId = $("#previewId");
    $previewRefresh = $("#previewRefresh");

    $linkPreview.on('click', function() {
        var $this = $(this);
        $previewContent.html("数据加载中...");
        $previewModal.modal('show');
        var id = $this.parents("tr").children(":first").html();
        $previewId.val(id);
        var requestData = {
            "id" : id
        };
        getPreviewContent(requestData);
    });

    $previewRefresh.on('click', function() {
        var requestData = {
            "id" : $previewId.val()
        };
        getPreviewContent(requestData);
    });

    /**
     * [getPreviewContent 请求获取广告html内容]
     * @param  {[json]} requestData [广告id]
     * @return {success} 加载内容到modal中的previewContent
     * @return {error} 加载请求失败提示到previewContent
     */
    function getPreviewContent(requestData) {
        $.ajax({
            async: true,
            type: "GET",
            url: "", //补充返回html内容api
            data: requestData,
            dataType: "json",
            success: function(data) {
                $previewContent.html(data.content);
            },
            error: function(data) {
                $previewContent.html("数据加载失败, 请刷新重试...");
            }
        });
    }

    $linkModify.on('click', function() {
        var $this = $(this);
        var id = $this.parents("tr").children(":first").html();
        location.href = "EditAdvertise.html?id=" + id;
    });

    $linkDelete.on('click', function() {
        var $this = $(this);
        var id = $this.parents("tr").children(":first").html();
        if(confirm("确定要删除该广告？")) {
            deleteAdvertisebyId(id);
        }
    });
    /**
     * [deleteAdvertisebyId 通过id删除广告]
     * @param  {String} id [广告id]
     * @return {success} 刷新当前页面
     * @return {error} 提示删除失败信息
     */
    function deleteAdvertisebyId(id) {
        var requestData = {
            "id" : id
        };
        $.ajax({
            async: true,
            type: "POST",
            url: "", //补充删除广告api
            data: requestData,
            dataType: "json",
            success: function(data) {
                location.href = "AdvertiseManage.html";
            },
            error: function(data) {
                alert("删除失败，请重试...");
            }
        });
    }
});
