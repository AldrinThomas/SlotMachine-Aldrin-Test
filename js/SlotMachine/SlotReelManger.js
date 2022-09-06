import Utils from "../Utils";
import SlotReel from "./SlotReel";

export default class SlotReelManager extends PIXI.Container{
    constructor(initReel){
        super();
        
        this._reels = [];
        this._totalWInSymbolCount = 0;
        this.createReels(initReel);
        document.addEventListener("onSpinComplete",this.onSpinComplete.bind(this));
        document.addEventListener("onSymbolAnimComplete",this.onSymbolAnimComplete.bind(this));
    }

    createReels(initReel){
        
        for(let reel = 0;reel < Utils.NUM_REELS;reel++){
            this._reels.push(new SlotReel(Utils.REEL_STARTX + (reel * Utils.SYMBOL_WIDTH),initReel.results.symbolIDs[reel], reel));
            this.addChild(this._reels[reel]);
        }

        const mask = new PIXI.Graphics()
        mask.beginFill(0x000000)
        mask.drawRect(Utils.REEL_STARTX - (Utils.SYMBOL_WIDTH/2), Utils.REEL_STARTY-(Utils.SYMBOL_HEIGHT/2), Utils.SYMBOL_WIDTH*4, Utils.SYMBOL_HEIGHT);
        this.mask = mask;
    }

    spin(finalSymbols){
        this._result = finalSymbols.results;
        for(let reel = 0;reel < Utils.NUM_REELS;reel++){
            this._reels[reel].spin(finalSymbols.results.symbolIDs[reel]);
        }
    }

    onSpinComplete(){
        this._totalWInSymbolCount = 0;
        this._totalAnimPlayed = 0;
        if(this._result.win > 0){
            for(let reel = 0;reel < Utils.NUM_REELS;reel++){
                if(this._result.symbolIDs[0] == this._result.symbolIDs[reel] ){
                    this._totalWInSymbolCount++;
                    this._reels[reel].showWinAnimation();
                }
            }
        }
        else
            document.dispatchEvent(new CustomEvent("onAllAnimComplete",{detail:this._result.win}));
    }

    onSymbolAnimComplete(){
        this._totalAnimPlayed++;
        if(this._totalAnimPlayed == this._totalAnimPlayed){
            document.dispatchEvent(new CustomEvent("onAllAnimComplete",{detail:this._result.win}));
        }
    }
}