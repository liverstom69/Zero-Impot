import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../config/styles';
import Const from '../../config/Const';

export default class SavingResult extends React.Component {
  render() {
    return (
      <View style={[styles.alignCenter, savingStyle.view]}>
        <View style={styles.halfSpace}/>
        {this.props.image !== undefined &&
        <View>
          <Image
            source={this.props.image}
            style={savingStyle.smiley}
          />
        </View>
        }
        <Text style={savingStyle.value}>{this.props.value} €</Text>
        <Text style={savingStyle.text}>{this.props.text}</Text>
        <View style={styles.halfSpace}/>
      </View>
    )
  }
}

const savingStyle = StyleSheet.create({
  view: {
    paddingVertical: 10,
    shadowOpacity: 5,
    shadowRadius: 5,
    shadowColor: Const.COLOR.GREY2,
    shadowOffset: {height: 0, width: 0},
  },
  smiley: {
    zIndex: 10
  },
  value: {
    fontSize: 38,
    fontFamily: 'Catamaran-Medium',
    color: Const.COLOR.BLUE,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Catamaran-Light',
    color: Const.COLOR.GREY2,
    marginTop: -15,
  },
});

SavingResult.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.number,
};