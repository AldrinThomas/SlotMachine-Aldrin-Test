import Utils from "../Utils";
import SlotButton from "./SlotButton";
import gsap from "gsap";

export default class SlotHud extends PIXI.Container{
    constructor(){
        super();
        this.betValueList = [10,20,50];
        this._totalBalance = 10000;
        this._currentBetIndex = 0;
        this.createElements();
        document.addEventListener("onAllAnimComplete",this.onAllAnimComplete.bind(this))
    }

    createElements(){

        this._spinButton = new SlotButton({x:900,y:700,w:100,h:100,name:"Spin"}); 
        this._spinButton.addTouchListener(this.onButtonClicked.bind(this));
        this.addChild(this._spinButton);

        this._increaseBetButton = new SlotButton({x:700,y:700,w:50,h:100,name:"-"}); 
        this._increaseBetButton.addTouchListener(this.onButtonClicked.bind(this));
        this.addChild(this._increaseBetButton);

        this._decreaseBetButton = new SlotButton({x:1100,y:700,w:50,h:100,name:"+"}); 
        this._decreaseBetButton.addTouchListener(this.onButtonClicked.bind(this));
        this.addChild(this._decreaseBetButton);

        let style = {"fontSize":45,"fill":"0xffffff","fontFamily":"Arial","align":"center"};
        this._txtBalanceLabel = Utils.createText(style, "Balance");
        this._txtBalanceLabel.position.set(500,900);
        this.addChild(this._txtBalanceLabel);

        this._txtBetAmountLabel = Utils.createText(style, "BetAmount");
        this._txtBetAmountLabel.position.set(900,900);
        this.addChild(this._txtBetAmountLabel);

        this._txtTotalWinLabel = Utils.createText(style, "Total Win");
        this._txtTotalWinLabel.position.set(1300,900);
        this.addChild(this._txtTotalWinLabel);

        this._txtBalanceValue = Utils.createText(style, this._totalBalance);
        this._txtBalanceValue.position.set(500,1000);
        this.addChild(this._txtBalanceValue);

        this._txtBetAmountValue = Utils.createText(style, "0");
        this._txtBetAmountValue.position.set(900,1000);
        this.addChild(this._txtBetAmountValue);

        this._txtTotalWinValue = Utils.createText(style, "0");
        this._txtTotalWinValue.position.set(1300,1000);
        this.addChild(this._txtTotalWinValue);

        this.updateBetAmount();

    }

    onButtonClicked(target){
        switch(target.name){
            case "Spin":
                if(this._totalBalance - this.betValueList[this._currentBetIndex] <= 0)
                    return;
                this.deductBalance();
                this._spinButton.touchEnabled = false;
                this._increaseBetButton.touchEnabled = false;
                this._decreaseBetButton.touchEnabled = false;
                this._txtTotalWinValue.text = 0;
                document.dispatchEvent(new CustomEvent("onSpinStarted"));
                break;
            case "+":
                if(this._currentBetIndex <= this.betValueList.length - 1){
                    this._currentBetIndex++;
                }
                this.updateBetAmount();
                break;
            case "-":
                if(this._currentBetIndex >= 0 ){
                    this._currentBetIndex--;
                }
                this.updateBetAmount();
                break;
        }

    }

    onAllAnimComplete(result){
        this._spinButton.touchEnabled = true;
        this._increaseBetButton.touchEnabled = true;
        this._decreaseBetButton.touchEnabled = true;
        this.updateWin(result.detail);
    }
    deductBalance(){
        this._totalBalance -= this.betValueList[this._currentBetIndex];
        this._txtBalanceValue.text = this._totalBalance;
    }

    updateWin(win){
        this._totalBalance += win;
        this._txtBalanceValue.text = this._totalBalance;
        let coin = {value:0};
        gsap.to(coin, {value:win,duration: 0.5,
            onUpdate:()=>{
                this._txtTotalWinValue.text = Math.floor(coin.value);
            }},);
    }

    updateBetAmount(){
        this._txtBetAmountValue.text = this.betValueList[this._currentBetIndex];
    }
}