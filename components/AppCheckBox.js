import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import AppIcon from './AppIcon';
import AppText from './AppText';

function AppCheckBox({icon_name,icon_size,icon_color,onPress,isCheck}) {
    return (
        <View style = {styles.coמtainer}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style = {styles.check}>
                    {isCheck === true && (<AppIcon 
                    icon_name = {icon_name}
                    icon_size = {icon_size}
                    icon_color = {icon_color}
                    > 
                    </AppIcon>)}
                </View>
            </TouchableWithoutFeedback>
            <AppText text={"אח שכול ?"} style={styles.text}></AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    coמtainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    check:{
        height:40,
        width:40,
        borderRadius:10,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:'center',
        marginRight:30,
    },
    text:{
        fontSize:20,
        color:'#0782F9'
    }
})

export default AppCheckBox;