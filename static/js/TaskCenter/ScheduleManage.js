$(function() {
    var datatable, ajaxData;
    var $scheduleTable;
    var $linkDetails, $linkModify, $linkDelete;
    var $searchBtn;

    var column = [
        {"data" : "id"},            // 排期Id
        {"data" : "articleId"},     // 文章编号
        {"data" : "advertiseId"},   // 广告编号
        {"data" : "status"},        // 任务状态
        {"data" : "price"},         // 单价
        {"data" : "frequency"},     // 次数上限
        {"data" : "usedPoint"},     // 已用点数
        {"data" : "leftPoint"},     // 剩余点数
        {"data" : "area"},          // 限制地区
        {"data" : "platform"},      // 限制平台
        {"data" : "profit"},        // 收益上限/会员
        {"data" : "begintime"},     // 开始时间
        {"data" : "endtime"},       // 结束时间
        {"data": ""}            // 行内定义操作
    ];
    var tempdata = [
        {

        }
    ];

    /**
     * 初始化表格
     * $scheduleTable 排期表格
     */
    $scheduleTable = $("#scheduleTable");
    datatable = $scheduleTable.DataTable({
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
            url: '',
            type: 'GET',
            data: function(d) {
                delete d.columns;   // delete request parameters columns
                delete d.order;     // delete request parameters order
                d.limit = d.length; // reset length as limit
                delete d.length;
                d.keyword = $("#searchInput").val();
                d.search.value = $("#searchInput").val();
            }
        },
        sortClasses: false,
        columns: column,
        columnDefs: [ {
            "targets" : -1,
            "data" : null,
            "defaultContent" : '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="details">详情</a>' +
                               '<a href="javascript:void(0);" class="btn btn-success btn-xs" data-link="modify">修改</a>' +
                               '<a href="javascript:void(0);" class="btn btn-default btn-xs" data-link="delete">删除</a>'
        }],
        initComplete: function(settings, json) {
            bindBtnEvent();
            ajaxData = json;
        }
    });

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload( function ( json ) {
            bindBtnEvent();
            ajaxData = json;
        });
    });

    function bindBtnEvent() {
        // Details Btn
        $linkDetails = $('[data-link="details"]');
        $detailsModal = $("#previewModal");
        /**
         * 行内"详情"按钮功能实现
         */
        $linkDetails.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
        });

        /**
         * 行内"修改"按钮功能实现
         */
        $linkModify = $('[data-link="modify"]');
        $linkModify.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            location.href = "EditSchedule.html?id=" + id;
        });

        /**
         * 行内"删除"按钮功能实现
         */
        $linkDelete = $('[data-link="delete"]');
        $linkDelete.on('click', function() {
            var $this = $(this);
            var id = $this.parents("tr").children(":first").html();
            if(confirm("确定要删除该广告？")) {
                deleteSchedulebyId(id);
            }
        });
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
     * @return {success}
     * @return {error} 提示删除失败信息
     */
    function deleteSchedulebyId(id) {
        $.ajax({
            async: true,
            type: "DELETE",
            url: "" + id,
            success: function(data) {
                if(data.code == 200) {
                    alert("删除成功!");
                    datatable.ajax.reload( function ( json ) {
                        bindBtnEvent();
                        ajaxData = json;
                    });
                } else {
                    alert(data.error);
                }
            },
            error: function(data) {
                alert("删除失败，请重试...");
            }
        });
    }
});
