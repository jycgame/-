cc.Class({
    extends: cc.Component,

    properties: {
        questionNo: cc.Label,
        score: cc.Label,
        timeCost: cc.Label,
        mengnalishaAnim: cc.Animation,
        comboNode: cc.Node,
        comboUIText: cc.Label,
        comboLight1: cc.Node,
        comboLight2: cc.Node,
        scoreUIText: cc.Label,
        lights: require("Lights"),
        flyBall: cc.Node,
    },

    start() {
        this.questionNo.string = 0;
        this.score.string = 0;
        this.timeCost.string = 0;
        this.comboNode.active = false;
        this.scoreUIText.node.parent.active = false;
        this.flyBall.active = false;
    },

    updateTime(time) {
        this.timeCost.string = parseInt(time);
    },

    updateQuestionNo(questionNo) {
        this.questionNo.string = questionNo;
    },

    playRight() {
        this.mengnalishaAnim.play("mengnalishaRight");
    },

    playWrong() {
        this.mengnalishaAnim.play("mengnalishaWrong");
    },

    playCombo() {
        this.mengnalishaAnim.play("mengnalishaCombo");
    },

    playFlyBall(path) {
        this.flyBall.active = true;
        var finished = cc.callFunc(function () {
            this.flyBall.active = false;
            this.lights.turnOnCurLight();
        }, this);

        this.flyBall.runAction(cc.sequence(cc.catmullRomTo(0.2, path), finished));
    },

    showComboUI(comboNum, pos) {
        this.comboUIText.string = comboNum;
        this.comboNode.position = pos;
        this.comboNode.active = true;
        this.comboLight1.setScale(0, 0);
        this.comboLight2.setScale(0, 0);

        this.lights.turnOnHun();
        var finished = cc.callFunc(function () {
            this.comboNode.active = false;
            this.lights.turnOffHun();
            this.lights.turnOnCurLight();
        }, this);
        this.comboNode.runAction(cc.sequence(cc.moveBy(0.5, 0, 50), finished));
        this.comboLight1.runAction(cc.scaleTo(0.2, 1));
        this.comboLight2.runAction(cc.scaleTo(0.2, 1));
    },

    showScoreUI(scoreAdd) {
        this.scoreUIText.string = scoreAdd;
        this.scoreUIText.node.parent.active = true;
        this.scoreUIText.node.parent.position = cc.v2(736, 370);
        this.scoreUIText.node.parent.opacity = 255;

        var finished = cc.callFunc(function () {
            this.score.node.runAction(cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1)));
            this.scoreUIText.node.parent.active = false;
            this.score.string = parseInt(this.score.string) + scoreAdd;
        }, this);
        this.scoreUIText.node.parent.runAction(cc.sequence(cc.moveTo(0.5, 736, 459), finished));
        this.scoreUIText.node.parent.runAction(cc.fadeOut(0.5))
    },

    turnOffAllLights() {
        this.lights.turnOffAll();
    },

});
