/**
 * [checkValidateForm 验证表单]
 * @param  {[String]} username [用户名]
 * @param  {[String]} password [密码]
 * @return {[boolean]} 0 [有错误]
 * @return {[boolean]} 1 [正确提交]
 */
var checkValidateForm = function(username, password) {
        if (username.length === 0) {
            validateError('请输入用户名...');
            return 0;
        }
        if (password.length === 0) {
            validateError('请输入密码...');
            return 0;
        }
        return 1;
    }
    /**
     * [validateError 根据错误类型显示错误提示]
     * @param  {[String]} error 错误提示
     */
var validateError = function(error) {
    var $validateErrorInfo = $("#validateErrorInfo");
    $validateErrorInfo.html(error);
    $validateErrorInfo.css('visibility', 'visible');
    setTimeout("$('#validateErrorInfo').css('visibility', 'hidden')", 5000);
}
var transModuleId = function(modules) {
    var ids = [1];
    modules.map(function(module) {
        switch (module) {
            case 'taskAdvertise':
                ids.push(2, 21);
                break;
            case 'taskArticle':
                ids.push(2, 22);
                break;
            case 'articleAdvertise':
                ids.push(3, 31);
                break;
            case 'articleArticle':
                ids.push(3, 32);
                break;
            case 'userInfo':
                ids.push(4, 41);
                break;
            case 'userProfit':
                ids.push(4, 42);
                break;
            case 'userWithdraw':
                ids.push(5, 51);
                break;
            case 'userCheating':
                ids.push(5, 52);
                break;
        }
    });
    return ids;
}
$(function() {
    var $loginBtn = $("#loginBtn");
    var $userName = $("#inputUsername");
    var $password = $("#inputPassword");
    var $loginForm = $("#loginForm");

    $loginBtn.on('click', function() {
        var username = $userName.val();
        var password = $password.val();
        // 验证表单后，提交loginForm表单
        if (checkValidateForm(username, password)) {
            var requestData = {
                username: username,
                password: $.md5(password)
            };
            $.ajax({
                url: "/_admin/s/login",
                type: "POST",
                data: requestData,
                dataType: 'json',
                success: function(data) {
                    if (data.code == 200) {
                        localStorage['user'] = data.data.manager.username;
                        localStorage['moduleIds'] = transModuleId(data.data.modules);
                        location.href = 'index.html';
                    } else {
                        validateError(data.error);
                    }
                },
                error: function(data) {
                    $("#validateErrorInfo").html("网络错误，请重试...");
                }
            });
        }
    });
});
