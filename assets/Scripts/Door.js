var AudioManager = require("AudioManager");
var DataManager = require("DataManager");

cc.Class({
    extends: cc.Component,

    properties: {
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },

        AudioManager: {
            default: null,
            type: AudioManager,
        },
        DataManager: {
            default: null,
            type: DataManager,
        },

        doorType: 0, //0左门，1右门
    },

    GameManager: null,
    dir: null,
    targetPosX: null,
    alerting: null,//左门到达此位置开启报警
    doorAlertPosX: null,
    originalPos: null,
    // use this for initialization
    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.originalPos = this.node.position;
        var totalDist = Math.abs(this.node.x);
        if (this.doorType == 0) {
            this.dir = cc.Vec2.RIGHT;
            this.targetPosX = -totalDist * (1 - this.DataManager.deadPercent);
        }
        else {
            this.dir = cc.Vec2.RIGHT.neg();
            this.targetPosX = totalDist * (1 - this.DataManager.deadPercent);
        }
        this.alerting = false;
        //这里deadPercent和alertPercent反着用，因为左门位置都是负数
        this.doorAlertPosX = -totalDist * (1 - this.DataManager.alertPercent);
    },

    //called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.GameManager.gameStarted) {
            if (this.doorType == 0 && this.node.x >= this.targetPosX)//游戏结束
            {
                this.GameManager.gameover();
                return;
            }
            else if (this.doorType == 1 && this.node.x <= this.targetPosX)//游戏结束
                return;

            var curPos = this.node.position;

            if (this.alerting) {
                if (this.doorType == 0 && curPos.x < this.doorAlertPosX) {
                    this.alerting = false;
                    this.GameManager.stopAlertPhase();
                }
            }
            else if (this.doorType == 0 && curPos.x >= this.doorAlertPosX) {
                this.alerting = true;
                this.GameManager.alertPhase();
            }
            var deltaPos = this.dir.mul(this.GameManager.doorSpeed * dt);
            var nextPos = curPos.add(deltaPos);

            if (this.doorType == 0 && nextPos.x < this.originalPos.x
                || this.doorType == 1 && nextPos.x > this.originalPos.x)
            {
                nextPos = this.originalPos;
            }
            this.node.position = nextPos;
        }
    },

    reset: function () {
        this.node.position = this.originalPos;
    }
});
