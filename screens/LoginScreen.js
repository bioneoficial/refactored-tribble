import React, { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

function LoginScreen({ navigation }) {
    const [showWebView, setShowWebView] = useState(false);

    const handleButtonPress = () => {
        setShowWebView(true);
    }

    const url = "https://homlogin.sso2.ibama.serpro.gov.br/cas/login?service=http://recoopera.test/";

    const onNavigationStateChange = (navState) => {
        console.log(navState.url);
        if (navState.url.includes('?ticket=')) {
            const ticket = navState.url.split('?ticket=')[1];
            console.log('Ticket:', ticket);
            navigation.navigate('Ticket', { ticket });
            setShowWebView(false);
        }
    }

    const handleError = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);

        if (nativeEvent.url && nativeEvent.url.includes('?ticket=')) {
            const ticket = nativeEvent.url.split('?ticket=')[1];
            console.log('Ticket:', ticket);
            navigation.navigate('Ticket', { ticket });
            setShowWebView(false);
        }
    }

    if (showWebView) {
        return <WebView source={{ uri: url }} onNavigationStateChange={onNavigationStateChange} onError={handleError} />;
    }

    return (
        <View style={styles.centeredView}>
            <Button title="Login" onPress={handleButtonPress} />
        </View>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoginScreen ;