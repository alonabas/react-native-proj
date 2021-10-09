import React from "react";
import {TouchableHighlight} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from '../constants/colors';
import {globalStyles} from '../constants/styles';

export const DrawerButton = (props) => (
    <TouchableHighlight {...props}
                        activeOpacity={0.9} 
                        title='Open menu'
                        underlayColor={COLORS.accent} 
                        style={globalStyles.menuButtonContainer}>
        <Ionicons name='menu-outline' size={30} color={COLORS.main}/>
    </TouchableHighlight>
)

