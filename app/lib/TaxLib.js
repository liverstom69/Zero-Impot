//@flow

import I18n from 'ex-react-native-i18n';

import AlertLib from './AlertLib';

export default class TaxLib {
  static checkNumber(number: String) {
    if (!(number.match('^[0-9]*$'))) {
      AlertLib.alertOK(I18n.t('translation.errorTaxNumber'));
      return true;
    }
    return false;
  }
}