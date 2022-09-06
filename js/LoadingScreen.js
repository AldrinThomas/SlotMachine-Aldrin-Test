import Utils from "./Utils";

export default class LoadingScreen extends PIXI.Container{
    constructor(callback){
        super();
        let obj = new PIXI.Graphics();
        obj.beginFill(0xffffff);
        obj.drawRect(0, 0, Utils.screenWidth, Utils.screenHeight);
        this.addChild(obj);

        let style = {"fontSize":35,"fill":"0x000000","fontFamily":"Arial","align":"center"};
        this.txtName = new PIXI.Text(name, style);
        this.txtName.anchor.set(0.5, 0.5);
        this.txtName.position.set(Utils.screenWidth/2, Utils.screenHeight/2)
        this.txtName.text = "Loading";
        this.addChild(this.txtName);

        this._callback = callback;

        this.startLoading();
    }

    startLoading(){
        PIXI.Loader.shared.add("Config","assets/config.json");
        PIXI.Loader.shared.load((loader, resources) => {
            console.log("config loaded");
            let resLoader = new PIXI.Loader();
            loader.add(resources['Config'].data.resList);
            loader.load((loader, resources)=>{
                console.log("loaded")
                this._callback();
            });
        });
    }
}