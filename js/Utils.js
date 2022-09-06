let Utils ={
    screenWidth:1920,
    screenHeight:1080,
    NUM_ROWS:1,
    NUM_REELS:4,
    SYMBOL_WIDTH:165,
    SYMBOL_HEIGHT:165,
    REEL_STARTX:670,
    REEL_STARTY:400
}

Utils.createText = (style, value)=>{
    let text = new PIXI.Text(value, style);
    text.anchor.set(0.5, 0.5);
    text.name = value;
    return text;
}
export default Utils;