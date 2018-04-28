var GameManager = require("GameManager");
var ConnectionManager = require("ConnectionManager");

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: GameManager,
        },
        ConnectionManager: {
            default: null,
            type: ConnectionManager,
        },
        scoreInput: {
            default: null,
            type: cc.EditBox,
        },
        rankList: {
            default: null,
            type: cc.Node,
        },
        button: {
            default: null,
            url: cc.AudioClip,
        },

        splitChar: "<br />",
        id: "",
    },


    onEnable: function () {
        this.initial(this);
    },

    loadGameScene: function () {
        cc.audioEngine.playEffect(this.button, false);
        cc.director.loadScene("Main");
    },

    initial: function (gm) {
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;

        var url = gm.GameManager.dbURL + "/queryindex.php?uuid=" + gm.GameManager.userId;

        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    //alert("Get rank success");
                    var responses = window.xmlhttp.responseText.split(self.splitChar);
                    var item = responses[0].split(",");

                    //item 0 对应名次， item 1 对应分数， 不同于下一个item
                    var responseRank = item[0];
                    var responseHighScore = item[1];
                    var lastRank = item[2];

                    var rankListComponent = self.rankList.getComponent("RankList");
                    // var userName = item[3];
                    // if (!userName || userName === "")
                    //     userName = item[4];
                    var userName = item[4];

                    if (gm.GameManager.userName ==="未登录")
                        rankListComponent.setItem(5, 0, 0, "未登录", 0);
                    else
                        rankListComponent.setItem(5, responseRank, lastRank, userName, responseHighScore);


                    self.showAllRank(self);
                }
                else {
                    self.ConnectionManager.error(self.initial, self);
                    cc.log("Problem retrieveing XML data");
                }
            }
        };
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    showAllRank: function (gm) {
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;

        var url = gm.GameManager.dbURL + "/querysort.php?count=5";

        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    //alert("Get all rank success");
                    var responses = window.xmlhttp.responseText.split(self.splitChar);
                    for (var i = 0; i < responses.length; i++) {
                        var item = responses[i].split(",");

                        // var userName = item[4];
                        // if (!userName || userName === "")
                        //     userName = item[5];
                        var userName = item[5];
                        var responseHighScore = item[1];
                        var lastRank = item[3];

                        var rankListComponent = self.rankList.getComponent("RankList");
                        rankListComponent.setItem(i, i + 1 + ".", lastRank, userName, responseHighScore);
                    }
                }
                else {
                    self.ConnectionManager.error(self.showAllRank, self);
                    cc.log("Problem retrieveing XML data");
                }
            }
        };
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },
});