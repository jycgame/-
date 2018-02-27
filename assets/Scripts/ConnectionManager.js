
cc.Class({
    extends: cc.Component,
    properties: () => ({
        GameManager: {
            default: null,
            type: require("GameManager")
        }
    }),


    infoLabel: null,
    retryBtn: null,
    errorSprite: null,
    loadingSprite: null,

    timeout: null,
    oldRedoFn: null,
    // use this for initialization
    init: function () {
        this.infoLabel = this.node.children[1].getComponent(cc.Label);
        this.retryBtn = this.node.children[2].getComponent(cc.Button);
        this.errorSprite = this.node.children[3].getComponent(cc.Sprite);
        this.loadingSprite = this.node.children[4].getComponent(cc.Sprite);

    },

    show: function () {
        this.retryBtn.node.active = false;
        this.errorSprite.node.active = false;
        this.loadingSprite.node.active = true;
        this.infoLabel.string = "使劲儿连接中...";
        this.node.active = true;
        this.node.opacity = 0;
        if (this.timeout != null)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            this.node.opacity = 255;
        }.bind(this), 1000);
    },

    error: function (redoFn, caller) {
        this.node.opacity = 255;
        if (this.timeout != null)
            clearTimeout(this.timeout);

        this.retryBtn.node.active = true;
        this.errorSprite.node.active = true;
        this.loadingSprite.node.active = false;
        this.infoLabel.string = "哎呀！网络好像出现了问题...";
        if (this.oldRedoFn != null)
            this.retryBtn.node.off(cc.Node.EventType.TOUCH_START, this.oldRedoFn, caller);

        this.retryBtn.node.on(cc.Node.EventType.TOUCH_START, redoFn, caller);
        this.oldRedoFn = redoFn;
    },

    hide: function () {
        if (this.timeout != null)
            clearTimeout(this.timeout);
        this.node.active = false;
    },

    // called every frame, uncomment this function to activate update callback
     //update: function (dt) {
     //    cc.log("3333333");
     //}, 
});
