cc.Class({
    extends: cc.Component,

    properties: {
        rank:
        {
            default: null,
            type: cc.Node,
        },
        difference:
        {
            default: null,
            type: cc.Node,
        },
        userName:
        {
            default: null,
            type: cc.Node,
        },
        userScore:
        {
            default: null,
            type: cc.Node,
        },
        upSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        downSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        evenSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    toggleUserItem: function () {
        this.userName.active = !this.userName.active;
        this.userScore.active = !this.userScore.active;
    },
});
