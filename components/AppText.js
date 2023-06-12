import React from 'react';
import { Text ,StyleSheet,Platform} from 'react-native';

function AppText({text,style,onPress}) {
    return (
        <Text 
            style={[styles.text1,style]}
            onPress={onPress}
        >
            {text}
        </Text>
    );
}
const styles = StyleSheet.create({
    text1:{
        color:'#fff',
        fontSize:20,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
})

export default AppText;