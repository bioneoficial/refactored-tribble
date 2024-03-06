import { View, Text } from 'react-native';

function TicketScreen({ route }) {
    const { ticket } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello Ticket: {ticket}</Text>
        </View>
    );
}

export default TicketScreen;