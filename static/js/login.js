/**
 * [checkValidateForm 验证表单]
 * @param  {[String]} username [用户名]
 * @param  {[String]} password [密码]
 * @return {[boolean]} 0 [有错误]
 * @return {[boolean]} 1 [正确提交]
 */
var checkValidateForm = function(username, password) {
    if(username.length === 0) {
        validateError('username');
        return 0;
    }
    if(password.length === 0) {
        validateError('password');
        return 0;
    }
    return 1;
}
/**
 * [validateError 根据错误类型显示错误提示]
 * @param  {[String]} type 错误类型
 */
var validateError = function(type) {
    var $validateErrorInfo = $("#validateErrorInfo");

    if(type === 'username') {
        $validateErrorInfo.html('请输入用户名...');
    } else if(type === 'password') {
        $validateErrorInfo.html('请输入密码...');
    }
    $validateErrorInfo.css('visibility', 'visible');
    setTimeout("$('#validateErrorInfo').css('visibility', 'hidden')", 5000);
}
$(function() {
    var $loginBtn = $("#loginBtn");
    var $userName = $("#inputUsername");
    var $password = $("#inputPassword");

    $loginBtn.on('click', function() {
        var username = $userName.val();
        var password = $password.val();
        // 验证表单后，跳转到index页面
        if(checkValidateForm(username, password)) {
            document.location = 'index.html';
        }
    });
});
