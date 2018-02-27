cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    csvReader: null,
    //commondata
    gameTime: null,
    doorSpeed: null,
    phraseList: null,
    questionInterval: null,
    speedDeduction: null,
    speedDeductoinTime: null,
    scorePerQuestion: null,
    alertPercent: null,
    deadPercent: null,

    comboBonusList: null,
    // use this for initialization
    onLoad: function () {
        this.csvReader = this.node.getComponent("csvReader");
        this.readCommonData();
        this.readPhraseData();
        this.readComboData();
    },

    readComboData: function () {
        var self = this;
        cc.loader.loadRes("Data/ComboData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var comboData = self.csvReader.parse(csvData);
                comboData.shift();
                comboData.shift();
                self.comboBonusList = comboData;
            }
        });
    },

    readPhraseData: function () {
        var self = this;
        cc.loader.loadRes("Data/PhraseData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var phraseData = self.csvReader.parse(csvData);
                self.phraseList = phraseData;
            }
        });
    },
    readCommonData: function () {
        var self = this;
        cc.loader.loadRes("Data/CommonData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var commonData = self.csvReader.parse(csvData);
                self.gameTime = parseFloat(commonData[2][1]);
                self.doorSpeed = parseFloat(commonData[3][1]);
                self.questionInterval = parseFloat(commonData[4][1]);
                self.speedDeduction = parseFloat(commonData[5][1]);
                self.speedDeductionTime = parseFloat(commonData[6][1]);
                self.scorePerQuestion = parseFloat(commonData[7][1]);
                self.alertPercent = parseFloat(commonData[8][1]) / 100;
                self.deadPercent = parseFloat(commonData[9][1]) / 100;
            }
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
