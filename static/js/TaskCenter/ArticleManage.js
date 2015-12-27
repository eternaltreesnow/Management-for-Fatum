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

    var datatable, ajaxData;
    var $articleTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent;
    var $searchBtn, $clearBtn;
    var $selectType, $selectStatus, $inputKeyword;
    var $linkThumbnails, $thumbnailsModal, $thumbnailsContent;

    $selectType = $("#selectType");
    $selectStatus = $("#selectStatus");
    $inputKeyword = $("#inputKeyword");

    var column = [
        {"data": "id"},
        {"data": "type"},
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

    Papa.parse('../../lib/article_type.csv', {
        download: true,
        header: true,
        complete: function(result) {
            initDataTable(result);
            var options = '';
            result.data.map(function(item) {
                options += '<option value="' + item['id'] + '">' + item['article_class_name'] + '</option>';
            });
            $selectType.append(options);
        }
    });

    /**
     * 初始化表格
     * $articleTable 文章表格
     */
    function initDataTable(article_type) {
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
                    resetData(json, article_type);
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
            drawCallback: function(settings, json) {
                bindBtnEvent();
            }
        });
    }

    $searchBtn = $("#searchBtn");
    $searchBtn.on('click', function() {
        datatable.ajax.reload(function ( json ) {
            bindBtnEvent();
        });
    });

    $clearBtn = $("#clearBtn");
    $clearBtn.on('click', function() {
        $selectType.find('option[value=" "]').attr('selected', true);
        $selectStatus.find('option[value=" "]').attr('selected', true);
        $inputKeyword.val('');
    });

    // $previewSize = $("#previewSize");
    // $previewSize.on('change', function() {
    //     if($previewSize.val() == 1) {
    //         $("#previewContent").css({
    //             width: '391px',
    //             height: '683px'
    //         });
    //     } else if($previewSize.val() == 2) {
    //         $("#previewContent").css({
    //             width: '430px',
    //             height: '752px'
    //         });
    //     }
    // });

    function resetData(json, article_type) {
        for(var i = 0; i<json.data.length; i++) {
            json.data[i]['type'] = article_type.data[json.data[i]['articleClassId']]['article_class_name'];
            json.data[i]['thumbnails'] = '<a href="javascript:void(0);" data-link="thumbnails"><img src="' + json.data[i]['thumbnails'] + '"></img></a>';
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
        /**
         * 行内"预览"按钮功能实现
         */
        $linkPreview.on('click', function() {
            var $this = $(this);
            var articleId = $this.parents("tr").children(":first").html();
            var scheduleId;
            $.ajax({
                url: '/_admin/s/task/articles/' + articleId,
                type: 'GET',
                success: function(data) {
                    if(data.code == 200) {
                        scheduleId = data.data.info.id;
                        $previewId.val(scheduleId);
                        $previewContent.attr('src', '/public/share/task.html?id=' + scheduleId);
                        $previewModal.modal('show');
                    } else {
                        console.log(data.error);
                    }
                },
                error: function(data) {
                    console.log(data);
                }
            });
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
            $thumbnailsContent.html('<div style="text-align:center;"><img class="thumbnailsImage" src="' + $(this).children().attr('src') + '"></img></div>');
            $(".thumbnailsImage").css("max-width", '558px');
            $thumbnailsModal.modal('show');
        });
        $thumbnailsModal.on('shown.bs.modal', function() {
            if($thumbnailsContent.width() > 558) {
                $(".thumbnailsImage").css("max-width", $thumbnailsContent.width() + 'px');
            }
        });
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
