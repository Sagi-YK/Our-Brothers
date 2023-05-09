import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const BackButton = ({ navigation }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.goBack()}}>
            <MaterialCommunityIcons name='arrow-left' color={'black'} size={30} />
        </TouchableOpacity>
    );
};

export default BackButton;