//@flow
import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../config/styles';
import Const from "../../config/Const";

export default class ConstanceButton extends React.Component {
  renderViewStyle() : Array {
    const bottom = this.props.isBottom ? styles.viewWithMarg : null;
    let buttonS;
    switch (this.props.color) {
      case Const.COLOR.BLUE:
        buttonS = buttonStyle.blueView;
        break;
      case Const.COLOR.GREY:
        buttonS = buttonStyle.greyView;
        break;
      case 'white':
        buttonS = buttonStyle.whiteView;
        break;
      default:
        return null;
    }
    return [ buttonStyle.view, bottom, buttonS ];
  }

  renderTextStyle() : Object {
    return this.props.color === 'white' ?
      styles.blueColor
      :
      styles.whiteColor;
  }

  renderIconStyle() : Object {
    return this.props.color === 'white' ?
      [ buttonStyle.icon, buttonStyle.blueIcon]
      :
      [ buttonStyle.icon, buttonStyle.whiteIcon ];
  }

  render() {
    return (
      <TouchableOpacity
        style={this.renderViewStyle()}
        onPress={ () => this.props.onPress() }>
      <View style={buttonStyle.centerView}>
        {this.props.image !== undefined &&
        <Image
          source={this.props.image}
          style={this.renderIconStyle()}
        />
        }
        <View style={buttonStyle.textView}>
          <Text style={[styles.textMedium, this.renderTextStyle()]}>{this.props.title}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}

ConstanceButton.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  image: PropTypes.number,
  isBottom: PropTypes.bool,
};

const buttonStyle = StyleSheet.create({
    view: {
        flex: 1,
        height: 62,
        borderRadius: 2,
        justifyContent: 'center',
    },
    blueView: {
      backgroundColor: Const.COLOR.BLUE,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      shadowColor: Const.COLOR.BLUE,
      shadowOffset: { height: 5, width: 0 },
    },
    greyView: {
        backgroundColor: Const.COLOR.GREY
    },
    whiteView: {
        borderColor: Const.COLOR.BLUE,
        borderWidth: 1,
    },
    icon: {
        position: 'absolute',
        left: 10,
    },
    blueIcon: {
        tintColor: Const.COLOR.BLUE,
    },
    whiteIcon: {
        tintColor: 'white',
    },
    textView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerView: {
        justifyContent: "center",
    }
});