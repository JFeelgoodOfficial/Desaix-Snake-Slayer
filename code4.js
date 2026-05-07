gdjs.victoryCode = {};
gdjs.victoryCode.localVariables = [];


gdjs.victoryCode.eventsList0 = function(runtimeScene) {

{

// On the very first frame, start the return timer.
let isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "ReturnToMenu");
}

}


{

// After 8 seconds on the victory screen, return to the main menu.
let isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 8, "ReturnToMenu");
if (isConditionTrue_0) {
gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "MainScene", true);
}

}


};

gdjs.victoryCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();


gdjs.victoryCode.eventsList0(runtimeScene);


return;

}

gdjs['victoryCode'] = gdjs.victoryCode;
