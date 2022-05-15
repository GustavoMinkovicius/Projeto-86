import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="StackNavigator" component={StackNavigator}/>
            <Drawer.Screen name="Tela Inicial" component={TabNavigator}/>
            <Drawer.Screen name="Perfi1" component={Profile}/>
        </Drawer.Navigator>
    );
};
export default DrawerNavigator;