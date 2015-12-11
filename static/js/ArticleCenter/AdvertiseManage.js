$(function() {
    // 变量声明
    var datatable;
    var $advertisementTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent, $previewRefresh;
    var $searchBtn;

    /**
     * [tempcolumn 列数据格式]
     * @type {Array}
     */
    var tempcolumn = [
        {"data": "No"},
        {"data": "type"},
        {"data": "name"},
        {"data": "altername"},
        {"data": "status"},
        {"data": ""}
    ];
    /**
     * [tempdata 行数据格式]
     * @type {Array}
     */
    var tempdata = [
        {
            "No" : "1",
            "type" : "生活",
            "name" : "广告1",
            "altername" : "ad1",
            "status" : "上线"
        },
        {
            "No" : "2",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "3",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "4",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "5",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "6",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "7",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "8",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "9",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        },
        {
            "No" : "10",
            "type" : "体育",
            "name" : "广告2",
            "altername" : "ad2",
            "status" : "下线"
        }
    ];

    /**
     * 初始化表格
     * $advertisementTable 广告表格
     */
    $advertisementTable = $("#advertisementTable");
    datatable = $advertisementTable.DataTable({
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
        dom: 'rtlp',
        columnDefs: [ {
          "targets" : -1,
          "data" : null,
          "defaultContent" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                             '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                             '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        } ]
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        var keyword = $("#searchInput").val();
        datatables.ajax.reload();
    });

    $linkPreview = $('[data-link="preview"]');
    $linkModify = $('[data-link="modify"]');
    $linkDelete = $('[data-link="delete"]');

    $previewModal = $("#previewModal");
    $previewContent = $("#previewContent");
    $previewId = $("#previewId");
    $previewRefresh = $("#previewRefresh");

    /**
     * 行内"预览"按钮功能实现
     */
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

    /**
     * "预览"模态框"刷新"按钮功能实现
     */
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

    /**
     * 行内"修改"按钮功能实现
     */
    $linkModify.on('click', function() {
        var $this = $(this);
        var id = $this.parents("tr").children(":first").html();
        location.href = "EditAdvertise.html?id=" + id;
    });

    /**
     * 行内"删除"按钮功能实现
     */
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
