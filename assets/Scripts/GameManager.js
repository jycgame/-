var AudioManager = require("AudioManager");
var GameStats = require("GameStats");
var ConnectionManager = require("ConnectionManager");
var Phrase = require("Phrase");
var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        randomImg: require("RandomImg"),
        flowerLightningNode: cc.Node,
        lightningAnim: cc.Animation,
        GamePlayInfo: require("GamePlayInfo"),
        BtnHighLight: cc.Node,
        QuitTipNode: cc.Node,
        DataManagerNode: {
            default: null,
            type: cc.Node,
        },
        GameStats: {
            default: null,
            type: GameStats,
        },
        AudioManager: {
            default: null,
            type: AudioManager,
        },
        ConnectionManager: {
            default: null,
            type: ConnectionManager,
        },
        leftPhrase: {
            default: null,
            type: Phrase,
        },

        rightPhrase: {
            default: null,
            type: Phrase,
        },

        MainMenu: {
            default: null,
            type: require("MainMenu")
        },

        RankMenu: {
            default: null,
            type: require("RankMenu")
        },

        HelpMenu: {
            default: null,
            type: require("HelpMenu")
        },

        GameOverMenu: {
            default: null,
            type: require("GameOverMenu")
        },

        RankMenuNode: {
            default: null,
            type: cc.Node,
        },

        GameUINode: {
            default: null,
            type: cc.Node,
        },

        tickSprite: {
            default: null,
            type: cc.SpriteFrame,
        },

        crossSprite: {
            default: null,
            type: cc.SpriteFrame,
        },

        leftSpriteNode: {
            default: null,
            type: cc.Node,
        },

        rightSpriteNode: {
            default: null,
            type: cc.Node,
        },

        leftPhraseBtnNode: {
            default: null,
            type: cc.Node,
        },
        rightPhraseBtnNode: {
            default: null,
            type: cc.Node,
        },
        hackerNode: {
            default: null,
            type: cc.Node,
        },
        charNode: {
            default: null,
            type: cc.Node,
        },

        leftImpulseAnim: {
            default: null,
            type: cc.Animation,
        },

        rightImpulseAnim: {
            default: null,
            type: cc.Animation,
        },

        rightDoorNode: {
            default: null,
            type: cc.Node,
        },

        tvBackground: {
            default: null,
            type: cc.Sprite,
        },

        tvAlertBg: {
            default: null,
            type: cc.SpriteFrame,
        },

        tvAlertRingNode: {
            default: null,
            type: cc.Node,
        },

        tutNode: {
            default: null,
            type: cc.Node,
        }
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
    doorSpeed: null,
    DataManager: null,
    PhraseReviever: null,

    rightAnswerIndex: null,
    leftSprite: null,
    rightSprite: null,
    leftPhraseBtn: null,
    rightPhraseBtn: null,
    wrongWordIndecies: null,
    gameStarted: null,
    rightAnswerCount: null,
    speedDeductionTimeout: null,
    hacker: null,
    UserDataURL: null,

    //结算数据
    rightCount: null,
    wrongCount: null,
    highestCombo: null,
    timeCost: null,
    comboScore: null,
    score: null,

    charAnimation: null,

    doorMaxDist: null,
    deadAnim: null,
    userId: null,
    userName: null,
    userNickName: null,
    tvDefaultBg: null,
    // use this for initialization
    onLoad: function () {

        this.ConnectionManager.init();
        this.leftPhrase.init();
        this.rightPhrase.init();

        this.UserDataURL = "https://jcyapi.easybao.com/jcy-api/app/system/getUserMessage";
        //this.UserDataURL = "http://106.14.151.23/jcy-api/app/system/getUserMessage";
        //this.dbURL = "http://101.132.135.78/zcxs";
        this.dbURL = "http://games.jcgroup.com.cn/zcxs"

        this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.PhraseReviever = this.node.getComponent("PhraseReciever");
        this.charAnimation = this.charNode.getComponent(cc.Animation);
        this.leftSprite = this.leftSpriteNode.getComponent(cc.Sprite);
        this.rightSprite = this.rightSpriteNode.getComponent(cc.Sprite);
        this.deadAnim = this.tvBackground.node.getComponent(cc.Animation);
        this.tvDefaultBg = this.tvBackground.node.getComponent(cc.Sprite).spriteFrame;
        this.leftPhraseBtn = this.leftPhraseBtnNode.getComponent("PhraseBtn");
        this.rightPhraseBtn = this.rightPhraseBtnNode.getComponent("PhraseBtn");
        this.gameStarted = false;
        this.hacker = this.hackerNode.getComponent("Hacker");
        this.doorSpeed = 0;

        this.charAnimation.on('finished', this.charAttackFinished, this);
        this.deadAnim.on('finished', this.deadAnimFinished, this);
        this.lightningAnim.on('finished', this.lightningAnimFinished, this);
        this.getUserId();
        this.getUserData(this);
        this.startQuitCount = false;

        GameState.current = GameState.title;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.randomImg.init()

    },

    onDestroy: function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function (event) {
        switch (GameState.current) {
            case GameState.title:
                this.MainMenu.processKeyDown(event);
                break;
            case GameState.rank:
                this.RankMenu.processKeyDown(event);
                break;
            case GameState.help:
                this.HelpMenu.processKeyDown(event);
                break;
            // case GameState.play:
            //     this.processKeyDown(event);
            //     break;
            case GameState.gameover:
                this.GameOverMenu.processKeyDown(event);
                break;
        }
    },

    onKeyUp: function (event) {
        if (event.keyCode == InputConfig.back && this.startQuitCount) {
            console.log("Quit Game!");
            cc.game.end();
            return;
        }
        else if (event.keyCode == InputConfig.back) {
            this.startQuitCount = true;
            this.quitCount = 0;
            this.QuitTipNode.active = true;
            return;
        }

        switch (GameState.current) {
            case GameState.title:
                this.MainMenu.processKeyUp(event);
                break;
            case GameState.rank:
                this.RankMenu.processKeyUp(event);
                break;
            case GameState.help:
                this.HelpMenu.processKeyUp(event);
                break;
            case GameState.play:
                this.processKeyUp(event);
                break;
            case GameState.gameover:
                this.GameOverMenu.processKeyUp(event);
                break;
        }
    },

    processKeyUp: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadRight:
                GameState.current = GameState.invalid;
                this.rightPhraseBtn.btnOnPressTV();
                break;
            case InputConfig.dpadLeft:
                GameState.current = GameState.invalid;
                this.leftPhraseBtn.btnOnPressTV();
                break;
            default:
                break;
        }
    },

    getUserData: function (gm) {
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", gm.UserDataURL);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        var paramJson = { "userNo": gm.userId };
        xmlhttp.send(JSON.stringify(paramJson));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    var obj = JSON.parse(xmlhttp.responseText);
                    // console.log(obj.data)
                    if (obj.data) {
                        self.AudioManager.playBgMenu();
                        self.userName = obj.data.name;
                        self.userNickName = obj.data.nickName;
                        self.checkUserId(self);
                    }
                    else //未登录
                    {
                        self.userName = "未登录";

                        var played = cc.sys.localStorage.getItem("played")
                        if (played === "true")//在玩一次d
                        {
                            self.AudioManager.playBgMenu();
                            self.startGame();
                        }
                        else {
                            self.AudioManager.playBgMenu();
                            self.MainMenu.node.active = true;
                            self.BtnHighLight.active = true;
                        }
                    }
                }
                else {
                    self.ConnectionManager.error(self.getUserData, self);
                    cc.log("getUserData error!");
                }
            }
        }
    },

    updateLastRank: function (gm) {
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;
        var url = gm.dbURL + "/updateLastRank.php?uuid=" + gm.userId;
        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    // self.startGame();
                }
                else {
                    self.ConnectionManager.error(self.updateLastRank, self);
                    cc.log("updateLastRank error!!");
                }
            }
        }
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },


    checkUserId: function (gm) {
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;

        var url = gm.dbURL + "/queryuserexist.php?uuid=" + gm.userId;
        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    // if (window.xmlhttp.responseText === "Yes") {
                    var played = cc.sys.localStorage.getItem("played")
                    if (played === "true")//在玩一次
                    {
                        self.updateLastRank(gm);
                        self.startGame();
                    }
                    else {
                        self.MainMenu.node.active = true;
                        self.BtnHighLight.active = true;
                        self.signUp(self);
                    }
                    // }
                    // else //第一次玩
                    // {
                    //     self.AudioManager.playBgMenu();
                    //     self.MainMenu.node.active = true;
                    //     //self.signUp(self);
                    // }
                }
                else {
                    self.ConnectionManager.error(self.checkUserId, self);
                    cc.log("checkUserId error!");
                }
            }
        }
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    showTut: function () {
        this.MainMenu.node.active = false;
        this.tutNode.active = true;
    },

    signUp: function (gm) {
        gm = this;
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;

        gm.tutNode.active = false;
        var url = encodeURI(gm.dbURL + "/register.php?uuid=" + gm.userId + "&name=" + gm.userName + "&nickName=" + gm.userNickName);
        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    self.updateLastRank(self);

                    //self.MainMenu.node.active = true;
                }
                else {
                    self.ConnectionManager.error(self.signUp, self);
                    cc.log("signUp error!!");
                }
            }
        };
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    getUserId: function () {
        this.userId = this.getURLParameter("userNo");
    },

    getURLParameter: function (name) {
        if (cc.sys.isNative) {
            if (cc.sys.OS_ANDROID == cc.sys.os) {
                // console.log("current platform is: cc.sys.OS_ANDROID");
                // var id = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "show", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", "title", "message");
                var id =  jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getId", "()Ljava/lang/String;");
                console.log("get userid from java:  "+ id);
                return id;
            }
            else
                return "Anonymous";
        }
        else
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    },

    loadMainScene: function () {
        cc.director.loadScene("Main");
    },

    lightningAnimFinished: function () {
        this.lightningAnim.node.parent.active = false;
        this.charNode.active = true;
        this.flowerLightningNode.active = true;
        setTimeout(function () {
            this.flowerLightningNode.active = false;
        }.bind(this), 1000);

    },

    charAttackFinished: function () {
        this.leftImpulseAnim.node.active = false;
        this.rightImpulseAnim.node.active = false;
        this.charAnimation.play("char");
    },

    deadAnimFinished: function () {
        this.AudioManager.playGameover();

        this.leftPhraseBtn.disableClick();
        this.rightPhraseBtn.disableClick();

        if (this.rightAnswerCount > this.highestCombo)
            this.highestCombo = this.rightAnswerCount;

        this.score = this.rightCount * this.DataManager.scorePerQuestion + this.comboScore;
        this.uploadHighScore(this);
    },

    startGame: function () {
        this.randomImg.setImg()
        this.BtnHighLight.active = false;
        GameState.current = GameState.play;
        this.GameUINode.active = true;
        this.RankMenuNode.active = false;
        this.MainMenu.node.active = false;
        this.doorSpeed = this.DataManager.doorSpeed;
        this.setPhrasePair();
        this.gameStarted = true;
        this.rightAnswerCount = 0;
        this.rightCount = 0;
        this.wrongCount = 0;
        this.highestCombo = 0;
        this.timeCost = 0;
        this.comboScore = 0;
        this.doorMaxDist = this.rightDoorNode.x;
        this.AudioManager.playBg();
        cc.sys.localStorage.setItem("played", false);
    },

    gameover: function () {
        GameState.current = GameState.invalid;
        this.gameStarted = false;
        this.charNode.active = false;
        this.deadAnim.play("deadAnim");
    },

    alertPhase: function () {
        this.AudioManager.playAlert();
        this.tvBackground.spriteFrame = this.tvAlertBg;
        this.tvAlertRingNode.active = true;
    },

    stopAlertPhase: function () {
        this.AudioManager.stopAlert();
        this.tvBackground.spriteFrame = this.tvDefaultBg;
        this.tvAlertRingNode.active = false;
    },

    setPhrasePair: function () {
        var n = Math.random();
        var phrasePair = this.PhraseReviever.getPhrasePair();
        var wrongAnswer = phrasePair[0];
        var rightAnswer = phrasePair[1];
        this.wrongWordIndecies = phrasePair[2];
        if (n <= 0.5) {
            this.leftPhrase.setString(wrongAnswer, this.wrongWordIndecies);
            this.rightPhrase.setString(rightAnswer, this.wrongWordIndecies)
            this.rightAnswerIndex = 1;
            this.hacker.setPos(1);
        }
        else {
            this.leftPhrase.setString(rightAnswer, this.wrongWordIndecies);
            this.rightPhrase.setString(wrongAnswer, this.wrongWordIndecies)
            this.rightAnswerIndex = 0;
            this.hacker.setPos(0);
        }
    },

    answerSelected: function (seletionIndex) {
        this.leftPhraseBtn.disableClick();
        this.rightPhraseBtn.disableClick();
        var answerSpriteFrame = null;
        if (seletionIndex == this.rightAnswerIndex) {//答对
            this.rightAnswerCount++;
            if (this.rightAnswerCount % 5 == 0) {
                this.lightningAnim.node.parent.active = true;
                this.lightningAnim.play();
                this.charNode.active = false;
            }
            else {
                this.leftImpulseAnim.node.active = true;
                this.rightImpulseAnim.node.active = true;
                this.leftImpulseAnim.node.scaleX = -this.rightDoorNode.x / this.doorMaxDist;
                this.rightImpulseAnim.node.scaleX = this.rightDoorNode.x / this.doorMaxDist;
                this.leftImpulseAnim.play("leftImpluse");
                this.rightImpulseAnim.play("leftImpluse");
                this.charAnimation.play("charAttack");
            }
            answerSpriteFrame = this.tickSprite;
            if (!this.comboBonus())
                this.deductSpeed();
            this.rightCount++;
        }
        else {
            answerSpriteFrame = this.crossSprite;
            if (this.rightAnswerCount > this.highestCombo)
                this.highestCombo = this.rightAnswerCount;
            this.rightAnswerCount = 0;
            this.wrongCount++;
            this.GamePlayInfo.playWrong();
            this.AudioManager.playWrong();
            this.GamePlayInfo.turnOffAllLights();
        }

        var comboUIPos = null;
        if (seletionIndex == 0) {
            this.leftSpriteNode.active = true;
            this.leftSprite.spriteFrame = answerSpriteFrame;
            comboUIPos = cc.v2(-482, -300);
            // if (seletionIndex == this.rightAnswerIndex)
            //     this.GamePlayInfo.playFlyBall([cc.v2(-430, -324), cc.v2(-651, -80), cc.v2(-766, 10), cc.v2(-814, 167), cc.v2(-663, 257)]);
        }
        else {
            this.rightSpriteNode.active = true;
            this.rightSprite.spriteFrame = answerSpriteFrame;
            comboUIPos = this.rightSpriteNode.parent.convertToWorldSpace(this.rightSpriteNode.position);
            comboUIPos = cc.v2(382, -300);
            // if (seletionIndex == this.rightAnswerIndex)
            //     this.GamePlayInfo.playFlyBall([cc.v2(430, -285), cc.v2(269, 19), cc.v2(-42, -141), cc.v2(-372, 333)]);
        }

        if (seletionIndex == this.rightAnswerIndex) {
            this.GamePlayInfo.showComboUI(this.rightAnswerCount, comboUIPos);
            this.GamePlayInfo.showScoreUI(this.curComboScore + this.DataManager.scorePerQuestion)
        }
        this.GamePlayInfo.updateQuestionNo(this.rightCount + this.wrongCount);


        setTimeout(function () {
            this.leftPhraseBtn.reset();
            this.rightPhraseBtn.reset();
            this.leftPhraseBtn.enableClick();
            this.rightPhraseBtn.enableClick();
            this.leftSpriteNode.active = false;
            this.rightSpriteNode.active = false;
            this.setPhrasePair();
            if (this.gameStarted)
                GameState.current = GameState.play;
        }.bind(this), this.DataManager.questionInterval * 1000);
    },

    deductSpeed: function () {
        this.doorSpeed -= this.DataManager.speedDeduction;
        if (this.speedDeductionTimeout)
            clearTimeout(this.speedDeductionTimeout);
        this.speedDeductionTimeout = setTimeout(function () {
            this.doorSpeed = this.DataManager.doorSpeed;
        }.bind(this), this.DataManager.speedDeductionTime * 1000);
    },

    comboBonus: function () {
        this.curComboScore = (this.rightAnswerCount - 1) * 2
        this.comboScore += this.curComboScore;

        if (this.rightAnswerCount != 0 && this.rightAnswerCount % 5 == 0) {
            // setTimeout(function () {

            // }.bind(this), 300);
            this.doorSpeed = -455;
            setTimeout(function () {
                this.doorSpeed = this.DataManager.doorSpeed;
            }.bind(this), 200);
            this.AudioManager.playCombo();
            this.GamePlayInfo.playCombo();
        }
        else
            this.GamePlayInfo.playRight();



        // for (var i = 0; i < this.DataManager.comboBonusList.length; i++) {
        //     var comboBonusRow = this.DataManager.comboBonusList[i];
        //     if (this.rightAnswerCount == comboBonusRow[0]) {
        //         this.doorSpeed = comboBonusRow[1];
        //         setTimeout(function () {
        //             this.doorSpeed = this.DataManager.doorSpeed;
        //         }.bind(this), comboBonusRow[2] * 1000);
        //         this.AudioManager.playCombo();
        //         this.comboScore += parseFloat(comboBonusRow[3]);
        //         return true;
        //     }
        // }
        this.AudioManager.playRight();
        return false;
    },

    //called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timeCost += dt;
        this.GamePlayInfo.updateTime(this.timeCost);
        if (this.startQuitCount) {
            this.quitCount += dt;
            if (this.quitCount > 3) {
                this.QuitTipNode.active = false;
                this.startQuitCount = false;
            }
        }
    },

    uploadHighScore: function (gm) {
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;

        var url = gm.dbURL + "/uploadscore.php?uuid=" + gm.userId + "&highscore=" + gm.score;
        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    self.getRank(self);
                }
                else {
                    self.ConnectionManager.error(self.uploadHighScore, self);
                    cc.log("uploadFinished error!");
                }
            }
        }
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    getRank: function (gm) {
        if (gm.ConnectionManager == null)
            gm = gm.currentTarget.parent.getComponent("ConnectionManager").GameManager;
        gm.ConnectionManager.show();
        var self = gm;

        var url = gm.dbURL + "/queryindex.php?uuid=" + gm.userId;
        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    self.ConnectionManager.hide();
                    GameState.current = GameState.gameover;
                    self.GameStats.node.active = true;
                    //var score = self.rightCount * self.DataManager.scorePerQuestion + self.comboScore;
                    var questionCount = self.rightCount + self.wrongCount;
                    var rightPercent = 0;
                    if (questionCount != 0)
                        rightPercent = parseInt(self.rightCount / questionCount * 100) + "%";
                    self.GameStats.setStats(self.score, questionCount, self.rightCount, self.wrongCount, self.highestCombo, rightPercent, window.xmlhttp.responseText.split(',')[0], parseInt(self.timeCost) + "s");
                    if (self.userName === "未登录")
                        self.GameStats.hideRankRow();
                }
                else {
                    self.ConnectionManager.error(self.getRank, self);
                    cc.log("getRank error!!");
                }
            }
        }
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    setPlayedTrue: function () {
        cc.sys.localStorage.setItem("played", true);
    },

    setPlayedFalse: function () {
        cc.sys.localStorage.setItem("played", false);
    },
});


