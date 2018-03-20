var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start() {
        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.curBtnIndex = 0;
        this.btnCount = 2;
    },

    onEnable: function () {
        this.curBtnIndex = 0;
    },

    processKeyUp: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
                if (this.curBtnIndex == 0) {//开始按钮
                    GameState.current = GameState.help;
                    this.gameManager.showTut();
                }
                else if (this.curBtnIndex == 1) {//排行榜
                    GameState.current = GameState.rank;
                    this.gameManager.RankMenu.backState = GameState.title;
                    this.gameManager.RankMenu.curBtnIndex = 0;
                    this.gameManager.RankMenuNode.active = true;
                }
                break;
            case InputConfig.dpadUp:
                this.curBtnIndex++;
                if (this.curBtnIndex == this.btnCount) {
                    this.curBtnIndex = 0
                }
                break;
            case InputConfig.dpadDown:
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
