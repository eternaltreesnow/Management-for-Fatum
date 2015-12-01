$(function() {
    var $articleTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent, $previewRefresh;
    var $filterSearchBtn, $filterClearBtn;
    var $selectType, $selectStatus;

    var tempcolumn = [
        {"data": "No"},
        {"data": "type"},
        {"data": "name"},
        {"data": "status"},
        {"data": "edit"},
        {"data": "domain"}
    ];
    var tempdata = [
        {
            "No" : "1",
            "type" : "生活",
            "name" : "文章1",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article1.html">article1.html</a>'
        },
        {
            "No" : "2",
            "type" : "生活",
            "name" : "文章2",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article2.html">article2.html</a>'
        },
        {
            "No" : "3",
            "type" : "生活",
            "name" : "文章3",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article3.html">article3.html</a>'
        },
        {
            "No" : "4",
            "type" : "生活",
            "name" : "文章4",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article4.html">article4.html</a>'
        },
        {
            "No" : "5",
            "type" : "生活",
            "name" : "文章5",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article5.html">article5.html</a>'
        },
        {
            "No" : "6",
            "type" : "生活",
            "name" : "文章6",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article6.html">article6.html</a>'
        },
        {
            "No" : "7",
            "type" : "生活",
            "name" : "文章7",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article7.html">article7.html</a>'
        },
        {
            "No" : "8",
            "type" : "生活",
            "name" : "文章8",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article8.html">article8.html</a>'
        },
        {
            "No" : "9",
            "type" : "生活",
            "name" : "文章9",
            "status" : "上线",
            "edit" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                     '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                     '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>',
             "domain" : '<a href="/article9.html">article9.html</a>'
        }
    ];

    /**
     * 初始化表格
     * $articleTable 文章表格
     */
    $articleTable = $("#articleTable");
    $articleTable.DataTable({
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
    $("div#articleTable_filter").append('<b class="table-title pull-left">文章列表</b>');
    $("div#articleTable_filter").append('<a href="AddArticle.html"  class="btn btn-default btn-sm">' +
                                                  '<span class="glyphicon glyphicon-plus"></span>' +
                                                  '&nbsp;添加文章' +
                                              '</a>');

    $selectType = $("#selectType");
    $selectStatus = $("#selectStatus");

    $filterSearchBtn = $("#filterSearchBtn");
    $filterSearchBtn.on('click', function() {
        var requestData = {
            type: $selectType.find('option:selected').val(),
            status: $selectStatus.find('option:selected').val()
        };
        $.ajax({
            async: true,
            type: "GET",
            url: "searchArticleByTypeStatus", //补充搜索api
            data: requestData,
            dataType: "json",
            success: function(data) {
                // 获取搜索结果
            },
            error: function(data) {

            }
        });
    });

    $filterClearBtn = $("#filterClearBtn");
    $filterClearBtn.on('click', function() {
        $selectType.find('option[value=1]').attr('selected', true);
        $selectStatus.find('option[value=1]').attr('selected', true);
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
     * [getPreviewContent 请求获取文章html内容]
     * @param  {[json]} requestData [文章id]
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
        location.href = "EditArticle.html?id=" + id;
    });

    $linkDelete.on('click', function() {
        var $this = $(this);
        var id = $this.parents("tr").children(":first").html();
        if(confirm("确定要删除该文章？")) {
            deleteArticlebyId(id);
        }
    });
    /**
     * [deleteArticlebyId 通过id删除文章]
     * @param  {String} id [文章id]
     * @return {success} 刷新当前页面
     * @return {error} 提示删除失败信息
     */
    function deleteArticlebyId(id) {
        var requestData = {
            "id" : id
        };
        $.ajax({
            async: true,
            type: "POST",
            url: "", //补充删除文章api
            data: requestData,
            dataType: "json",
            success: function(data) {
                location.href = "ArticleManage.html";
            },
            error: function(data) {
                alert("删除失败，请重试...");
            }
        });
    }
});
