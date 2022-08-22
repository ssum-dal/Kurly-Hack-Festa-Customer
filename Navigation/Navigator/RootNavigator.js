import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import OrderHistory from "../Screens/OrderHistory/OrderHistory";
import DeliveryCompleted from "../Screens/DeliveryCompleted/DeliveryCompleted";

const RootStack = createStackNavigator();

export default function RootNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="OrderHistory"
                component={OrderHistory}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name="DeliveryCompleted"
                component={DeliveryCompleted}
                options={{headerShown: false}}
            />
        </RootStack.Navigator>
    )
}