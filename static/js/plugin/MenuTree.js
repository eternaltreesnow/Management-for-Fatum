var MenuTree = React.createClass({
    displayName: "MenuTree",
    render: function() {
        return (
            React.createElement(MenuNodes, {
                data: this.props.data
            })
        );
    }
});

var MenuChildNode = React.createClass({
    displayName: "MenuChildNode",
    render: function() {
        return (
            React.createElement("li", {
                    className: this.props.data.status
                },
                React.createElement("a", {
                    href: this.props.data.url
                }, this.props.data.text)
            )
        );
    }
});

var MenuParentNode = React.createClass({
    displayName: "MenuParentNode",
    render: function() {
        var target = "#" + this.props.data.target;
        var collapse = "collapse";
        if (this.props.data.status.indexOf('active') != -1) {
            collapse = "collapse in";
        }
        return (
            React.createElement("li", null,
                React.createElement("a", {
                        href: "javascript:void(0);",
                        "data-toggle": "collapse",
                        "data-target": target
                    },
                    React.createElement("span", null, this.props.data.text),
                    React.createElement("span", {
                        className: "caret"
                    })
                ),
                React.createElement(MenuNodes, {
                    data: this.props.data.nodes,
                    target: this.props.data.target,
                    collapse: collapse
                })
            )
        );
    }
});

var MenuNodes = React.createClass({
    displayName: "MenuNodes",
    render: function() {
        if (this.props.target == null) {
            return (
                React.createElement("ul", {
                        className: "nav side-nav"
                    },
                    this.props.data.map(function(node) {
                        if (node.isparent) {
                            return (React.createElement(MenuParentNode, {
                                data: node
                            }));
                        } else {
                            return (React.createElement(MenuChildNode, {
                                data: node
                            }));
                        }
                    })
                )
            );
        } else {
            return (
                React.createElement("ul", {
                        id: this.props.target,
                        className: this.props.collapse
                    },
                    this.props.data.map(function(node) {
                        if (node.isparent) {
                            return (React.createElement(MenuParentNode, {
                                data: node
                            }));
                        } else {
                            return (React.createElement(MenuChildNode, {
                                data: node
                            }));
                        }
                    })
                )
            );
        }
    }
});

var menuTreeNodes = [{
    id: 1,
    text: "首页",
    url: "../index.html",
    status: "hidden",
    nodes: []
}, {
    id: 2,
    text: "任务中心",
    url: "",
    status: "hidden",
    isparent: true,
    target: "task-drop",
    nodes: [{
        id: 21,
        text: "广告管理",
        url: "../TaskCenter/AdvertiseManage.html",
        status: "hidden",
        nodes: []
    }, {
        id: 22,
        text: "文章管理",
        url: "../TaskCenter/ArticleManage.html",
        status: "hidden",
        nodes: []
    }]
}, {
    id: 3,
    text: "文章中心",
    url: "",
    status: "hidden",
    isparent: true,
    target: "article-drop",
    nodes: [{
        id: 31,
        text: "广告管理",
        url: "../ArticleCenter/AdvertiseManage.html",
        status: "hidden",
        nodes: []
    }, {
        id: 32,
        text: "文章管理",
        url: "../ArticleCenter/ArticleManage.html",
        status: "hidden",
        nodes: []
    }]
}, {
    id: 4,
    text: "会员信息",
    url: "",
    status: "hidden",
    isparent: true,
    target: "vip-drop",
    nodes: [{
        id: 41,
        text: "基本信息",
        url: "../VipCenter/VipInfo.html",
        status: "hidden",
        nodes: []
    }, {
        id: 42,
        text: "积分信息",
        url: "../VipCenter/VipCredit.html",
        status: "hidden",
        nodes: []
    }]
}, {
    id: 5,
    text: "结算管理",
    url: "",
    status: "hidden",
    isparent: true,
    target: "account-drop",
    nodes: [{
        id: 51,
        text: "提现管理",
        url: "../BalanceCenter/CashManage.html",
        status: "hidden",
        nodes: []
    }, {
        id: 52,
        text: "作弊管理",
        url: "../BalanceCenter/CheatManage.html",
        status: "hidden",
        nodes: []
    }]
}];
var setActiveNodes = function(id, nodes) {
    if (nodes.length == 0) {
        return;
    } else {
        nodes.map(function(node) {
            if (node.id == id) {
                node.status += " active";
            }
            setActiveNodes(id, node.nodes);
        });
    }
}
var setModuleNodes = function(id, nodes) {
    if (nodes.length == 0) {
        return;
    } else {
        nodes.map(function(node) {
            if(node.id == id) {
                node.status = "";
            }
            setModuleNodes(id, node.nodes);
        });
    }
}
var initialMenuTreeByIds = function(ids) {
    var moduleIds = localStorage['moduleIds'].split(',');
    moduleIds.map(function(moduleId) {
        setModuleNodes(moduleId, menuTreeNodes);
    });
    ids.map(function(id) {
        setActiveNodes(id, menuTreeNodes);
    });
    React.render(
        React.createElement(MenuTree, {
            data: menuTreeNodes
        }),
        document.getElementById("menu")
    );
}
