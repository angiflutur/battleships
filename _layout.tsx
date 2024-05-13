
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";


const Stack = createStackNavigator();

export default function Navigation() {
  return (

      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
        
      </Stack.Navigator>

  );
}
