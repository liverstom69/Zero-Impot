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

  // FILTER LAW

  static getProgramFromLaw(laws, filterLawName) {
      return laws.filter(law => law.name === filterLawName)[0];
  }

  // Pinel

  static getPinelPrograms(pinel, taxAmount) {
      const percent = 5;
      const pinelAmount = this.getPinelInvestment(taxAmount);
      const minPinelAmount = pinelAmount - ((percent / 100) * pinelAmount);
      const maxPinelAmount = pinelAmount + ((percent / 100) * pinelAmount);
      let programs = [];
      let isAlreadyIn = false;
      console.log(pinel.programs);
      pinel.programs.map(program => {
          isAlreadyIn = false;
          program.apartments.map(appartment => {
              if (isAlreadyIn === false &&
                  appartment.price >= minPinelAmount &&
                  appartment.price <= maxPinelAmount) {
                  programs.push(program);
                  isAlreadyIn = true
              }
          });
      });
      return programs;
  }

  static getPinelHorizon(investment) {
      const econmy = investment * 0.18;
      return {
          key: '0',
          duree: '9',
          economy: econmy.toString(),
          saving: (econmy / 9).toString(),
      };
  }

  static getPinelInvestment(taxAmount) {
      return taxAmount * 50;
  }

  static getPinel(pinelLaw, taxAmount) {
      const investment = this.getPinelInvestment(taxAmount);
      return {
          name: 'Pinel',
          investiment: investment.toString(),
          programs: this.getPinelPrograms(pinelLaw, taxAmount),
          horizon: this.getPinelHorizon(investment)
      }
  }

  // Pinel OutreMer

    static getPinelOutremerPrograms(pinelOM, taxAmount) {
      const percent = 5;
      const pinelOMAmount = taxAmount * 26.085;
      const minPinelOMAmount = pinelOMAmount - ((percent / 100) * pinelOMAmount);
      const maxPinelOMAmount = pinelOMAmount - ((percent / 100) * pinelOMAmount);
      let programs = [];
      let isAlreadyIn = false;
      pinelOM.programs.map(program => {
          isAlreadyIn = false;
          program.apartments.map(appartment => {
              if (isAlreadyIn === false &&
                  appartment.price >= minPinelOMAmount &&
                  appartment.price <= maxPinelOMAmount) {
                  isAlreadyIn = true;
                  programs.push(program);
              }
          });
      });
      return programs;
    }
}