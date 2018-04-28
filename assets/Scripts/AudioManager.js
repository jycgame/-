cc.Class({
    extends: cc.Component,

    properties: {
        bgMenu: {
            default: null,
            url: cc.AudioClip,
        },

        bgHead: {
            default: null,
            url: cc.AudioClip,
        },

        bgBody: {
            default: null,
            url: cc.AudioClip,
        },

        right1: [cc.AudioClip],

        right2: [cc.AudioClip],

        wrong: cc.AudioClip,

        switch: {
            default: null,
            url: cc.AudioClip,
        },

        combo: {
            default: null,
            url: cc.AudioClip,
        },

        alert: {
            default: null,
            url: cc.AudioClip,
        },

        gameover: {
            default: null,
            url: cc.AudioClip,
        },

        button: {
            default: null,
            url: cc.AudioClip,
        },
    },

    alertId: null,
    bgId: null,
    bgTimeout: null,

    playBgMenu: function () {
        if (this.bgId != null)
            cc.audioEngine.stop(this.bgId);
        this.bgId = cc.audioEngine.playEffect(this.bgMenu, true);
    },

    playBg: function () {
        if (this.bgId != null)
            cc.audioEngine.stop(this.bgId);
        this.bgId = cc.audioEngine.playEffect(this.bgBody, true)
        // if (this.bgId != null)
        //     cc.audioEngine.stop(this.bgId);
        // this.bgId = cc.audioEngine.playEffect(this.bgHead, false);
        // var time = cc.audioEngine.getDuration(this.bgId);
        // this.bgTimeout = setTimeout(function () {
        //     this.bgId = cc.audioEngine.playEffect(this.bgBody, true);
        // }.bind(this), time * 1000);
    },

    stopBg: function () {
        if (this.bgTimeout != null)
            clearTimeout(this.bgTimeout);
        cc.audioEngine.stop(this.bgId);
    },

    playButton: function () {
        cc.audioEngine.playEffect(this.button, false);
    },

    playRight: function () {
        var n = Math.random();
        if (n <= 0.5) {
            n = Math.random();
            if (n <= 0.33)
                cc.audioEngine.playEffect(this.right1[0], false);
            else if (n < 0.67)
                cc.audioEngine.playEffect(this.right1[1], false);
            else
                cc.audioEngine.playEffect(this.right1[2], false);
        }
        else {
            n = Math.random();
            if (n <= 0.33)
                cc.audioEngine.playEffect(this.right2[0], false);
            else if (n < 0.67)
                cc.audioEngine.playEffect(this.right2[1], false);
            else
                cc.audioEngine.playEffect(this.right2[2], false);
        }
    },

    playWrong: function () {
        cc.audioEngine.playEffect(this.wrong, false);
    },

    playSwitch: function () {
        cc.audioEngine.playEffect(this.switch, false);
    },

    playCombo: function () {
        cc.audioEngine.playEffect(this.combo, false);
    },

    playAlert: function () {
        this.alertId = cc.audioEngine.play(this.alert, true);
    },

    stopAlert: function () {
        cc.audioEngine.stop(this.alertId);
    },

    playGameover: function () {
        this.stopBg();
        this.stopAlert();
        cc.audioEngine.playEffect(this.gameover, false);
    },

    muteAll: function () {
        if (this.bgId != null)
            cc.audioEngine.setVolume(this.bgId, 0);
        if (this.alertId != null)
            cc.audioEngine.setVolume(this.alertId, 0);
    }


    // use this for initialization
    //onLoad: function () {

    //},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
