$(function() {
    $("#userName").text(localStorage['user']);
    $("#logoutBtn").on('click', function() {
        $.ajax({
            url: "/_admin/s/logout",
            type: 'GET',
            success: function(data) {
                if (data.code == 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('moduleIds');
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

    var ids = [2, 22];
    initialMenuTreeByIds(ids);

    if (!initalModulePage(22)) {
        return;
    }

    var datatable, ajaxData;
    var $articleTable;
    var $linkPreview, $linkModify, $linkDelete;
    var $previewModal, $previewId, $previewContent;
    var $searchBtn, $clearBtn;
    var $selectType, $selectStatus, $inputKeyword;
    var $linkThumbnails, $thumbnailsModal, $thumbnailsContent;
    var deleteIds = new Array();

    var $successModal, $errorModal, $errorMsg;

    var $permissionModal;
    $permissionModal = $("#permissionModal");

    $successModal = $("#successModal");
    $errorModal = $("#errorModal");
    $errorMsg = $("#errorMsg");

    $selectType = $("#selectType");
    $selectStatus = $("#selectStatus");
    $inputKeyword = $("#inputKeyword");

    var column = [{
        "data": "check"
    }, {
        "data": "id"
    }, {
        "data": "type"
    }, {
        "data": "title"
    }, {
        "data": "thumbnails"
    }, {
        "data": "source"
    }, {
        "data": "status"
    }, {
        "data": "domain"
    }, {
        "data": ""
    }];

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
            ordering: false,
            processing: true,
            language: {
                "search": "内容搜索: ",
                "searchPlaceholder": "输入搜索条件",
                "processing": "数据加载中, 请稍后...",
                "zeroRecords": "记录数为0...",
                "emptyTable": "记录数为0...",
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
                "targets": -1,
                "data": null,
                "defaultContent": '<a href="javascript:void(0);" class="btn btn-primary btn-xs" data-link="preview">预览</a>' +
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
        datatable.ajax.reload(function(json) {
            bindBtnEvent();
        });
    });

    $clearBtn = $("#clearBtn");
    $clearBtn.on('click', function() {
        $selectType.find('option[value=" "]').attr('selected', true);
        $selectStatus.find('option[value=" "]').attr('selected', true);
        $inputKeyword.val('');
    });

    function resetData(json, article_type) {
        for (var i = 0; i < json.data.length; i++) {
            json.data[i]['type'] = article_type.data[json.data[i]['articleClassId']]['article_class_name'];
            json.data[i]['thumbnails'] = '<a href="javascript:void(0);" data-link="thumbnails"><img src="' + json.data[i]['thumbnails'] + '"></img></a>';
            json.data[i]['check'] = '<input type="checkbox" name="checklist" value="' + json.data[i]['id'] + '" />';
            if (json.data[i]['status'] == 1) {
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
            var articleId = $($this.parents("tr").children()[1]).html();
            var scheduleId;
            $.ajax({
                url: '/_admin/s/task/articles/' + articleId,
                type: 'GET',
                success: function(data) {
                    if (data.code == 200) {
                        scheduleId = data.data.info.id;
                        $previewId.val(scheduleId);
                        $previewContent.attr('src', '/public/share/task.html?id=' + scheduleId);
                        $previewModal.modal('show');
                    } else if (data.code == 403) {
                        $permissionModal.modal('show');
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
            var id = $($this.parents("tr").children()[1]).html();
            location.href = "EditArticle.html?id=" + id;
        });

        $linkDelete = $('[data-link="delete"]');
        $linkDelete.on('click', function() {
            var $this = $(this);
            var id = $($this.parents("tr").children()[1]).html();
            if (confirm("确定要删除该文章？")) {
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
            if ($thumbnailsContent.width() > 558) {
                $(".thumbnailsImage").css("max-width", $thumbnailsContent.width() + 'px');
            }
        });

        /**
         * 全选
         */
        $checkAll = $("#checkAll");
        $checkAll.on('click', function() {
            if ($(this)[0].checked) {
                $('input[name="checklist"]').prop('checked', true);
            } else {
                $('input[name="checklist"]').prop('checked', false);
            }
        });

        /**
         * 绑定checkbox外层点击事件
         */
        $checklist = $('input[name="checklist"]');
        $checklist.each(function() {
            $this = $(this);
            $this.parent().css('cursor', 'pointer');
            $this.parent().unbind().on('click', function(event) {
                var $target = $(event.target);
                if ($target.is('td')) {
                    if ($(this).children()[0].checked) {
                        $(this).children().prop('checked', false);
                    } else {
                        $(this).children().prop('checked', true);
                    }
                }
            });
        });

        /**
         * 批量删除
         */
        $deleteContent = $("#deleteContent");
        $deleteModal = $("#deleteModal");
        $deleteListBtn = $("#deleteListBtn");
        $deleteListBtn.on('click', function() {
            deleteIds = new Array();
            $('input[name="checklist"]:checked').each(function() {
                deleteIds.push($(this).val());
            });
            var idStr = deleteIds.join();
            $deleteContent.text("确认删除id为" + idStr + "的文章?");
            $deleteModal.modal('show');
        });
        $deleteCommitBtn = $("#deleteCommitBtn");
        $deleteCommitBtn.on('click', function() {
            $deleteModal.modal('hide');
            $.ajax({
                url: "/_admin/s/task/articles/delete",
                type: "POST",
                data: {
                    ids: deleteIds
                },
                success: function(data) {
                    if (data.code == 200) {
                        $successModal.modal('show');
                        datatable.ajax.reload(function(json) {
                            bindBtnEvent();
                        });
                    } else if (data.code == 400) {
                        $errorMsg.text("请选择要删除的文章");
                        $errorModal.modal('show');
                    } else if (data.code == 403) {
                        $permissionModal.modal('show');
                    } else {
                        $errorMsg.text(data.error);
                        $errorModal.modal('show');
                    }
                },
                error: function(data) {
                    console.log(data);
                }
            });
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
                if (data.code == 200) {
                    alert("删除成功!");
                    datatable.ajax.reload(function(json) {
                        bindBtnEvent();
                    });
                } else if (data.code == 403) {
                    $permissionModal.modal('show');
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
