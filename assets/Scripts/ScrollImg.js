cc.Class({
    extends: cc.Component,

    properties: {
       speed:1,
       gap:10,
    },

    start () {
        this.imgNode1 = this.node.children[0];
        this.imgNode2 = cc.instantiate( this.imgNode1);
        this.imgNode2.parent = this.node
        this.imgNode2.position = this.imgNode1.position.add(cc.v2(0,-this.imgNode1.height-this.gap))

        this.stopPos = 540 + this.imgNode1.height;
        // cc.log(this.node.height)
    },

    update (dt) {
        this.imgNode1.y += this.speed
        this.imgNode2.y += this.speed

        if (this.imgNode1.y >= this.stopPos)
        {
            this.imgNode1.position = this.imgNode2.position.add(cc.v2(0,-this.imgNode1.height-this.gap))
        }
        else if (this.imgNode2.y >= this.stopPos)
        {
            this.imgNode2.position = this.imgNode1.position.add(cc.v2(0,-this.imgNode1.height-this.gap))
        }
    },
});
