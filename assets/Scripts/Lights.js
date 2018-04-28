cc.Class({
    extends: cc.Component,

    properties: {
        onSprite: cc.SpriteFrame,
        offSprite: cc.SpriteFrame,

    },

    start() {
        this.curIndex = 0;

    },


    getCurLightPos() {
        var pos = this.node.convertToWorldSpaceAR(this.node.children[this.curIndex].position);
        return this.node.parent.convertToNodeSpaceAR(pos);
    },

    turnOnCurLight() {
        this.node.children[this.curIndex].getComponent(cc.Sprite).spriteFrame = this.onSprite;
        if (this.curIndex == 4) {
            this.scheduleOnce(function () {
                this.turnOffAll();
            }, 0.2);
        }
        else
        {
            this.curIndex++;
        }
    },

    turnOnHun() {
        this.node.children[this.curIndex].children[0].active = true;
    },

    turnOffHun() {
        this.node.children[this.curIndex].children[0].active = false;
    },

    turnOffAll() {
        // 以秒为单位的时间间隔
        var interval = 0.04;
        // 重复次数
        var repeat = this.curIndex;
        // 开始延时
        var delay = 0;
        this.schedule(function () {
            this.node.children[this.curIndex].getComponent(cc.Sprite).spriteFrame = this.offSprite;
            if (this.curIndex != 0)
                this.curIndex--;
        }, interval, repeat, delay);
        // for (let i = 0; i < this.node.childrenCount; i++) {
        //     this.node.children[i].getComponent(cc.Sprite).spriteFrame = this.offSprite;
        // }
        // this.curIndex = 0;
    },

});
