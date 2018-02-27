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
    wordShadowList: null,
    wordList: null,
    // use this for initialization
    init: function () {
        this.wordList = [];
        this.wordShadowList = [];
        for (var i = 0; i < this.node.children.length; i++) {
            var wordShadow = this.node.children[i].getComponent(cc.Label);
            this.wordShadowList.push(wordShadow);
            this.wordList.push(wordShadow.node.children[0].getComponent(cc.Label));
        }
    },

    setString: function (newStr, highLightIndeices) {
        for (var i = 0; i < this.wordShadowList.length; i++) {
            var wordShadow = this.wordShadowList[i];
            var word = this.wordList[i];
            if (i >= newStr.length)
                wordShadow.node.active = false;
            else
            {
                wordShadow.node.active = true;
                wordShadow.string = newStr.charAt(i);
                word.string = newStr.charAt(i);

                if (highLightIndeices.indexOf(i + 1) != -1)
                    word.node.color = cc.Color.RED;
                else
                    word.node.color = cc.Color.WHITE;
            }
        }
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
