var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function () {
        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.curBtnIndex = 0;
        this.btnCount = 2;
    },

    processKeyUp: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
                if (this.curBtnIndex == 0) {//开始按钮
                    if (this.backState == GameState.title) {
                        GameState.current = GameState.help;
                        this.gameManager.showTut()
                    }
                    else {
                        this.gameManager.GameStats.node.active = false;
                        this.gameManager.loadMainScene();
                        this.gameManager.setPlayedTrue();
                    }
                }
                else if (this.curBtnIndex == 1) {//关闭
                    GameState.current = this.backState;
                    this.gameManager.RankMenuNode.active = false;
                }
                break;
            case InputConfig.dpadRight:
                this.curBtnIndex++;
                if (this.curBtnIndex == this.btnCount) {
                    this.curBtnIndex = 0
                }
                break;
            case InputConfig.dpadLeft:
                this.curBtnIndex--;
                if (this.curBtnIndex == -1) {
                    this.curBtnIndex = this.btnCount - 1
                }
                break;
            default:
                break;
        }
    },
});
