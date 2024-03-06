import {View, Text, Button} from 'react-native';
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";

function TicketScreen({ route }) {
    const { ticket } = route.params;
    const [data, setData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const payload = {
            ticket: ticket,
            service: "http://recoopera.test/",
        };
        console.log("payload: " + JSON.stringify(payload));
        fetch("https://redesigned-spoon-production.up.railway.app/authentication/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log("Data: " + JSON.stringify(data));
            })
            .catch(error => {
                console.error("Failed to perform request: " + error.name + " Message: " + error.message);
            });

    }, [ticket]);

    const handlePress = () => {
        navigation.navigate('Validate', { sessionToken: data.sessionToken });
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello Ticket: {ticket}</Text>
            {data && <Button title="Go to Validate Screen" onPress={handlePress} />}
            {data && <Text>Data: {JSON.stringify(data)}</Text>}
        </View>
    );
}

export default TicketScreen;