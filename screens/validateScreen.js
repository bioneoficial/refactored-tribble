import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";

function ValidateScreen({ route }) {
    console.log("validate route: " + JSON.stringify(route));
    const { sessionToken } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        fetch("https://redesigned-spoon-production.up.railway.app/authentication/validate-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({sessionToken: sessionToken})
        })
            .then(response => {
                if (response.status === 401) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                } else if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(JSON.stringify(data))
            })
            .catch(error => {
                console.error("Failed to perform request: " + error.name + " Message: " + error.message);
            });

    }, [sessionToken, navigation]);
    const handleLogout = () => {
        fetch("https://redesigned-spoon-production.up.railway.app/authentication/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({sessionToken: sessionToken})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                navigation.navigate('Login');
            })
            .catch(error => {
                console.error("Failed to perform request: " + error.name + " Message: " + error.message);
            });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello Validate. Session Token: {sessionToken}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

export default ValidateScreen;