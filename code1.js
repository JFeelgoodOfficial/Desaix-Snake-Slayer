gdjs.storyCode = {};
gdjs.storyCode.localVariables = [];
gdjs.storyCode.GDHudTextTitleObjects1= [];
gdjs.storyCode.GDHudTextTitleObjects2= [];
gdjs.storyCode.GDHudTextTitleObjects3= [];
gdjs.storyCode.GDHudTextTitleObjects4= [];
gdjs.storyCode.GDHudTextTitleObjects5= [];
gdjs.storyCode.GDHudTexDeleteObjects1= [];
gdjs.storyCode.GDHudTexDeleteObjects2= [];
gdjs.storyCode.GDHudTexDeleteObjects3= [];
gdjs.storyCode.GDHudTexDeleteObjects4= [];
gdjs.storyCode.GDHudTexDeleteObjects5= [];
gdjs.storyCode.GDHudTextStartObjects1= [];
gdjs.storyCode.GDHudTextStartObjects2= [];
gdjs.storyCode.GDHudTextStartObjects3= [];
gdjs.storyCode.GDHudTextStartObjects4= [];
gdjs.storyCode.GDHudTextStartObjects5= [];
gdjs.storyCode.GDCursorObjects1= [];
gdjs.storyCode.GDCursorObjects2= [];
gdjs.storyCode.GDCursorObjects3= [];
gdjs.storyCode.GDCursorObjects4= [];
gdjs.storyCode.GDCursorObjects5= [];
gdjs.storyCode.GDDeleteButtonObjects1= [];
gdjs.storyCode.GDDeleteButtonObjects2= [];
gdjs.storyCode.GDDeleteButtonObjects3= [];
gdjs.storyCode.GDDeleteButtonObjects4= [];
gdjs.storyCode.GDDeleteButtonObjects5= [];
gdjs.storyCode.GDStartButtonObjects1= [];
gdjs.storyCode.GDStartButtonObjects2= [];
gdjs.storyCode.GDStartButtonObjects3= [];
gdjs.storyCode.GDStartButtonObjects4= [];
gdjs.storyCode.GDStartButtonObjects5= [];
gdjs.storyCode.GDControlsObjects1= [];
gdjs.storyCode.GDControlsObjects2= [];
gdjs.storyCode.GDControlsObjects3= [];
gdjs.storyCode.GDControlsObjects4= [];
gdjs.storyCode.GDControlsObjects5= [];
gdjs.storyCode.GDdesaixObjects1= [];
gdjs.storyCode.GDdesaixObjects2= [];
gdjs.storyCode.GDdesaixObjects3= [];
gdjs.storyCode.GDdesaixObjects4= [];
gdjs.storyCode.GDdesaixObjects5= [];
gdjs.storyCode.GDsnakeObjects1= [];
gdjs.storyCode.GDsnakeObjects2= [];
gdjs.storyCode.GDsnakeObjects3= [];
gdjs.storyCode.GDsnakeObjects4= [];
gdjs.storyCode.GDsnakeObjects5= [];
gdjs.storyCode.GDbkgrndObjects1= [];
gdjs.storyCode.GDbkgrndObjects2= [];
gdjs.storyCode.GDbkgrndObjects3= [];
gdjs.storyCode.GDbkgrndObjects4= [];
gdjs.storyCode.GDbkgrndObjects5= [];


gdjs.storyCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "coins"));
if (isConditionTrue_0) {
{gdjs.evtTools.storage.writeNumberInJSONFile("game_data", "coins", 0);
}{runtimeScene.getScene().getVariables().get("Coins").setNumber(0);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "coins");
if (isConditionTrue_0) {
{gdjs.evtTools.storage.readNumberFromJSONFile("game_data", "coins", runtimeScene, runtimeScene.getScene().getVariables().get("Coins"));
}}

}


};gdjs.storyCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("PlayerHp")) <= 0;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("PlayerHp").setNumber(100);
}{gdjs.evtTools.storage.writeNumberInJSONFile("game_data", "player_hp", 100);
}}

}


};gdjs.storyCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "player_hp"));
if (isConditionTrue_0) {
{gdjs.evtTools.storage.writeNumberInJSONFile("game_data", "player_hp", 100);
}{runtimeScene.getScene().getVariables().get("PlayerHp").setNumber(100);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "player_hp");
if (isConditionTrue_0) {
{gdjs.evtTools.storage.readNumberFromJSONFile("game_data", "player_hp", runtimeScene, runtimeScene.getScene().getVariables().get("PlayerHp"));
}
{ //Subevents
gdjs.storyCode.eventsList1(runtimeScene);} //End of subevents
}

}


};gdjs.storyCode.eventsList3 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "player_max_hp"));
if (isConditionTrue_0) {
{gdjs.evtTools.storage.writeNumberInJSONFile("game_data", "player_max_hp", 100);
}{runtimeScene.getScene().getVariables().get("PlayerMaxHp").setNumber(100);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "player_max_hp");
if (isConditionTrue_0) {
{gdjs.evtTools.storage.readNumberFromJSONFile("game_data", "player_max_hp", runtimeScene, runtimeScene.getScene().getVariables().get("PlayerMaxHp"));
}}

}


};gdjs.storyCode.eventsList4 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "total_kills"));
if (isConditionTrue_0) {
{gdjs.evtTools.storage.writeNumberInJSONFile("game_data", "total_kills", 0);
}{runtimeScene.getScene().getVariables().get("TotalKills").setNumber(0);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("game_data", "total_kills");
if (isConditionTrue_0) {
{gdjs.evtTools.storage.readNumberFromJSONFile("game_data", "total_kills", runtimeScene, runtimeScene.getScene().getVariables().get("TotalKills"));
}}

}


};gdjs.storyCode.eventsList5 = function(runtimeScene) {

{


gdjs.storyCode.eventsList0(runtimeScene);
}


{


gdjs.storyCode.eventsList2(runtimeScene);
}


{


gdjs.storyCode.eventsList3(runtimeScene);
}


{


gdjs.storyCode.eventsList4(runtimeScene);
}


};gdjs.storyCode.eventsList6 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{

{ //Subevents
gdjs.storyCode.eventsList5(runtimeScene);} //End of subevents
}

}


};gdjs.storyCode.eventsList7 = function(runtimeScene) {

};gdjs.storyCode.eventsList8 = function(runtimeScene) {

{


gdjs.storyCode.eventsList7(runtimeScene);
}


};gdjs.storyCode.eventsList9 = function(runtimeScene) {

{



}


{


gdjs.storyCode.eventsList6(runtimeScene);
}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 1, "", 0);
}{gdjs.evtTools.input.hideCursor(runtimeScene);
}{gdjs.evtTools.sound.playMusic(runtimeScene, "pallasade.mp3", false, 10, 1);
}
{ //Subevents
gdjs.storyCode.eventsList8(runtimeScene);} //End of subevents
}

}


};gdjs.storyCode.eventsList10 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Cursor"), gdjs.storyCode.GDCursorObjects1);
{for(var i = 0, len = gdjs.storyCode.GDCursorObjects1.length ;i < len;++i) {
    gdjs.storyCode.GDCursorObjects1[i].setPosition(gdjs.evtTools.input.getCursorX(runtimeScene, "", 0),gdjs.evtTools.input.getCursorY(runtimeScene, "", 0));
}
}}

}


};gdjs.storyCode.mapOfGDgdjs_9546storyCode_9546GDStartButtonObjects1Objects = Hashtable.newFrom({"StartButton": gdjs.storyCode.GDStartButtonObjects1});
gdjs.storyCode.eventsList11 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("StartButton"), gdjs.storyCode.GDStartButtonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.storyCode.mapOfGDgdjs_9546storyCode_9546GDStartButtonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(24135772);
}
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "tutorial", false);
}}

}


};gdjs.storyCode.eventsList12 = function(runtimeScene) {

{



}


{


gdjs.storyCode.eventsList9(runtimeScene);
}


{


gdjs.storyCode.eventsList10(runtimeScene);
}


{


gdjs.storyCode.eventsList11(runtimeScene);
}


};

gdjs.storyCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.storyCode.GDHudTextTitleObjects1.length = 0;
gdjs.storyCode.GDHudTextTitleObjects2.length = 0;
gdjs.storyCode.GDHudTextTitleObjects3.length = 0;
gdjs.storyCode.GDHudTextTitleObjects4.length = 0;
gdjs.storyCode.GDHudTextTitleObjects5.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects1.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects2.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects3.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects4.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects5.length = 0;
gdjs.storyCode.GDHudTextStartObjects1.length = 0;
gdjs.storyCode.GDHudTextStartObjects2.length = 0;
gdjs.storyCode.GDHudTextStartObjects3.length = 0;
gdjs.storyCode.GDHudTextStartObjects4.length = 0;
gdjs.storyCode.GDHudTextStartObjects5.length = 0;
gdjs.storyCode.GDCursorObjects1.length = 0;
gdjs.storyCode.GDCursorObjects2.length = 0;
gdjs.storyCode.GDCursorObjects3.length = 0;
gdjs.storyCode.GDCursorObjects4.length = 0;
gdjs.storyCode.GDCursorObjects5.length = 0;
gdjs.storyCode.GDDeleteButtonObjects1.length = 0;
gdjs.storyCode.GDDeleteButtonObjects2.length = 0;
gdjs.storyCode.GDDeleteButtonObjects3.length = 0;
gdjs.storyCode.GDDeleteButtonObjects4.length = 0;
gdjs.storyCode.GDDeleteButtonObjects5.length = 0;
gdjs.storyCode.GDStartButtonObjects1.length = 0;
gdjs.storyCode.GDStartButtonObjects2.length = 0;
gdjs.storyCode.GDStartButtonObjects3.length = 0;
gdjs.storyCode.GDStartButtonObjects4.length = 0;
gdjs.storyCode.GDStartButtonObjects5.length = 0;
gdjs.storyCode.GDControlsObjects1.length = 0;
gdjs.storyCode.GDControlsObjects2.length = 0;
gdjs.storyCode.GDControlsObjects3.length = 0;
gdjs.storyCode.GDControlsObjects4.length = 0;
gdjs.storyCode.GDControlsObjects5.length = 0;
gdjs.storyCode.GDdesaixObjects1.length = 0;
gdjs.storyCode.GDdesaixObjects2.length = 0;
gdjs.storyCode.GDdesaixObjects3.length = 0;
gdjs.storyCode.GDdesaixObjects4.length = 0;
gdjs.storyCode.GDdesaixObjects5.length = 0;
gdjs.storyCode.GDsnakeObjects1.length = 0;
gdjs.storyCode.GDsnakeObjects2.length = 0;
gdjs.storyCode.GDsnakeObjects3.length = 0;
gdjs.storyCode.GDsnakeObjects4.length = 0;
gdjs.storyCode.GDsnakeObjects5.length = 0;
gdjs.storyCode.GDbkgrndObjects1.length = 0;
gdjs.storyCode.GDbkgrndObjects2.length = 0;
gdjs.storyCode.GDbkgrndObjects3.length = 0;
gdjs.storyCode.GDbkgrndObjects4.length = 0;
gdjs.storyCode.GDbkgrndObjects5.length = 0;

gdjs.storyCode.eventsList12(runtimeScene);
gdjs.storyCode.GDHudTextTitleObjects1.length = 0;
gdjs.storyCode.GDHudTextTitleObjects2.length = 0;
gdjs.storyCode.GDHudTextTitleObjects3.length = 0;
gdjs.storyCode.GDHudTextTitleObjects4.length = 0;
gdjs.storyCode.GDHudTextTitleObjects5.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects1.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects2.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects3.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects4.length = 0;
gdjs.storyCode.GDHudTexDeleteObjects5.length = 0;
gdjs.storyCode.GDHudTextStartObjects1.length = 0;
gdjs.storyCode.GDHudTextStartObjects2.length = 0;
gdjs.storyCode.GDHudTextStartObjects3.length = 0;
gdjs.storyCode.GDHudTextStartObjects4.length = 0;
gdjs.storyCode.GDHudTextStartObjects5.length = 0;
gdjs.storyCode.GDCursorObjects1.length = 0;
gdjs.storyCode.GDCursorObjects2.length = 0;
gdjs.storyCode.GDCursorObjects3.length = 0;
gdjs.storyCode.GDCursorObjects4.length = 0;
gdjs.storyCode.GDCursorObjects5.length = 0;
gdjs.storyCode.GDDeleteButtonObjects1.length = 0;
gdjs.storyCode.GDDeleteButtonObjects2.length = 0;
gdjs.storyCode.GDDeleteButtonObjects3.length = 0;
gdjs.storyCode.GDDeleteButtonObjects4.length = 0;
gdjs.storyCode.GDDeleteButtonObjects5.length = 0;
gdjs.storyCode.GDStartButtonObjects1.length = 0;
gdjs.storyCode.GDStartButtonObjects2.length = 0;
gdjs.storyCode.GDStartButtonObjects3.length = 0;
gdjs.storyCode.GDStartButtonObjects4.length = 0;
gdjs.storyCode.GDStartButtonObjects5.length = 0;
gdjs.storyCode.GDControlsObjects1.length = 0;
gdjs.storyCode.GDControlsObjects2.length = 0;
gdjs.storyCode.GDControlsObjects3.length = 0;
gdjs.storyCode.GDControlsObjects4.length = 0;
gdjs.storyCode.GDControlsObjects5.length = 0;
gdjs.storyCode.GDdesaixObjects1.length = 0;
gdjs.storyCode.GDdesaixObjects2.length = 0;
gdjs.storyCode.GDdesaixObjects3.length = 0;
gdjs.storyCode.GDdesaixObjects4.length = 0;
gdjs.storyCode.GDdesaixObjects5.length = 0;
gdjs.storyCode.GDsnakeObjects1.length = 0;
gdjs.storyCode.GDsnakeObjects2.length = 0;
gdjs.storyCode.GDsnakeObjects3.length = 0;
gdjs.storyCode.GDsnakeObjects4.length = 0;
gdjs.storyCode.GDsnakeObjects5.length = 0;
gdjs.storyCode.GDbkgrndObjects1.length = 0;
gdjs.storyCode.GDbkgrndObjects2.length = 0;
gdjs.storyCode.GDbkgrndObjects3.length = 0;
gdjs.storyCode.GDbkgrndObjects4.length = 0;
gdjs.storyCode.GDbkgrndObjects5.length = 0;


return;

}

gdjs['storyCode'] = gdjs.storyCode;
