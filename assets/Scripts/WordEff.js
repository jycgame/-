cc.Class({
    extends: cc.Component,

    properties: {
        speed:2,
    },
    // onLoad () {},

    start () {
        var seq =  cc.repeatForever( cc.spawn(cc.sequence(cc.fadeIn(this.speed), cc.fadeOut(this.speed)),
                        cc.sequence(cc.scaleTo(this.speed, 1), cc.scaleTo(this.speed, 0.5))));

        this.node.runAction(seq);
    },

    // update (dt) {},
});
