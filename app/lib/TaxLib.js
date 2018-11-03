//@flow

import I18n from 'ex-react-native-i18n';

import AlertLib from './AlertLib';
import Const from "../config/Const";
import PinelLib from "./PinelLib";
import PinelOMLib from "./PinelOMLib";
import MalrauxLib from "./MalrauxLib";
import MHLib from "./MHLib";

const numberOfElement = 3;

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

  static getActionSheetByLaw(lawName, investment) {
        let values = [];
      switch (lawName) {
          case Const.LAW_NAME.PINEL:
              values = PinelLib.getActionSheetValue(parseInt(investment));
              break;
          case Const.LAW_NAME.PINEL_OUTREMER:
              values = PinelOMLib.getActionSheetValue(parseInt(investment));
              break;
          case Const.LAW_NAME.MALRAUX:
              values = MalrauxLib.getActionSheetValue(parseInt(investment));
              break;
          case Const.LAW_NAME.MONUMENT_HISTORIQUE:
              values = MHLib.getActionSheetValue(parseInt(investment));
          default:
              break;
      }
        values = values.sort((a, b) => a < b).filter( this.onlyUnique );
        return values.map(value => {
            return this.returnNumberFormat(value.toString());
        });
    }

    static getLawData(laws, lawName, taxAmount) {
      const filterLaws = TaxLib.getProgramFromLaw(laws, lawName);
      switch (lawName) {
          case Const.LAW_NAME.PINEL:
              return PinelLib.getObject(filterLaws, taxAmount);
          case Const.LAW_NAME.PINEL_OUTREMER:
              return PinelOMLib.getObject(filterLaws, taxAmount);
          case Const.LAW_NAME.MALRAUX:
              return MalrauxLib.getObject(filterLaws, taxAmount);
          case Const.LAW_NAME.MONUMENT_HISTORIQUE:
              return MHLib.getObject(filterLaws, taxAmount);
          default:
              break;
      }
    }

    static getGlobalGain(appartment, lawName) {
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
            case Const.LAW_NAME.PINEL_OUTREMER:
                return TaxLib.getGain(appartment.price);
            case Const.LAW_NAME.MALRAUX:
            case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                return TaxLib.getGain(appartment.work);
        }
    }

    static getTaxMinByLaw(laws, taxAmount) {
      let min = taxAmount;
      laws.map(law => {
          let value = min;
          switch (law.name) {
              case Const.LAW_NAME.PINEL:
                  value = PinelLib.getFinalAmount(taxAmount, parseInt(law.investiment));
                  break;
              case Const.LAW_NAME.PINEL_OUTREMER:
                  value = PinelOMLib.getFinalAmount(taxAmount, parseInt(law.investiment));
                  break;
              case Const.LAW_NAME.MALRAUX:
                  value = MalrauxLib.getFinalAmount(taxAmount, law.appartment.work, false);
                  break;
              case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                  value = MHLib.getFinalAmount(taxAmount, parseInt(law.investiment));
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
              return PinelLib.getTaxByInvestment(investment);
          case Const.LAW_NAME.PINEL_OUTREMER:
              return PinelOMLib.getTaxByInvestment(investment);
          case Const.LAW_NAME.MALRAUX:
              return MalrauxLib.getTaxByInvestment(investment);
          case Const.LAW_NAME.MONUMENT_HISTORIQUE:
              return MHLib.getTaxByInvestment(investment);
          default:
              break;
      }
    }

    static getInvestmentByLaw(lawName, taxAmount) {
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
                return PinelLib.getInvestment(taxAmount);
            case Const.LAW_NAME.PINEL_OUTREMER:
                return PinelOMLib.getInvestment(taxAmount);
            case Const.LAW_NAME.MALRAUX:
                return MalrauxLib.getInvestment(taxAmount);
            case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                return MHLib.getInvestment(taxAmount);
            default:
                break;
        }
    }

    static getAppartmentByLaw(lawName, program, investment) {
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
                return PinelLib.getAppartment(program, investment);
            case Const.LAW_NAME.PINEL_OUTREMER:
                return PinelOMLib.getAppartment(program, investment);
            case Const.LAW_NAME.MALRAUX:
                return MalrauxLib.getNearAmount([program], investment);
            case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                return MHLib.getAppartment(program, investment);
            default:
                break;
        }
    }

    static getGainByLaw(lawName, lawObject) {
        switch (lawName) {
            case Const.LAW_NAME.MALRAUX:
                return lawObject.appartment.work;
            default:
                return parseInt(lawObject.investiment);
        }
    }

    static getGlobalEconomy(lawName, appartment) {
        let maxEconomy = 0;
        let appartmentEconomy = 0;
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
                maxEconomy =  parseInt(PinelLib.getHorizon(Const.MAX_LAW_VALUE.PINEL).economy);
                appartmentEconomy = parseInt(PinelLib.getHorizon(appartment.price).economy);
                break;
            case Const.LAW_NAME.PINEL_OUTREMER:
                maxEconomy = parseInt(PinelOMLib.getHorizon(Const.MAX_LAW_VALUE.PINEL_OUTEMER).economy);
                appartmentEconomy = parseInt(PinelOMLib.getHorizon(appartment.price).economy);
                break;
            case Const.LAW_NAME.MALRAUX:
                maxEconomy = parseInt(MalrauxLib.getHorizon(Const.MAX_LAW_VALUE.MALRAUX).economy);
                appartmentEconomy = parseInt(MalrauxLib.getHorizon(appartment.work).economy);
                break;
            case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                appartmentEconomy = parseInt(MHLib.getHorizon(appartment.work).economy);
                maxEconomy = appartmentEconomy;
                break;
            default:
                break;
        }
        return appartmentEconomy < maxEconomy ? appartmentEconomy.toString() : maxEconomy.toString();
    }

    static getRandomArbitrary(min, max) {
        return Math.ceil( Math.random() * (max - min) + min );
    }

    static getGain(investiment) {
        console.log("***GAIN***");
        console.log("investiment", investiment);
        console.log("***");
        const gain = investiment * 0.55;
        return Math.ceil(gain).toString();
    }

    static getBasicEpargne(rent, investment, taxAmount, gainString, duree) {
        let gain = parseInt(gainString);
        console.log("***");
        console.log("rent", rent);
        console.log("investment", investment);
        console.log("Montant d'impot", taxAmount);
        console.log("Gain", gain);
        console.log("Duree", duree);
        const gainPerMonth = Math.round(gain / (duree * 12));
        console.log("Gain par mois", gainPerMonth);
        const backMoney = Math.round((investment) / 240);
        console.log("Total investment", investment);
        console.log("Remboursement", backMoney);
        console.log("Epargne", backMoney - rent - gainPerMonth);
        console.log("***");
        let epargne = backMoney - rent - gainPerMonth;
        return epargne;
    }

    static getEpargneByLaw(rent, investment, taxAmount, gain, duree, lawName) {
        let finalEpargne;
        console.log(gain);
        const basicFinalInvest = investment + investment * 0.2;
        switch (lawName) {
            case Const.LAW_NAME.PINEL:
                finalEpargne = PinelLib.getEpargne(rent, investment, taxAmount, gain, duree);
                break;
            case Const.LAW_NAME.PINEL_OUTREMER:
                finalEpargne = PinelOMLib.getEpargne(rent, investment, taxAmount, gain, duree);
                break;
            case Const.LAW_NAME.MALRAUX:
                finalEpargne = MalrauxLib.getEpargne(rent, basicFinalInvest, taxAmount, gain, duree);
                break;
            case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                finalEpargne = MHLib.getEpargne(rent, basicFinalInvest, taxAmount, gain, duree);
                break;
            default:
                finalEpargne = 0;
                break;
        }
        return Math.round(finalEpargne).toString();
    }

    static returnNumberFormat(number: string) {
        let i = 0;
        let numberFormated = "";
        if (number.length <= numberOfElement) { return number }
        number = this.reverseString(number);
        while (i < number.length) {
            if (i > 0 && i % 3 === 0) {
                numberFormated = numberFormated.concat(" ", number.charAt(i));
            } else {
                numberFormated = numberFormated.concat(number.charAt(i));
            }
            i = i + 1;
        }
        return this.reverseString(numberFormated);
    }

    // STR

    static reverseString(str) {
        return str.split("").reverse().join("");
    }

    static deleteSpace(str) {
        return str.replace(/\s/g,'');
    }

    static getTaxLib() {
        return [
            {
                name: 'Loi Pinel',
                description: 'Ex pour 9 ans\n' +
                'Cette loi permet une réduction d’impôt\n' +
                'De 18% sur 9 ans. La loi Pinel peut être souscrite pour 6, 9 ou 12ans',
                programs: [],
                investiment: 0,
                horizon: {
                    key: '0',
                    duree: '9',
                    economy: '0',
                    saving: '0',
                }
            },
            {
                name: 'Loi Pinel Outremer',
                description: 'Ex pour 9 ans\n' +
                'Cette loi permet une réduction d’impôt\n' +
                'De 29% sur 9 ans. La loi Pinel Outremer peut être souscrite pour 6, 9 ou 12ans',
                programs: [],
                investiment: 0,
                horizon: {
                    key: '0',
                    duree: '6',
                    economy: '0',
                    saving: '0',
                }
            },
            {
                name: 'Loi Malraux',
                description: 'Cette loi permet une réduction d’impôt\n' +
                'Jusqu’à 120 000€ sur 4 ans. La loi Malraux est souscrite pour 9 ans',
                programs: [],
                investiment: 0,
                horizon: {
                    key: '0',
                    duree: '9',
                    economy: '0',
                    saving: '0',
                }
            },
            {
                name: 'Loi Monument Historique',
                description: 'Cette loi permet une réduction d’impôt\n' +
                'sans limite. Le régime Monument historique est souscrit pour 15 ans',
                programs: [],
                investiment: 0,
                horizon: {
                    key: '0',
                    duree: '15',
                    economy: '0',
                    saving: '0',
                }
            }
        ]
    }
}