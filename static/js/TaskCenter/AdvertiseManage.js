$(function() {
    var $advertisementTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent, $previewRefresh;
    var $searchBtn;

    var column = [
        {"data": "id"},         // 广告Id
        {"data": "type"},       // 广告类型
        {"data": "name"},       // 广告名称
        {"data": "alias"},      // 广告别称
        {"data": "status"},     // 广告状态
        {"data": ""}            // 行内定义操作
    ];
    var tempdata = [
        {
            "id" : "1",
            "type" : "1",
            "name" : "广告1",
            "alias" : "ad1",
            "status" : "1"
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
        pagingType: "full_numbers",
        dom: 'rtlp',
        serverSide: true,
        ajax: {
            url: '/_admin/s/task/advertises',
            type: 'GET',
            data: function(d) {
                delete d.columns;   // delete request parameters columns
                delete d.order;     // delete request parameters order
                d.limit = d.length; // reset length as limit
                delete d.length;
            }
        },
        sortClasses: false,
        columns: column,
        columnDefs: [ {
            "targets" : -1,
            "data" : null,
            "defaultContent" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                               '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                               '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        }]
    });


    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        var keyword = $("#searchInput").val();
        $advertisementTable.DataTable({
            serverSide: true,
            ajax: {
                url: '/_admin/s/task/advertises',
                type: 'GET',
                data: function(d) {
                    d.keyword = keyword;
                    d.search.value = keyword;
                    return JSON.stringify(d);
                }
            }
        });
    });

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
     * @return {success}
     * @return {error} 提示删除失败信息
     */
    function deleteAdvertisebyId(id) {
        var requestData = {
            "id" : id
        };
        $.ajax({
            async: true,
            type: "POST",
            url: "/_admin/s/task/advertises",
            data: requestData,
            dataType: "json",
            success: function(data) {

            },
            error: function(data) {
                alert("删除失败，请重试...");
            }
        });
    }
});
