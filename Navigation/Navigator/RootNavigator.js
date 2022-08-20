import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import OrderHistory from "../Screens/OrderHistory/OrderHistory";

const RootStack = createStackNavigator();

export default function RootNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="OrderHistory"
                component={OrderHistory}
                options={{headerShown: false}}
            />
        </RootStack.Navigator>
    )
}