import React from 'react';
import { AntDesign } from '@expo/vector-icons';

function AppIcon({icon_name,icon_size,icon_color}) {
    return (
        <AntDesign name= {icon_name} size={icon_size} color={icon_color} />
    );
}

export default AppIcon;