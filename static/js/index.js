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
                    location.href = 'login.html';
                } else {
                    console.log(data.error);
                }
            },
            error: function(data) {
                console.log(data.error);
            }
        });
    });

    var ids = [];
    initialMenuTreeByIds(ids);
});
