require("../libs/pixi-spine")

export default class SlotSymbol extends PIXI.spine.Spine{
    constructor(name){
        super(PIXI.Loader.shared.resources["assets/symbols/symbol_0" + name + ".json"].spineData)
        
    }
}