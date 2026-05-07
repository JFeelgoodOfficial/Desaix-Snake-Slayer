gdjs.MainSceneCode = {};
gdjs.MainSceneCode.localVariables = [];
gdjs.MainSceneCode.GDHudTextTitleObjects1= [];
gdjs.MainSceneCode.GDHudTextTitleObjects2= [];
gdjs.MainSceneCode.GDHudTextTitleObjects3= [];
gdjs.MainSceneCode.GDHudTextTitleObjects4= [];
gdjs.MainSceneCode.GDHudTextTitleObjects5= [];
gdjs.MainSceneCode.GDHudTexDeleteObjects1= [];
gdjs.MainSceneCode.GDHudTexDeleteObjects2= [];
gdjs.MainSceneCode.GDHudTexDeleteObjects3= [];
gdjs.MainSceneCode.GDHudTexDeleteObjects4= [];
gdjs.MainSceneCode.GDHudTexDeleteObjects5= [];
gdjs.MainSceneCode.GDHudTextStartObjects1= [];
gdjs.MainSceneCode.GDHudTextStartObjects2= [];
gdjs.MainSceneCode.GDHudTextStartObjects3= [];
gdjs.MainSceneCode.GDHudTextStartObjects4= [];
gdjs.MainSceneCode.GDHudTextStartObjects5= [];
gdjs.MainSceneCode.GDCursorObjects1= [];
gdjs.MainSceneCode.GDCursorObjects2= [];
gdjs.MainSceneCode.GDCursorObjects3= [];
gdjs.MainSceneCode.GDCursorObjects4= [];
gdjs.MainSceneCode.GDCursorObjects5= [];
gdjs.MainSceneCode.GDDeleteButtonObjects1= [];
gdjs.MainSceneCode.GDDeleteButtonObjects2= [];
gdjs.MainSceneCode.GDDeleteButtonObjects3= [];
gdjs.MainSceneCode.GDDeleteButtonObjects4= [];
gdjs.MainSceneCode.GDDeleteButtonObjects5= [];
gdjs.MainSceneCode.GDStartButtonObjects1= [];
gdjs.MainSceneCode.GDStartButtonObjects2= [];
gdjs.MainSceneCode.GDStartButtonObjects3= [];
gdjs.MainSceneCode.GDStartButtonObjects4= [];
gdjs.MainSceneCode.GDStartButtonObjects5= [];
gdjs.MainSceneCode.GDControlsObjects1= [];
gdjs.MainSceneCode.GDControlsObjects2= [];
gdjs.MainSceneCode.GDControlsObjects3= [];
gdjs.MainSceneCode.GDControlsObjects4= [];
gdjs.MainSceneCode.GDControlsObjects5= [];
gdjs.MainSceneCode.GDdesaixObjects1= [];
gdjs.MainSceneCode.GDdesaixObjects2= [];
gdjs.MainSceneCode.GDdesaixObjects3= [];
gdjs.MainSceneCode.GDdesaixObjects4= [];
gdjs.MainSceneCode.GDdesaixObjects5= [];
gdjs.MainSceneCode.GDbkgrndObjects1= [];
gdjs.MainSceneCode.GDbkgrndObjects2= [];
gdjs.MainSceneCode.GDbkgrndObjects3= [];
gdjs.MainSceneCode.GDbkgrndObjects4= [];
gdjs.MainSceneCode.GDbkgrndObjects5= [];


gdjs.MainSceneCode.eventsList0 = function(runtimeScene) {

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


};gdjs.MainSceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("PlayerHp")) <= 0;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("PlayerHp").setNumber(100);
}{gdjs.evtTools.storage.writeNumberInJSONFile("game_data", "player_hp", 100);
}}

}


};gdjs.MainSceneCode.eventsList2 = function(runtimeScene) {

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
gdjs.MainSceneCode.eventsList1(runtimeScene);} //End of subevents
}

}


};gdjs.MainSceneCode.eventsList3 = function(runtimeScene) {

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


};gdjs.MainSceneCode.eventsList4 = function(runtimeScene) {

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


};gdjs.MainSceneCode.eventsList5 = function(runtimeScene) {

{


gdjs.MainSceneCode.eventsList0(runtimeScene);
}


{


gdjs.MainSceneCode.eventsList2(runtimeScene);
}


{


gdjs.MainSceneCode.eventsList3(runtimeScene);
}


{


gdjs.MainSceneCode.eventsList4(runtimeScene);
}


};gdjs.MainSceneCode.eventsList6 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{

{ //Subevents
gdjs.MainSceneCode.eventsList5(runtimeScene);} //End of subevents
}

}


};gdjs.MainSceneCode.eventsList7 = function(runtimeScene) {

};gdjs.MainSceneCode.eventsList8 = function(runtimeScene) {

{


gdjs.MainSceneCode.eventsList7(runtimeScene);
}


};gdjs.MainSceneCode.eventsList9 = function(runtimeScene) {

{



}


{


gdjs.MainSceneCode.eventsList6(runtimeScene);
}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 1, "", 0);
}{gdjs.evtTools.input.hideCursor(runtimeScene);
}
{ //Subevents
gdjs.MainSceneCode.eventsList8(runtimeScene);} //End of subevents
}

}


};gdjs.MainSceneCode.eventsList10 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Cursor"), gdjs.MainSceneCode.GDCursorObjects1);
{for(var i = 0, len = gdjs.MainSceneCode.GDCursorObjects1.length ;i < len;++i) {
    gdjs.MainSceneCode.GDCursorObjects1[i].setPosition(gdjs.evtTools.input.getCursorX(runtimeScene, "", 0),gdjs.evtTools.input.getCursorY(runtimeScene, "", 0));
}
}}

}


};gdjs.MainSceneCode.mapOfGDgdjs_9546MainSceneCode_9546GDStartButtonObjects1Objects = Hashtable.newFrom({"StartButton": gdjs.MainSceneCode.GDStartButtonObjects1});
gdjs.MainSceneCode.eventsList11 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("StartButton"), gdjs.MainSceneCode.GDStartButtonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.MainSceneCode.mapOfGDgdjs_9546MainSceneCode_9546GDStartButtonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(24106468);
}
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "story", false);
}}

}


};gdjs.MainSceneCode.eventsList12 = function(runtimeScene) {

{



}


{


gdjs.MainSceneCode.eventsList9(runtimeScene);
}


{


gdjs.MainSceneCode.eventsList10(runtimeScene);
}


{


gdjs.MainSceneCode.eventsList11(runtimeScene);
}


};

gdjs.MainSceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.MainSceneCode.GDHudTextTitleObjects1.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects2.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects3.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects4.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects5.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects1.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects2.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects3.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects4.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects5.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects1.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects2.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects3.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects4.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects5.length = 0;
gdjs.MainSceneCode.GDCursorObjects1.length = 0;
gdjs.MainSceneCode.GDCursorObjects2.length = 0;
gdjs.MainSceneCode.GDCursorObjects3.length = 0;
gdjs.MainSceneCode.GDCursorObjects4.length = 0;
gdjs.MainSceneCode.GDCursorObjects5.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects1.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects2.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects3.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects4.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects5.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects1.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects2.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects3.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects4.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects5.length = 0;
gdjs.MainSceneCode.GDControlsObjects1.length = 0;
gdjs.MainSceneCode.GDControlsObjects2.length = 0;
gdjs.MainSceneCode.GDControlsObjects3.length = 0;
gdjs.MainSceneCode.GDControlsObjects4.length = 0;
gdjs.MainSceneCode.GDControlsObjects5.length = 0;
gdjs.MainSceneCode.GDdesaixObjects1.length = 0;
gdjs.MainSceneCode.GDdesaixObjects2.length = 0;
gdjs.MainSceneCode.GDdesaixObjects3.length = 0;
gdjs.MainSceneCode.GDdesaixObjects4.length = 0;
gdjs.MainSceneCode.GDdesaixObjects5.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects1.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects2.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects3.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects4.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects5.length = 0;

gdjs.MainSceneCode.eventsList12(runtimeScene);
gdjs.MainSceneCode.GDHudTextTitleObjects1.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects2.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects3.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects4.length = 0;
gdjs.MainSceneCode.GDHudTextTitleObjects5.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects1.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects2.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects3.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects4.length = 0;
gdjs.MainSceneCode.GDHudTexDeleteObjects5.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects1.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects2.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects3.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects4.length = 0;
gdjs.MainSceneCode.GDHudTextStartObjects5.length = 0;
gdjs.MainSceneCode.GDCursorObjects1.length = 0;
gdjs.MainSceneCode.GDCursorObjects2.length = 0;
gdjs.MainSceneCode.GDCursorObjects3.length = 0;
gdjs.MainSceneCode.GDCursorObjects4.length = 0;
gdjs.MainSceneCode.GDCursorObjects5.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects1.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects2.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects3.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects4.length = 0;
gdjs.MainSceneCode.GDDeleteButtonObjects5.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects1.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects2.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects3.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects4.length = 0;
gdjs.MainSceneCode.GDStartButtonObjects5.length = 0;
gdjs.MainSceneCode.GDControlsObjects1.length = 0;
gdjs.MainSceneCode.GDControlsObjects2.length = 0;
gdjs.MainSceneCode.GDControlsObjects3.length = 0;
gdjs.MainSceneCode.GDControlsObjects4.length = 0;
gdjs.MainSceneCode.GDControlsObjects5.length = 0;
gdjs.MainSceneCode.GDdesaixObjects1.length = 0;
gdjs.MainSceneCode.GDdesaixObjects2.length = 0;
gdjs.MainSceneCode.GDdesaixObjects3.length = 0;
gdjs.MainSceneCode.GDdesaixObjects4.length = 0;
gdjs.MainSceneCode.GDdesaixObjects5.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects1.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects2.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects3.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects4.length = 0;
gdjs.MainSceneCode.GDbkgrndObjects5.length = 0;


return;

}

gdjs['MainSceneCode'] = gdjs.MainSceneCode;
