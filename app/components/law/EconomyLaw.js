import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../../config/styles';

export default class EconomyLaw extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.textMedium, styles.greyColor2]}>{I18n.t('translation.on')} {this.props.economy.duree} {I18n.t('translation.years')}</Text>
        <Text style={[styles.textMedium, styles.blackColor]}>{this.props.economy.economy}€</Text>
        <Text style={[styles.textMedium, styles.blackColor]}>{this.props.economy.saving}€ / {I18n.t('translation.year')}</Text>
      </View>
    )
  }
}

EconomyLaw.propTypes = {
  economy: PropTypes.object.isRequired,
};