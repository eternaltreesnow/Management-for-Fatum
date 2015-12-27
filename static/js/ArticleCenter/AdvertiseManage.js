$(function() {
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

    // 变量声明
    var datatable, ajaxData;
    var $advertisementTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent;
    var $searchBtn;

    /**
     * [tempcolumn 列数据格式]
     * @type {Array}
     */
    var column = [
        {"data": "id"},
        {"data": "type"},
        {"data": "name"},
        {"data": "alias"},
        {"data": "status"},
        {"data": ""}
    ];
    /**
     * [tempdata 行数据格式]
     * @type {Array}
     */
    var tempdata = [
        {
            "id" : "1",
            "type" : "1",
            "name" : "广告1",
            "alias" : "ad1",
            "advertiser" : "d",
            "status" : "1",
            "image" : "imagesrc"
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
        columns: column,
        pagingType: "full_numbers",
        dom: 'rtlp',
        serverSide: true,
        ajax: {
            url: '/_admin/s/article/advertises',
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
                ajaxData = json;
                resetData(json);
                return json.data;
            }
        },
        sortClasses: false,
        columnDefs: [ {
          "targets" : -1,
          "data" : null,
          "defaultContent" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
                             '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                             '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        } ],
        drawCallback: function(settings, json) {
            bindBtnEvent();
        }
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload( function ( json ) {
            bindBtnEvent();
        });
    });

    function bindBtnEvent() {
        // Preview Btn
        $linkPreview = $('[data-link="preview"]');
        $previewModal = $("#previewModal");
        $previewContent = $("#previewContent");
        $previewId = $("#previewId");
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
         * 行内"修改"按钮功能实现
         */
        $linkModify = $('[data-link="modify"]');
        $linkModify.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            location.href = "EditAdvertise.html?id=" + id;
        });

        /**
         * 行内"删除"按钮功能实现
         */
        $linkDelete = $('[data-link="delete"]');
        $linkDelete.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            if(confirm("确定要删除该广告？")) {
                deleteAdvertisebyId(id);
            }
        });
    }

    function resetData(json) {
        for(var i=0; i<json.data.length; i++) {
            if(json.data[i]['status'] == 1) {
                json.data[i]['status'] = '上线';
            } else {
                json.data[i]['status'] = '下线';
            }
        }
    }

    /**
     * [getPreviewContent 请求获取广告html内容]
     * @param  {Object} ajaxData ajax获取的表格数据
     * @param {number} id 广告id
     */
    function getPreviewContent(ajaxData, id) {
        for(var i = 0; i < ajaxData.data.length; i++) {
            if(ajaxData.data[i].id == id) {
                var img = '<div style="text-align:center;"><img src="' + ajaxData.data[i].image + '"></img></div>';
                $previewContent.html('').html(img);
                return;
            }
        }
        $previewContent.html("无预览数据...");
    }

    /**
     * [deleteAdvertisebyId 通过id删除广告]
     * @param  {String} id [广告id]
     * @return {success} 刷新当前页面
     * @return {error} 提示删除失败信息
     */
    function deleteAdvertisebyId(id) {
        $.ajax({
            type: "DELETE",
            url: "/_admin/s/article/advertises/" + id,
            success: function(data) {
                if(data.code == 200) {
                    alert("删除成功!");
                    datatable.ajax.reload( function ( json ) {
                        bindBtnEvent();
                    });
                } else {
                    console.log(data.error);
                }
            },
            error: function(data) {
                alert("删除失败，请重试...");
            }
        });
    }
});
