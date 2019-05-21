import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    Image} from 'react-native'

import { appStyles } from '../../Styles/Styles';

const DrawerNavigationMenu = ({text, imgSource, onLabelClicked, isDisabled, isSelected}) => { 
    return (
        <TouchableOpacity style={appStyles.drawerNavigationMenu} disabled={(text === isSelected) ? true : false}
            onPress={ (isDisabled ? null : onLabelClicked) }>
            <View style={appStyles.drawerNavigationMenuLabel}>
                <Image
                    source={imgSource}
                    style={appStyles.icon}
                />
                <Text style={ (isDisabled ? appStyles.linkDisable : appStyles.link) }>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DrawerNavigationMenu
