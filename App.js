import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./Navigation/Navigator/RootNavigator";

const App = () => {

	return (
	    <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
  	)
}

export default App;