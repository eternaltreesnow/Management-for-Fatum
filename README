项目结构：
-Management-for-Fatum
    -lib    [外部依赖]
        -bootstrap-3.3.5-dist    [bootstrap框架]
        -bootstrap-datetimepicker    [基于bootstrap实现的日期时间选择器]
        -bootstrap-wysiwyg[未使用]    [基于bootstrap实现的"所见即所得"富文本编辑器]
        -DataTables-1.10.8    [基于bootstrap样式的表格控件]
        -jquery-hotkeys[配合wysiwyg使用]    [基于jquery实现的热键控件]
        -jquery-ui-1.11.4    [基于jquery实现的部分ui控件]
        -scojs[未使用]    [基于bootstrap扩展的控件]
        -ueditor1_4_3_1    [百度UEditor]
        -html5shiv.min.js    [IE8下支持HTML5组件与CSS Media]
        -respond.min.js    [IE8下支持HTML5组件与CSS Media]
        -jquery-2.0.3.min.js    [jquery核心代码]
        -normalize.css    [CSS常用元素规范化]
    -pages    [html页面]
        -login.html    [登录页面]
        -index.html    [首页]
        -TaskCenter    [任务中心]
        -ArticleCenter    [文章中心]
        -VipCenter    [会员信息]
        -BalanceCenter    [结算管理]
    -static    [JS/CSS/Image]
        -(结构如pages)

页面实现说明：
-pages
    -login.html
        现状：实现用户名与密码输入为空验证，验证成功后直接跳转到index.html页面
        计划：后台登录接口实现后，加入"Remember me"作为登录参数，根据后续需求加入"验证码"
    -index.html
        现状：直接跳转至"任务中心"的"广告管理"
        计划：根据后续需求，实现各个模块的"快速导航"以及"消息提醒"
    -frame (界面整体框架)
        -上部导航栏标志"当前用户"，下拉"退出登录"
        -左侧导航栏实现目前结构，"任务中心"与"文章中心"页面与功能相同
    -TaskCenter    [任务中心]
    -AdvertiseManage.html    [广告管理]
        现状：1.搜索框根据现有表格所有信息进行匹配搜索
              2."添加广告"按钮跳转至"添加广告"页面
              3.行内操作"预览"直接弹框，并获取html格式的广告进行展示
              4.行内操作"修改"跳转至"编辑广告"页面，目前携带参数id
              5.行内操作"删除"弹框确认是否删除，删除成功后重新获取表格数据
        计划：1.搜索框根据后续需求修改成根据具体字段进行搜索，需通过后台接口实现
              2.根据后续交互需求，行内操作"删除"提示修改为界面内元素提示，取消弹框
              3.根据后续交互需求，预览是否跳转至新页面
    -ArticleManage.html    [文章管理]
        现状：1.筛选条件"分类"与"状态"，"确定搜索"按钮需配合后台接口实现
        计划：1.表格内"域名"部分是否支持直接跳转
    -AddAdvertise.html    [添加广告]
        现状：1."广告主"、"广告名称"为必填字段，进行表单提交验证
              2."广告素材"部分仅通过表单form提交
        计划：1."广告素材"部分与后台协商是否通过其他方式进行异步提交
    -EditAdvertise.html    [编辑广告]
        现状：1.通过获取信息，进行表单初始化(页面中仅为临时数据)
        计划：1.是否添加"编辑人员"信息
    -AddArticle.html    [添加文章]
        现状：1."文章来源"、"文章标题"为必填字段，进行表单提交验证
              2."编辑文章"部分通过UEditor实现，不过UEditor暂无nodejs实现的模块，因此不支持图片载入
        计划：1.UEditor是否需要实现接口
    -EditArticle.html    [编辑文章]
        现状：1."编辑文章"通过获取文章html代码，初始化到UEditor中
    -ArticleCenter    [文章中心]
    (暂时与任务中心相同的实现)
    -VipCenter    [会员信息]
    -VipInfo.html    [基本信息]
        现状：1.调用表格展示会员信息
    -VipCredit.html    [积分信息]
        现状：1.筛选条件部分支持选择日期进行搜索，配合后台接口实现
              2.行内操作"审核"与"通过"功能通过弹框确认审核与通过结果，成功后重新获取表格数据
              3.行内操作"修改"跳转至"修改积分信息"页面
        计划：1."审核"与"通过"功能是否重叠?
    -EditVipCredit.html    [修改积分信息]
        现状；1."积分时间"支持初始化并选择日期与时间，格式为"YYYY/MM/DD HH:mm"
    -BalanceCenter    [结算管理]
    (功能与会员信息模块相似)

补充：
    1.样式与交互部分需要修改的可以提出具体需求，目前仅按照本人基本理解进行制作；
    2.JS代码中有涉及到'$.ajax'的异步加载处理，其中的url仅作为本人临时设定的api，请后台开发人员根据具体实现进行修改。









