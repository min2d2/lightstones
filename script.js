

data.set_effects.forEach(set_effect => {
    set_effect.stone_effects = []
    set_effect.including_stone_effects = []

    set_effect.light_stones.forEach(light_stone => {
        stone_effect = data.stone_effects.find(ef => ef.name == light_stone)
        // ここのstone_effectは、4属性値を追加すると色分けに便利かもしれない。
        set_effect.stone_effects.push(stone_effect)
        const found = set_effect.including_stone_effects.find(ef => ef.effect_type == stone_effect.effect_type)
        if (found) {
            found.amount = Number(found.amount) + Number(stone_effect.amount)
        } else {
            // 参照渡しさせないため展開
            set_effect.including_stone_effects.push({ ...stone_effect })
        }
    })

    set_effect.effects.forEach(effect => {
        const found = set_effect.including_stone_effects.find(ef => ef.effect_type == effect.effect_type)
        if (found) {
            found.amount = Number(found.amount) + Number(effect.amount)
        } else {
            // 参照渡しさせないため展開
            set_effect.including_stone_effects.push({ ...effect })
        }
    })

})

const app = new Vue({
    el: '#app',
    data: {
        ...data,
        stoneType: ["火", "地", "風", "森", "五色"],
        showTri: false
    },
    computed: {
        hiddenStoneType(){
            return ["火", "地", "風", "森", "五色"].filter(i => this.stoneType.indexOf(i) == -1)
        },
        filteredSetEffects() {
            return this.set_effects.filter(e => {
                if(e.light_stones.length==3 && !this.showTri){
                    return false
                }
                if(e.light_stones.some(stoneName=>{
                    return this.hiddenStoneType.some(ty=>stoneName.match(ty))
                })){
                    return false
                }


                return true
            })
        }
    },
    methods: {

    },
    created() {
    }
})
