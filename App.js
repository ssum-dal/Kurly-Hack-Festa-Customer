import React, {useEffect} from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./Navigation/Navigator/RootNavigator";
import { requestUserPermission, NotificationListener } from "./src/utils/pushnotification_helper";

const App = () => {

	useEffect(()=> {
		requestUserPermission();
		NotificationListener();
	}, []);

	return (
	    <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
  	)
}

export default App;