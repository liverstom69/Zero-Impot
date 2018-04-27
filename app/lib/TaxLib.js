//@flow

import I18n from 'ex-react-native-i18n';

import AlertLib from './AlertLib';
import Const from "../config/Const";

export default class TaxLib {
    static onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

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
      const percent = 20;
      const pinelAmount = this.getPinelInvestment(taxAmount);
      const minPinelAmount = pinelAmount - ((percent / 100) * pinelAmount);
      const maxPinelAmount = pinelAmount;
      let programs = [];
      let isAlreadyIn = false;
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

  static getPinelTaxByInvestment(investment) {
      return investment / 50;
  }

  static getPinelFinalAmount(taxAmount, investment) {
      const value = taxAmount - investment / 50;
      return value < 0 ? 0 : value;
  }

  static getPinel(pinelLaw, taxAmount) {
      const investment = this.getPinelInvestment(taxAmount);
      return {
          name: Const.LAW_NAME.PINEL,
          investiment: investment.toString(),
          programs: this.getPinelPrograms(pinelLaw, taxAmount),
          horizon: this.getPinelHorizon(investment)
      }
  }

  static getPinelActionSheetValue(investment) {
      return [
          150000,
          200000,
          250000,
          300000,
          investment
      ];
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

    // Communs

    static getActionSheetByLaw(lawName, investment) {
        let values = [];
      switch (lawName) {
          case Const.LAW_NAME.PINEL:
              values = this.getPinelActionSheetValue(parseInt(investment));
              break;
          default:
              break;
      }
        values.sort((a, b) => a < b).filter( this.onlyUnique );
        return values.map(value => {
            return value.toString();
        });
    }

    static getLawData(laws, lawName, taxAmount) {
      const filterLaws = TaxLib.getProgramFromLaw(laws, lawName);
      switch (lawName) {
          case Const.LAW_NAME.PINEL:
              return this.getPinel(filterLaws, taxAmount);
          default:
              break;
      }
    }

    static getTaxMinByLaw(laws, taxAmount) {
      let min = taxAmount;
      laws.map(law => {
          let value = min;
          switch (law.name) {
              case Const.LAW_NAME.PINEL:
                  value = this.getPinelFinalAmount(taxAmount, parseInt(law.investiment));
                  break;
              default:
                  break;
          }
          if (value < min) { min = value }
      });
      return min;
    }

    static getTaxByInvestmentByLaw(lawName, investment) {
      switch (lawName) {
          case Const.LAW_NAME.PINEL:
              return this.getPinelTaxByInvestment(investment);
          default:
              break;
      }
    }

    static getInvestmentByLaw(lawName, taxAmount) {
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
                return this.getPinelInvestment(taxAmount);
            default:
                break;
        }
    }

    static getRandomArbitrary(min, max) {
        return Math.round( Math.random() * (max - min) + min );
    }

    static getAverageAppartment(appartments) {
        let average = 0;
        let number = 0;
        appartments.map(appartment => {
            average += appartment.rent;
            number += 1;
        });
        return number === 0 ? 0 : Math.round(average / number);
    }
}