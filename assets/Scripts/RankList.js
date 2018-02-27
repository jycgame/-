cc.Class({
    extends: cc.Component,

    properties: {
        ranks:
        {
            default: [],
            type: [cc.Node],
        },
        littleTop1: 24,
        littleTop2: 30,
        bigTop1: 42,
        bigTop2: 60,
    },

    setItem: function (index, rank, lastRank, name, score) {
        var rankRow = this.ranks[index].getComponent("RankRow");

        for (var i = 0; i < rankRow.rank.children.length; i++) {
            if (rank > 999)
            {
                rankRow.rank.children[i].getComponent(cc.Label).string = "999+";
            }
            else
            {
                if (rankRow.rank.children[i].getComponent(cc.Label) != null)
                {
                    rankRow.rank.children[i].getComponent(cc.Label).string = rank;
                }
            }
        }

        var differLabelParent = rankRow.difference.children[1];
        var differValue = parseInt(lastRank) - parseInt(rank);
        if (differValue === 0 || parseInt(lastRank) === 0) {
            rankRow.difference.children[0].getComponent(cc.Sprite).spriteFrame = rankRow.evenSprite;
            if (index != 5)
            {
                rankRow.difference.getComponent(cc.Layout).paddingTop = this.bigTop1;
            }
            else
            {
                rankRow.difference.getComponent(cc.Layout).paddingTop = this.bigTop2;
            }
            differLabelParent.active = false;
        }
        else if (differValue > 0) {
            rankRow.difference.children[0].getComponent(cc.Sprite).spriteFrame = rankRow.upSprite;
            for (var i = 0; i < differLabelParent.children.length; i++) {
                differLabelParent.children[i].getComponent(cc.Label).string = differValue;
            }
            if (index != 5) {
                rankRow.difference.getComponent(cc.Layout).paddingTop = this.littleTop1;
            }
            else {
                rankRow.difference.getComponent(cc.Layout).paddingTop = this.littleTop2;
            }
            differLabelParent.active = true;
        }
        else if (differValue < 0) {
            rankRow.difference.children[0].getComponent(cc.Sprite).spriteFrame = rankRow.downSprite;
            for (var i = 0; i < differLabelParent.children.length; i++) {
                differLabelParent.children[i].getComponent(cc.Label).string = Math.abs(differValue);
            }
            if (index != 5) {
                rankRow.difference.getComponent(cc.Layout).paddingTop = this.littleTop1;
            }
            else {
                rankRow.difference.getComponent(cc.Layout).paddingTop = this.littleTop2;
            }
            differLabelParent.active = true;
        }

        for (var i = 0; i < rankRow.userName.children.length; i++) {
            var label = rankRow.userName.children[i].getComponent(cc.Label);
            label.string = name;
        }

        for (var i = 0; i < rankRow.userScore.children.length; i++) {
            rankRow.userScore.children[i].getComponent(cc.Label).string = score;
        }
    },
});
