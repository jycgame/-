cc.Class({
    extends: cc.Component,

    properties: {
        rotateSpeed: null,
        startTime: null,
        timer: 0,
    },

    // use this for initialization
    onLoad: function () {
        if (Math.random() < 0.5)
        {
            this.rotateSpeed = 10;
        }
        else
        {
            this.rotateSpeed = -10;
        }

        this.rotateSpeed = this.rotateSpeed * 1.2 / this.node.scaleX;
        this.startTime = Math.random() * 6;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timer += dt;
        //if (this.timer > this.startTime)
        //{
            this.node.rotation += this.rotateSpeed * dt;
            this.node.rotation %= 360;
       // }
     },
});
