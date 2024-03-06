import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import TicketScreen from "./screens/TicketScreen";
import ValidateScreen from "./screens/validateScreen";

function App() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Ticket" component={TicketScreen} />
                <Stack.Screen name="Validate" component={ValidateScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;