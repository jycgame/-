cc.Class({
    extends: cc.Component,

    properties: {
        leftPos: new cc.Vec2,
        rightPos: new cc.Vec2,
    },

    GameManager: null,
    // use this for initialization
    onLoad: function () {

    },

    setPos: function (i)
    {
        if (i == 0)
            this.node.position = this.leftPos;
        else
            this.node.position = this.rightPos;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
