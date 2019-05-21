import React from 'react'

import {
    View,
    TextInput,
    Image} from 'react-native'

import { appStyles } from '../../Styles/Styles';

const TextInputComponent = ({iconSource, iconWidth, iconHeight, inputPlaceHolder, isPassword, onTextInputSubmit, defaultValue}) => {
  return (
    <View style={appStyles.textInputComponentStyles}>
        <Image source={iconSource} style={{width: iconWidth, height: iconHeight, resizeMode: 'contain'}} />
        <View style={appStyles.textInputStyles}>
            <TextInput 
                placeholder={inputPlaceHolder}
                returnKeyType='next'
                autoCorrect={false}
                style={{paddingLeft: 10}}
                onChangeText={onTextInputSubmit}
                secureTextEntry={isPassword}
                value={defaultValue}
            />
        </View>
    </View>
  )
}

export default TextInputComponent
