import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../../config/styles';
import PresentationLaw from './PresentationLaw';
import EconomyLaw from "./EconomyLaw";

export default class LawItem extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.viewWithMarg}>
          <PresentationLaw
            name={this.props.name}
            value={this.props.value}
            onPress={this.props.onPress}
          />
          <View style={styles.halfSpace} />
          <View style={styles.line} />
          <View style={styles.halfSpace} />
          <Text style={[styles.semiBoldText, styles.greyBlackColor]}>{I18n.t('translation.economy')}</Text>
          <View style={styles.halfSpace} />
          <FlatList
            data={this.props.economy}
            renderItem={ (item) => <EconomyLaw economy={item.item} /> }
          />
        </View>
          {this.props.isLast === false && <View style={styles.line} />}
      </View>
    )
  }
}

LawItem.propTypes = {
    navigation: PropTypes.object.isRequired,
    economy: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired,
};