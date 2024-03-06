import React, {useState, useRef, useEffect} from 'react';
import { Button, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

function LoginScreen({ navigation }) {
    const [showWebView, setShowWebView] = useState(false);
    const webViewRef = useRef(null)
    const [webViewUrl, setWebViewUrl] = useState('https://homlogin.sso2.ibama.serpro.gov.br/cas/logout'); // gambiarra do logout antes de login, rever isso depois da POC

    const handleButtonPress = () => {
        setShowWebView(true);
    }

    const loginUrl = "https://homlogin.sso2.ibama.serpro.gov.br/cas/login?service=http://recoopera.test/";

    useEffect(() => {
        if (showWebView) {
            setTimeout(() => setWebViewUrl(loginUrl), 2000);
        }
    }, [showWebView])

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
            console.log('Ticket: ', ticket);
            navigation.navigate('Ticket', { ticket });
            setShowWebView(false);
        } else {
            webViewRef.current.injectJavaScript(`window.location.href = "${loginUrl}";`);
        }
    }

    if (showWebView) {
        return <WebView ref={webViewRef} source={{ uri: webViewUrl }} onNavigationStateChange={onNavigationStateChange} onError={handleError} />;
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