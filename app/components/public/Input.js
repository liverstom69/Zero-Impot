import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Const from '../../config/Const';
import styles from '../../config/styles';
import images from '../../config/images';

export default class Input extends React.Component {
  renderInputStyle() : Array {
    return this.props.isBig !== undefined && this.props.isBig === true && (this.props.isPhone === undefined || this.props.isPhone === false) ?
      [ inputStyle.input, inputStyle.bigInput ]

    :
      [ inputStyle.input, inputStyle.smallInput ];
  }

  renderViewStyle() : Array {
    const background = this.props.value.length > 0 ? { backgroundColor: Const.COLOR.GREEN } : { backgroundColor : Const.COLOR.GREY };
    return this.props.isBig !== undefined && this.props.isBig === true && (this.props.isPhone === undefined || this.props.isPhone === false) ?
      [ inputStyle.view, inputStyle.bigView, background ]
      :
      [ inputStyle.view, inputStyle.smallView, background ];
  }

  render() {
    return (
      <View style={inputStyle.container}>
        <TextInput
          keyboardType={"numeric"}
          value={this.props.value}
          returnKeyType={"done"}
          underlineColorAndroid={"transparent"}
          onChangeText={(text) => this.props.onChangeText(text)}
          style={this.renderInputStyle()}
          editable={this.props.isEdit}
          placeholder={this.props.placeholder === undefined ? "" : this.props.placeholder}
        />
          {this.props.isBig && (
              <View style={this.renderViewStyle()}>
                {this.props.isPhone !== undefined && this.props.isPhone === true ?
                  <Image
                    source={images.call}
                    style={{tintColor: 'white'}}
                  />
                  :
                  <Text style={[styles.textRegular, styles.whiteColor]}>€</Text>
                }
              </View>
          )}
      </View>
    )
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  isBig: PropTypes.bool.isRequired,
  isPhone: PropTypes.bool,
  launchAnimation: PropTypes.func,
  isEdit: PropTypes.bool,
  placeholder: PropTypes.string,
};

const inputStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Const.COLOR.GREY,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    paddingLeft: 10,
    fontFamily: "Catamaran-Regular",
    color: Const.COLOR.BLACKGREY,

  },
  bigInput: {
    height: 60,
    fontSize: 22,
  },
  smallInput: {
    height: 42,
    fontSize: 18,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  bigView: {
    height: 60,
    width: 60,
  },
  smallView: {
    height: 42,
    width: 42,
  }
});