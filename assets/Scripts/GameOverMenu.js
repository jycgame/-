var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start() {
        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.audioManager = cc.find("AudioManager").getComponent("AudioManager");
        this.curBtnIndex = 0;
        this.btnCount = 2;
    },

    onEnable: function () {
        this.curBtnIndex = 0;
    },

    processKeyUp: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
                this.audioManager.playButton();
                if (this.curBtnIndex == 1) {//再玩一次
                    this.gameManager.loadMainScene();
                    this.gameManager.setPlayedTrue();
                }
                else if (this.curBtnIndex == 0) {//排行榜
                    GameState.current = GameState.rank;
                    this.gameManager.RankMenu.backState = GameState.gameover;
                    this.gameManager.RankMenu.curBtnIndex = 0;
                    this.gameManager.RankMenuNode.active = true;
                }
                break;
            case InputConfig.dpadRight:
                this.curBtnIndex++;
                if (this.curBtnIndex == this.btnCount) {
                    this.curBtnIndex = 0;
                }
                break;
            case InputConfig.dpadLeft:
                this.curBtnIndex--;
                if (this.curBtnIndex == -1) {
                    this.curBtnIndex = this.btnCount - 1;
                }
                break;
            default:
                break;
        }
    },
});
