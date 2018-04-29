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
      const pinelAmount = this.getPinelInvestment(taxAmount);
      const minPinelAmount = pinelAmount;
      const maxPinelAmount = pinelAmount + ((Const.PERCENT / 100) * pinelAmount);
      let pinelMaxProgram = pinel.programs[0];
      let maxAppartment = pinel.programs[0].apartments[0];
      let programs = [];
      let isAlreadyIn = false;
      pinel.programs.map(program => {
          isAlreadyIn = false;
          program.apartments.map(appartment => {
              if (appartment.price > maxAppartment) {
                  maxAppartment = appartment;
                  pinelMaxProgram = program;
              }
              if (programs.length < 4) {
                  if (isAlreadyIn === false &&
                      appartment.price >= minPinelAmount &&
                      appartment.price <= maxPinelAmount) {
                      programs.push(program);
                      isAlreadyIn = true
                  }
              }
          });
      });
      return programs.length === 0 ? maxAppartment < pinelAmount ? [] : [pinelMaxProgram] : programs;
  }

  static getPinelAppartment(program, investment) {
      const maxPinelAmount = investment + ((Const.PERCENT / 100) * investment);
      let appartments = [];
      let maxAppartment = program.apartments[0];
      program.apartments.map(appartment => {
          if (appartment.price > maxAppartment) {
              maxAppartment = appartment;
          }
          if (appartment.price >= investment && appartment.price <= maxPinelAmount) {
              appartments.push(appartment)
          }
      });
      return appartments.length === 0 ? maxAppartment : appartments[this.getRandomArbitrary(0, appartments.length - 1)];
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
        const investment = Math.round(taxAmount * 50);
        const maxInvestment = Math.round(Const.MAX_LAW.PINEL * 50);
        return investment > maxInvestment ? maxInvestment : investment;
  }

  static getPinelTaxByInvestment(investment) {
        const taxAmount = investment / 50;
      return taxAmount > Const.MAX_LAW.PINEL ? Const.MAX_LAW.PINEL : taxAmount;
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
      const percent = Const.PERCENT;
      const pinelOMAmount = taxAmount * 26.085;
      const minPinelOMAmount = pinelOMAmount;
      const maxPinelOMAmount = pinelOMAmount + ((percent / 100) * pinelOMAmount);
      let pinelOMMaxProgram = pinelOM.programs[0];
      let pinelMaxAppartment = pinelOMMaxProgram.apartments[0];
      let programs = [];
      let isAlreadyIn = false;
      pinelOM.programs.map(program => {
          isAlreadyIn = false;
          program.apartments.map(appartment => {
              if (appartment.price > pinelMaxAppartment) {
                  pinelMaxAppartment = appartment;
                  pinelOMMaxProgram = program;
              }
              if (programs.length < 4) {
                  if (isAlreadyIn === false &&
                      appartment.price >= minPinelOMAmount &&
                      appartment.price <= maxPinelOMAmount) {
                      isAlreadyIn = true;
                      programs.push(program);
                  }
              }
          });
      });
        return programs.length === 0 ? maxPinelOMAmount < pinelOMAmount ? [] : [pinelOMMaxProgram] : programs;
    }

    static getPinelOMAppartment(program, investment) {
        const maxPinelOM = investment + ((Const.PERCENT / 100) * investment);
        let appartments = [];
        let maxAppartment = program.apartments[0];
        program.apartments.map(appartment => {
            if (appartment.price > maxAppartment) {
                maxAppartment = appartment;
            }
            if (appartment.price >= investment && appartment.price <= maxPinelOM) {
                appartments.push(appartment)
            }
        });
        return appartments.length === 0 ? maxAppartment : appartments[this.getRandomArbitrary(0, appartments.length - 1)];
    }

    static getPinelOMHorizon(investment) {
        const economy = Math.round(investment * 0.23);
        return {
            key: '0',
            duree: '6',
            economy: economy.toString(),
            saving: Math.round(economy / 6).toString(),
        };
    }

    static getPinelOMInvestment(taxAmount) {
        const investment = Math.round(taxAmount * 26.08);
        const maxInvestment = Math.round(Const.MAX_LAW.PINEL_OUTREMER * 26.08);
        return investment > maxInvestment ? maxInvestment : investment;
    }

    static getPinelOMTaxByInvestment(investment) {
        const taxAmount = Math.round(investment / 26.08);
        return taxAmount > Const.MAX_LAW.PINEL_OUTREMER ? Const.MAX_LAW.PINEL_OUTREMER : taxAmount;
    }

    static getPinelOMFinalAmount(taxAmount, investment) {
        const value = taxAmount - this.getPinelOMTaxByInvestment(investment);
         return value < 0 ? 0 : value;
    }

    static getPinelOM(pinelOMLaw, taxAmount) {
        const investment = this.getPinelOMInvestment(taxAmount);
        return {
            name: Const.LAW_NAME.PINEL_OUTREMER,
            investiment: investment.toString(),
            programs: this.getPinelOutremerPrograms(pinelOMLaw, taxAmount),
            horizon: this.getPinelOMHorizon(investment)
        }
    }

    static getPinelOMActionSheetValue(investment) {
        return [
            150000,
            200000,
            250000,
            300000,
            investment
        ];
    }

    // Communs

    static getActionSheetByLaw(lawName, investment) {
        let values = [];
      switch (lawName) {
          case Const.LAW_NAME.PINEL:
              values = this.getPinelActionSheetValue(parseInt(investment));
              break;
          case Const.LAW_NAME.PINEL_OUTREMER:
              values = this.getPinelOMActionSheetValue(parseInt(investment));
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
          case Const.LAW_NAME.PINEL_OUTREMER:
              return this.getPinelOM(filterLaws, taxAmount);
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
              case Const.LAW_NAME.PINEL_OUTREMER:
                  value = this.getPinelOMFinalAmount(taxAmount, parseInt(law.investiment));
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
          case Const.LAW_NAME.PINEL_OUTREMER:
              return this.getPinelOMTaxByInvestment(investment);
          default:
              break;
      }
    }

    static getInvestmentByLaw(lawName, taxAmount) {
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
                return this.getPinelInvestment(taxAmount);
            case Const.LAW_NAME.PINEL_OUTREMER:
                return this.getPinelOMInvestment(taxAmount);
            default:
                break;
        }
    }

    static getAppartmentByLaw(lawName, program, investment) {
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
                return this.getPinelAppartment(program, investment);
            case Const.LAW_NAME.PINEL_OUTREMER:
                return this.getPinelOMAppartment(program, investment);
            default:
                break;
        }
    }

    static getRandomArbitrary(min, max) {
        return Math.round( Math.random() * (max - min) + min );
    }

    static getGain(investiment) {
        const minus = parseInt(investiment) * 0.6;
        return Math.round(investiment - minus).toString();
    }

    static getEpargne(rent, investment, taxAmount, gain, duree) {
        const gainPerMonth = Math.round(gain / (duree * 12));
        const backMoney = Math.round((investment + (investment * 0.2)) / 240);
        return (backMoney - rent - gainPerMonth).toString();
    }
}