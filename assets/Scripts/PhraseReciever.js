cc.Class({
    extends: cc.Component,

    properties: {
        DataManagerNode: {
            default: null,
            type: cc.Node,
        },
    },

    DataManager: null,
    usedPhraseIndexList: null,
    // use this for initialization
    onLoad: function () {
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.usedPhraseIndexList = [];
    },

    getPhrasePair: function () {
        var i = parseInt(Math.random() * this.DataManager.phraseList.length);
        while (this.usedPhraseIndexList.indexOf(i) != -1)
            i = parseInt(Math.random() * this.DataManager.phraseList.length);

        this.usedPhraseIndexList.push(i);

        //如果词语全部用过了就重新随机
        if (this.usedPhraseIndexList.length == this.DataManager.phraseList.length)
            this.usedPhraseIndexList = [];

        var phrasePair = [this.DataManager.phraseList[i][0],this.DataManager.phraseList[i][1], this.DataManager.phraseList[i][2]];
        return phrasePair;
    },

    //vertPhrase: function (phrase) {
    //    var resPhrase = "";
    //    for (var i = 0; i < phrase.length; i++) {
    //        resPhrase = resPhrase.concat(phrase[i])
    //        if (i != phrase.length - 1)
    //            resPhrase = resPhrase.concat("\n");
    //    }
    //    return resPhrase;
    //},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
