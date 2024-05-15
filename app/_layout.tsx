
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import UserDetailsScreen from "./UserDetailsScreen";
import Lobby from "./Lobby";
import GameDetailsScreen from "./GameDetailsScreen";
import MapConfigurationScreen from "./MapConfigurationScreen";

const Stack = createStackNavigator();

export default function Navigation() {
  return (

      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="GameDetailsScreen" component={GameDetailsScreen} />
        <Stack.Screen name="MapConfigurationScreen" component={MapConfigurationScreen} />
      
      </Stack.Navigator>

  );
}
