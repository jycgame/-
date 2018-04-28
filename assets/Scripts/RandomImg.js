cc.Class({
    extends: cc.Component,

    properties: {
       imgs:[cc.SpriteFrame]
    },

    init() {
        this.sprite = this.node.getComponent(cc.Sprite);
    },

    setImg() {
        this.sprite.spriteFrame = this.imgs[Math.floor((Math.random() * 7))]
    },
});
