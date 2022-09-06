import * as PIXI from "pixi.js";
import LoadingScreen from "./LoadingScreen";
import SlotMachine from "./SlotMachine/SlotMachine";
import Utils from "./Utils";


let config  = {width: Utils.screenWidth, height: Utils.screenHeight,transparent:true, antialias:true}


let app,loadingScreen,wrapper;

// wait for DOM before creating application
window.addEventListener('load', function() {
    //Create a Pixi Application
    app = new PIXI.Application(config);

    console.log("start")
    
    loadingScreen = new LoadingScreen(onAssetsLoaded);
    app.stage.addChild(loadingScreen);
    //Add the canvas that Pixi automatically created for you to the HTML document
    wrapper = document.createElement('div');
    wrapper.setAttribute("style", "width:" + Utils.screenWidth + "px; height:" + Utils.screenHeight + "px; position: fixed; left:50%;top:0; overflow: hidden; transform-origin: left top;");
    wrapper.appendChild(app.view);
    document.body.appendChild(wrapper);

    onWindowResize();
    window.addEventListener('resize', onWindowResize.bind(this));
    
    }
)

function onAssetsLoaded(){
    app.stage.removeChild(loadingScreen);
    app.stage.addChild(new SlotMachine());
}

function onWindowResize(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    let scale = Math.min(width /  Utils.screenWidth, height /  Utils.screenHeight);
    wrapper.style.transform = 'scale(' + scale + ') translate(-50%, 0px)';
}