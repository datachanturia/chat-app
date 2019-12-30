import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const LoginScreen = ({navigation}) => {
    const [name, setName] = useState('');

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.text}>
                    <Text>Enter username: </Text>
                    <TextInput 
                        value={name} 
                        onChangeText={setName} 
                        placeholder='enter name'
                        autoCapitalize='none'
                        autoCorrect={false} />
                </View>
                <Button 
                    title='start chat'
                    onPress={() => navigation.navigate('Chat', { username: name })} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        flexDirection: 'row',
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderWidth: 2,
        padding: 20,
        borderRadius: 20,
    }
});

export default LoginScreen;
