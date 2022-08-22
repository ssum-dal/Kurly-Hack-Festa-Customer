import React from "react";
import {createStackNavigator, CardStyleInterpolators} from "@react-navigation/stack";
import OrderHistoryPresenter from "./OrderHistoryPresenter";
import DetailsPresenter from "./DetailsPresenter";
import WriteQuestionPresenter from "./WriteQuestionPresenter";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen
                name="OrderHistoryPresenter"
                component={OrderHistoryPresenter}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetailsPresenter"
                children={({route}) => (
                    <DetailsPresenter
                        orderNum={route.params.orderNum}
                        state={route.params.state}
                    />
                )}
                options={{headerShown: false, gestureEnabled: true}}
            />
            <Stack.Screen
                name="WriteQuestionPresenter"
                component={WriteQuestionPresenter}
                options={{headerShown: false, gestureEnabled: true}}
            />
        </Stack.Navigator>
    );
};