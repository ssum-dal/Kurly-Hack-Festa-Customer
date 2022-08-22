import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DeliveryCompletedPresenter from "./DeliveryCompletedPresenter";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DeliveryCompletedPresenter"
                component={DeliveryCompletedPresenter}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};