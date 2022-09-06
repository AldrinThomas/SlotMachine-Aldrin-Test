import Utils from "../Utils";
import SlotButton from "./SlotButton";
import SlotHud from "./SlotHud";
import SlotReelManager from "./SlotReelManger";
import SlotSpinGenerator from "./SlotSpinGenerator";



export default class SlotMachine extends PIXI.Container{
    constructor(){
        super();
    
        this._bg = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/Bg.jpg"].texture);
        this._bg.scale.set(2);
        this._bg.anchor.set(0.5,0.5)
        this._bg.position.set(Utils.screenWidth/2,Utils.screenHeight/2)
        this.addChild(this._bg);

        this.createElements();
        document.addEventListener("onSpinStarted",this.onSpinClicked.bind(this));
    }

    createElements(){
        this._spinGenerator = new SlotSpinGenerator();
        let initReels = this._spinGenerator.createSpin();

        this._slotReelManager = new SlotReelManager(initReels);
        this.addChild(this._slotReelManager);

        this._slotHud = new SlotHud();
        this.addChild(this._slotHud);
    }

    onSpinClicked(){
        this._slotReelManager.spin(this._spinGenerator.createSpin())
    }
}