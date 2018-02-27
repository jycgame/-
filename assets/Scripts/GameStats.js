cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label,
        },
        questionCountLabel: {
            default: null,
            type: cc.Label,
        },
        rightCountLabel: {
            default: null,
            type: cc.Label,
        },
        wrongCountLabel: {
            default: null,
            type: cc.Label,
        },
        highestComboLabel: {
            default: null,
            type: cc.Label,
        },
        rightPercentLabel: {
            default: null,
            type: cc.Label,
        },
        rankLabel: {
            default: null,
            type: cc.Label,
        },
        timeCostLabel: {
            default: null,
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    setStats: function (score, questionCount, rightCount, wrongCount, highestCombo, rightPercent, rank, timeCost) {
        this.setLabel(this.scoreLabel, score);
        this.setLabel(this.questionCountLabel, questionCount);
        this.setLabel(this.rightCountLabel, rightCount);
        this.setLabel(this.wrongCountLabel, wrongCount);
        this.setLabel(this.highestComboLabel, highestCombo);
        this.setLabel(this.rightPercentLabel, rightPercent);
        this.setLabel(this.rankLabel, rank);
        this.setLabel(this.timeCostLabel, timeCost);
    },

    setLabel: function (label,val) {
        label.string = val;
        label.node.children[0].getComponent(cc.Label).string = val;
    },

    hide: function () {
        this.node.active = false;
    },

    hideRankRow:function() {
        this.node.children[2].children[5].active = false;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
