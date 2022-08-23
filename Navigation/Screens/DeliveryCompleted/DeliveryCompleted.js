import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DeliveryCompletedPresenter from "./DeliveryCompletedPresenter";

const Stack = createStackNavigator();

export default ({route}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DeliveryCompletedPresenter"
                children={() => (
                    <DeliveryCompletedPresenter
                        orderNum={route.params.orderNum}
                        temperature={route.params.temperature}
                    />
                )}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};