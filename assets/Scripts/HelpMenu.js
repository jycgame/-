var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start() {
        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.audioManager = cc.find("AudioManager").getComponent("AudioManager");
    },

    processKeyUp: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
            this.audioManager.playButton();
            this.node.active = false;
            
            if(this.gameManager.userName == "未登录"){
                this.gameManager.startGame();
            }
            else {
                this.gameManager.signUp();
            }
            default:
                break;
        }
    },
});
