import Utils from "../Utils";

export default class SlotButton extends PIXI.Sprite{
    constructor(objectData){
        super();
        

        this._touchEnabled = true;

        this.position.set(objectData.x, objectData.y)
        this.buttonMode = true;
        this.interactive = true;

        this.name = objectData.name;
        this.createGraphicRect(objectData);
        this.addListeners();
    }

    createGraphicRect(objectData){
        const rect = new PIXI.Graphics(); 
        rect.beginFill(0xff0000);
        rect.drawRect(-objectData.w/2, -objectData.h/2, objectData.w, objectData.h);
        rect.endFill();
        this.addChild(rect);
        

        let style = {"fontSize":35,"fill":"0x000000","fontFamily":"Arial","align":"center"};
        this.txtName = Utils.createText(style, objectData.name);
        this.addChild(this.txtName);
    }

    addListeners(){
        this.on('mouseover', this.onMouseOver.bind(this));
        this.on('mouseout', this.onMouseOut.bind(this));

        this.on('pointerdown', this.onPointerDown.bind(this));
        this.on('pointerup', this.onPointerUp.bind(this));

    }

    onMouseOver(){
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.HOVER;
        this.setState();
    }

    onMouseOut(){
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.NORMAL;
        this.setState();
    }

    onPointerDown(){
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.PRESSED;
        this.setState();

        event.stopPropagation ();
    }

    onPointerUp(){
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.NORMAL;
        this.setState();

        event.stopPropagation ();

        this.invokeCallback();
    }

    addTouchListener(callback){
        this._onTouchCallback = callback;
    }

    invokeCallback(){
        if(this._onTouchCallback !== undefined)
            this._onTouchCallback(this);
    }

    setState()
    {
        this.colorMatrix.reset();
    
        switch (this._buttonState)
        {
            case ButtonStates.HOVER :
                this.colorMatrix.brightness(1.5);
                break;

            case ButtonStates.NORMAL :
                this.colorMatrix.brightness(1);
                break;

            case ButtonStates.PRESSED :
                this.colorMatrix.brightness(0.5);
                break;

            case ButtonStates.DISABLED :
                this.colorMatrix.brightness(1);
                this.colorMatrix.greyscale(0.2);
                break;
        }
    }

    get colorMatrix()
    {
        if(this._colorMatrix === undefined)
        {
            this._colorMatrix = new PIXI.filters.ColorMatrixFilter();
            this.filters = this.filters || [];
            this.filters.push(this._colorMatrix);
        }

        return this._colorMatrix;
    }

    set touchEnabled(boolean){
        this._touchEnabled = boolean;

        this.buttonMode = boolean;
        this.interactive = boolean;

        if(this._touchEnabled)
        {
            this._buttonState = ButtonStates.NORMAL;
        }
        else
        {
            this._buttonState = ButtonStates.DISABLED;
        }

        this.setState();
    }

    get touchEnabled(){
        return this._touchEnabled;
    }
}

let ButtonStates = {

    HOVER : "00",
    NORMAL : "01",
    PRESSED : "02",
    DISABLED : "03"
};