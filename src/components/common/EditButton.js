import React, {Component} from 'react';
import {StyleSheet, View, Image, Button, Text, TouchableOpacity} from 'react-native';
import {STYLE, MAIN_COLOR} from '../../styles/styles';

class EditButton extends Component{
/*
    props: * = mandatory, ° = optional.
      * onPress
      ° text || children
      ° style
      ° imagestyle
      ° textstyle
*/
    constructor(props) {
        super(props);
        let pstyle = this.props.style || [];
        if (!Array.isArray(pstyle)) pstyle = [pstyle];
        this.style = [STYLE.button, ...pstyle];

        let imagestyle = this.props.imagestyle || [];
        if (!Array.isArray(imagestyle)) imagestyle = [imagestyle];
        this.imagestyle = [STYLE.button_image, ...imagestyle];

        let textstyle = this.props.textstyle || [];
        if (!Array.isArray(textstyle)) textstyle = [textstyle];
        this.textstyle = [STYLE.button_text, ...textstyle];
        this.content = this.props.text || this.props.children;

    }

    render() {
        return <TouchableOpacity style={this.style} onPress={this.props.onPress}>
            <Image source={require('../../../imgs/icon_edit.png')} style={this.imagestyle}/>
            { this.content && <Text style={this.textstyle}>{this.content}</Text> }
        </TouchableOpacity>;
    }
}

export default EditButton;
