import Utils from "../Utils";
import SlotSymbol from "./SlotSymbol";
import gsap from "gsap";
import { TweenMax } from "gsap/gsap-core";
import CustomEase from "gsap/CustomEase";

export default class SlotReel extends PIXI.Container{
    constructor(startX, initValue, reelIndex){
        super();
        this._startX = startX;
        this._initValue = initValue;
        this._reelIndex = reelIndex;
        this._reelAssets = [];
        this.createSymbols();
    }

    createSymbols(){
             
        for(let row = 0;row < (this._reelIndex + 1) * 4;row++){
            let name = Math.floor(Math.random() * 5);
            let symbol = new SlotSymbol(name);
            symbol.name = name;
            this.addChild(symbol);
            this._reelAssets.push(symbol);
        }

        this.positionAtIndex();

    }

    spin(name){

        this.setFinalSymbolsAtPosition(name);

        let currentY = {y:0};
        let prevY = 0;
        let dist = (this._reelAssets[this._reelAssets.length-1].position.y) - this._reelAssets[0].position.y;
        
        gsap.to(currentY, { y:-dist,duration:((this._reelIndex + 1)*0.7), ease: CustomEase.create("custom", "M0,0 C0.021,0.033 0.13,0.018 0.17,0.034 0.271,0.074 0.335,0.109 0.4,0.148 0.622,0.28 0.707,0.361 0.8,0.448 0.828,0.474 0.931,0.599 0.974,0.754 0.997,0.84 0.92,1 1,1 "),
            onUpdate:()=>{
                let diff = (currentY.y -prevY);
                for (let i = 0; i < this._reelAssets.length; i++){
                    this._reelAssets[i].y +=diff;
                }
                prevY = currentY.y;
            },
            onComplete:()=>{
                this._reelAssets.unshift(this._reelAssets.pop());
                this.positionAtIndex();
                this.onSpinComplete()
            } 
        },
        );
    }

    positionAtIndex()
    {
        for (let i = 0; i < this._reelAssets.length; i++){
            this._reelAssets[i].position.x = this._startX;
            this._reelAssets[i].position.y = Utils.REEL_STARTY - (i  * Utils.SYMBOL_HEIGHT );
        }       
    }

    setFinalSymbolsAtPosition(name){
        let symbol = new SlotSymbol(name);
        this.addChild(symbol);
        this._reelAssets[this._reelAssets.length - 1] = symbol;
        this.positionAtIndex();
    }

    onSpinComplete(){
        if(this._reelIndex == Utils.NUM_REELS -1){
            document.dispatchEvent(new CustomEvent("onSpinComplete"));
        }
    }

    showWinAnimation(){
        this._reelAssets[0].state.setAnimation(0, 'win', false);
        this._reelAssets[0].state.addListener({"complete":()=>{
            this._reelAssets[0].state.clearListeners();
            document.dispatchEvent(new CustomEvent("onSymbolAnimComplete"));
        }})
    }
}