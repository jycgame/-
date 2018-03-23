var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,
    properties: {
        btn: cc.Button,
    },

    onLoad: function () {
        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.audioManager = cc.find("AudioManager").getComponent("AudioManager");
        this.sprite = this.btn.node.getComponent(cc.Sprite);
        this.node.active = false;
    },

    processKeyDown: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
                this.audioManager.playButton();
                this.sprite.spriteFrame = this.btn.pressedSprite;
                this.gameManager.BtnHighLight.active = false;
                break;
        }
    },

    processKeyUp: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
                this.sprite.spriteFrame = this.btn.normalSprite;
                this.gameManager.BtnHighLight.active = true;
                this.node.active = false;
                if (this.gameManager.userName == "未登录") {
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
