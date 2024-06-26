import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import UserDetailsScreen from "./UserDetailsScreen";
import GameDetailsScreen from "./GameDetailsScreen";

const Stack = createStackNavigator();

export default function Index() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
      <Stack.Screen name="GameDetailsScreen" component={GameDetailsScreen} />
    </Stack.Navigator>

);
}