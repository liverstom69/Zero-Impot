import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../../config/styles';
import TaxLib from "../../lib/TaxLib";
import Const from "../../config/Const";

export default class EconomyLaw extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.props.name !== Const.LAW_NAME.MALRAUX && this.props.name !== Const.LAW_NAME.MONUMENT_HISTORIQUE && <Text style={[styles.textMedium, styles.blackColor]}>{TaxLib.returnNumberFormat(this.props.economy.saving)}€ / {I18n.t('translation.year')}</Text>}
        <Text style={[styles.textMedium, styles.blackColor]}>{I18n.t('translation.on')} {this.props.economy.duree} {I18n.t('translation.years')} {TaxLib.returnNumberFormat(this.props.economy.economy)}€</Text>
      </View>
    )
  }
}

EconomyLaw.propTypes = {
  economy: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};