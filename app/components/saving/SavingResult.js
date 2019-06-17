import React from 'react';
import {Image, StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../config/styles';
import Const from '../../config/Const';
import TaxLib from "../../lib/TaxLib";
import AlertLib from "../../lib/AlertLib";

export default class SavingResult extends React.Component {
    handleClick() {
        if (this.props.description !== undefined) {
            AlertLib.alertOK(this.props.titleDescription, this.props.description);
        }
    }

  render() {
    return (
      <View style={[styles.alignCenter, Platform.OS === "android" ? savingStyle.viewAndroid : savingStyle.view]}>
          <View style={styles.tinySpace}/>
        {this.props.image !== undefined &&
        <View>
          <Image
            source={this.props.image}
            style={savingStyle.smiley}
          />
        </View>
        }
        <Text style={savingStyle.value}>{TaxLib.returnNumberFormat(this.props.value)} €</Text>
          <View style={[styles.justifyCenter, styles.alignCenter, { flexDirection: "row" }]}>
              <View style={[styles.justifyCenter, styles.alignCenter]}>
                <Text style={savingStyle.text}>{this.props.text}</Text>
              </View>
              {this.props.description !== undefined && (
                  <TouchableOpacity
                      onPress={() => this.handleClick()}
                      style={[styles.infoTextView, styles.justifyCenter, styles.alignCenter, { marginLeft: 5 }]}
                      activeOpacity={this.props.description === undefined ? 1 : 0.8}>
                      <Text style={styles.infoText}>info</Text>
                  </TouchableOpacity>
              )}
          </View>
        <View style={styles.tinySpace}/>
      </View>
    )
  }
}

const savingStyle = StyleSheet.create({
    viewAndroid: {
        paddingVertical: 7.5,
        backgroundColor: "white",
        elevation: 5,
    },
  view: {
    paddingVertical: 7.5,
    shadowOpacity: 5,
    shadowRadius: 5,
    shadowColor: Const.COLOR.GREY2,
    shadowOffset: {height: 0, width: 0},
  },
  smiley: {
    zIndex: 10
  },
  value: {
    fontSize: 30,
    fontFamily: 'Catamaran-Medium',
    color: Const.COLOR.BLUE,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Catamaran-Light',
    color: Const.COLOR.GREY2,
  },
});

SavingResult.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.number,
  titleDescription: PropTypes.string,
  description: PropTypes.string,
};