var AudioManager = require("AudioManager");
cc.Class({
    extends: cc.Component,

    properties: {
        btnIndex: 0,
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        AudioManager: {
            default: null,
            type: AudioManager,
        },
        pressedSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        normalSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
    },
    GameManager: null,
    // use this for initialization
    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.sprite = this.node.getComponent(cc.Sprite)
        this.enableClick();
    },

    btnOnClick: function (event) {
        var pb = event.currentTarget.getComponent("PhraseBtn")
        var sprite = event.currentTarget.getComponent(cc.Sprite)
        sprite.spriteFrame = pb.normalSprite;

        //pb.disableClick();
        //pb.disableClick();
    },

    btnOnPress: function (event) {
        var pb = event.currentTarget.getComponent("PhraseBtn")
        var sprite = event.currentTarget.getComponent(cc.Sprite)
        pb.AudioManager.playSwitch();
        var gm = pb.GameManager;
        gm.answerSelected(pb.btnIndex);
        sprite.spriteFrame = pb.pressedSprite;
    },

    btnOnPressTV: function()
    {
        var gm = this.GameManager;
        gm.answerSelected(this.btnIndex);
        this.sprite.spriteFrame = this.pressedSprite;
    },

    reset:function (event) {
        this.sprite.spriteFrame = this.normalSprite;
    },

    btnOnCancel: function (event) {
        var pb = event.currentTarget.getComponent("PhraseBtn")
        var sprite = event.currentTarget.getComponent(cc.Sprite)
        sprite.spriteFrame = pb.normalSprite;
    },

    enableClick: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.btnOnClick, this.node);
        this.node.on(cc.Node.EventType.TOUCH_START, this.btnOnPress, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.btnOnCancel, this.node);
    },

    disableClick: function () {
        //this.node.off(cc.Node.EventType.TOUCH_END, this.btnOnClick, this.node);
        this.node.off(cc.Node.EventType.TOUCH_START, this.btnOnPress, this.node);
      //  this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.btnOnCancel, this.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
