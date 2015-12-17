$(function() {
    var datatable, ajaxData;
    var $articleTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent, $previewRefresh;
    var $searchBtn, $clearBtn;
    var $selectType, $selectStatus, $inputKeyword;

    $selectType = $("#selectType");
    $selectStatus = $("#selectStatus");
    $inputKeyword = $("#inputKeyword");

    var column = [
        {"data": "id"},
        {"data": "articleClassId"},
        {"data": "title"},
        {"data": "thumbnails"},
        {"data": "source"},
        {"data": "status"},
        {"data": "domain"},
        {"data": ""}
    ];
    var tempdata = [
        {
            "id" : "1",
            "articleClassId" : "1",
            "title" : "文章1",
            "source" : "文章来源1",
            "status" : "1",
            "domain" : 'article1.html'
        }
    ];

    /**
     * 初始化表格
     * $articleTable 文章表格
     */
    $articleTable = $("#articleTable");
    datatable = $articleTable.DataTable({
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
            url: '/_admin/s/task/articles',
            type: 'GET',
            data: function(d) {
                delete d.columns;
                delete d.order;
                d.limit = d.length;
                delete d.length;
                d.search.type = $selectType.val();
                d.search.status = $selectStatus.val();
                d.search.value = $inputKeyword.val();
                d.keyword = $inputKeyword.val();
            },
            dataSrc: function(json) {
                ajaxData = json;
                resetData(json);
                return json.data;
            }
        },
        columns: column,
        sortClasses: false,
        columnDefs: [{
            "targets" : -1,
            "data" : null,
            "defaultContent" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                               '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                               '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        }],
        initComplete: function(settings, json) {
            bindBtnEvent();
        }
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload(function ( json ) {
            bindBtnEvent();
        });
    });

    $clearBtn = $("#clearBtn");
    $clearBtn.on('click', function() {
        $selectType.find('option[value=0]').attr('selected', true);
        $selectStatus.find('option[value=0]').attr('selected', true);
        $inputKeyword.val('');
    });

    function resetData(json) {
        for(var i = 0; i<json.data.length; i++) {
            json.data[i]['thumbnails'] = '<a href="javascript:void(0);" data-link="thumbnails"><img src="' + json.data[i]['thumbnails'] + '"></img></a>';
            json.data[i]['domain'] = '<a href="' + json.data[i]['domain'] + '">' + json.data[i]['domain'] + '</a>';
            if(json.data[i]['status'] == 1) {
                json.data[i]['status'] = '上线';
            } else {
                json.data[i]['status'] = '下线';
            }
        }
    }

    function bindBtnEvent() {
        // Preview Btn
        $linkPreview = $('[data-link="preview"]');
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
            getPreviewContent(ajaxData, id);
        });
        /**
         * "预览"模态框"刷新"按钮功能实现
         */
        $previewRefresh.on('click', function() {
            getPreviewContent(ajaxData, $previewId.val());
        });

        /**
         * 行内"修改"按钮功能实现
         */
        $linkModify = $('[data-link="modify"]');
        $linkModify.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            location.href = "EditArticle.html?id=" + id;
        });

        $linkDelete = $('[data-link="delete"]');
        $linkDelete.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            if(confirm("确定要删除该文章？")) {
                deleteArticlebyId(id);
            }
        });

        $linkThumbnails = $('[data-link="thumbnails"]');
        $thumbnailsModal = $("#thumbnailsModal");
        $thumbnailsContent = $("#thumbnailsContent");
        $linkThumbnails.on('click', function() {
            $thumbnailsContent.html('<div style="text-align:center;"><img src="' + $(this).children().attr('src') + '"></img></div>');
            $thumbnailsModal.modal('show');
        });
    }

    /**
     * [getPreviewContent 请求获取文章html内容]
     * @param  {Object} ajaxData ajax获取的表格数据
     * @param {number} id 文章id
     */
    function getPreviewContent(ajaxData, id) {
        for(var i = 0; i < ajaxData.data.length; i++) {
            if(ajaxData.data[i].id == id) {
                $previewContent.html('').html(ajaxData.data[i].content);
                return;
            }
        }
        $previewContent.html("无预览数据...");
    }

    /**
     * [deleteArticlebyId 通过id删除文章]
     * @param  {String} id [文章id]
     * @return {success} 刷新当前页面
     * @return {error} 提示删除失败信息
     */
    function deleteArticlebyId(id) {
        $.ajax({
            type: "DELETE",
            url: "/_admin/s/task/articles/" + id,
            success: function(data) {
                if(data.code == 200) {
                    alert("删除成功!");
                    datatable.ajax.reload(function ( json ) {
                        bindBtnEvent();
                    });
                } else {
                    console.log(data.error);
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
});
