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
      const maxPinelAmount = pinelAmount + ((Const.PERCENT_PINEL / 100) * pinelAmount);
      let pinelMaxProgram = pinel.programs[0];
      let maxAppartment = pinel.programs[0].apartments[0];
      let programs = [];
      let isAlreadyIn = false;
      if (taxAmount < 2500) { return programs }
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
      return programs.length === 0 ? [pinelMaxProgram] : programs;
  }

  static getPinelAppartment(program, investment) {
      const maxPinelAmount = investment + ((Const.PERCENT_PINEL / 100) * investment);
      let appartments = [];
      let maxAppartment = program.apartments[0];
      program.apartments.map(appartment => {
          if (appartment.price >= investment) {
              if (appartment.price <= maxAppartment.price || maxAppartment.price < investment) {
                  maxAppartment = appartment;
              }
          }
          if (appartment.price >= investment && appartment.price <= maxPinelAmount) {
              appartments.push(appartment)
          }
      });
      return maxAppartment;
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
        const investment = Math.ceil(taxAmount * 50);
        const maxInvestment = Math.ceil(Const.MAX_LAW.PINEL * 50);
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
          description: 'Ex pour 9 ans\n' +
          'Cette loi permet une réduction d’impôt\n' +
          'De 18% sur 9 ans. La loi Pinel peut être souscrite pour 6, 9 ou 12ans',
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
      const percent = Const.PERCENT_PINEL;
      const pinelOMAmount = taxAmount * Const.FACTOR.PINEL_OUTREMER;
      const minPinelOMAmount = pinelOMAmount;
      const maxPinelOMAmount = pinelOMAmount + ((percent / 100) * pinelOMAmount);
      let pinelOMMaxProgram = pinelOM.programs[0];
      let pinelMaxAppartment = pinelOMMaxProgram.apartments[0];
      let programs = [];
      if (taxAmount < Const.MAX_LAW.PINEL + 1) { return programs }
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
        return programs.length === 0 ? [pinelOMMaxProgram] : programs;
    }

    static getPinelOMAppartment(program, investment) {
        const maxPinelOM = investment + ((Const.PERCENT_PINEL / 100) * investment);
        let appartments = [];
        let maxAppartment = program.apartments[0];
        program.apartments.map(appartment => {
            if (appartment.price <= maxAppartment.price || maxAppartment.price < investment) {
                maxAppartment = appartment;
            }
            if (appartment.price >= investment && appartment.price <= maxPinelOM) {
                appartments.push(appartment)
            }
        });
        return maxAppartment;
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
        const investment = Math.ceil(taxAmount * Const.FACTOR.PINEL_OUTREMER);
        const maxInvestment = Math.ceil(Const.MAX_LAW.PINEL_OUTREMER * Const.FACTOR.PINEL_OUTREMER);
        return investment > maxInvestment ? maxInvestment : investment;
    }

    static getPinelOMTaxByInvestment(investment) {
        const taxAmount = Math.ceil(investment / Const.FACTOR.PINEL_OUTREMER);
        return taxAmount > Const.MAX_LAW.PINEL_OUTREMER ? Const.MAX_LAW.PINEL_OUTREMER : taxAmount;
    }

    static getPinelOMFinalAmount(taxAmount, investment) {
        const value = taxAmount - this.getPinelOMTaxByInvestment(investment);
         return value < 0 ? 0 : value;
    }

    static getPinelOM(pinelOMLaw, taxAmount, isFirstTime = true) {
        let investment;
        let finalAmount;
        if (isFirstTime === true) {
            investment = this.getPinelOMInvestment(taxAmount);
             finalAmount = taxAmount;
        } else {
            investment = taxAmount;
            finalAmount = this.getPinelOMTaxByInvestment(investment);
        }
        return {
            name: Const.LAW_NAME.PINEL_OUTREMER,
            description: 'Ex pour 9 ans\n' +
            'Cette loi permet une réduction d’impôt\n' +
            'De 29% sur 9 ans. La loi Pinel Outremer peut être souscrite pour 6, 9 ou 12ans',
            investiment: investment.toString(),
            programs: this.getPinelOutremerPrograms(pinelOMLaw, finalAmount),
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

    // MALRAUX

    static getMalrauxPrograms(malraux, taxAmount) {
        const malrauxAmount = this.getMalrauxInvestment(taxAmount);
        const maxMalrauxAmount = malrauxAmount + ((Const.PERCENT_MMH / 100) * malrauxAmount);
        let malrauxMaxProgram = malraux.programs[0];
        let malrauxMaxAppartment = malrauxMaxProgram.apartments[0];
        let programs = [];
        let isAlreadyIn = false;
        if (taxAmount < Const.MAX_LAW.PINEL_OUTREMER + 1) { return programs }
        console.log(malraux.programs);
        malraux.programs.map(program => {
            isAlreadyIn = false;
            program.apartments.map(appartment => {
                if (appartment.work > malrauxMaxAppartment.work) {
                    malrauxMaxProgram = program;
                    malrauxMaxAppartment = appartment;
                }
                if (program.length < 4) {
                    if (isAlreadyIn === false &&
                        appartment.work >= malrauxAmount &&
                        appartment.work <= maxMalrauxAmount) {
                        programs.push(program);
                        isAlreadyIn = true;
                    }
                }
            });
        });
        return programs.length === 0 ? [malrauxMaxProgram] : programs;
    }

    static getMalrauxNearPrograms(malraux, investment) {
        let programs = [];
        let isAlreadyIn = false;
        console.log(investment);
        malraux.programs.map(program => {
            isAlreadyIn = false;
            program.apartments.map(appartment => {
                if (isAlreadyIn === false && investment <= appartment.price && appartment.price <= (investment + (investment * 0.2))) {
                    if (programs.length < 4) {
                        programs.push(program);
                        isAlreadyIn = true;
                    }
                }
            })
        });
        return programs.length === 0 ? [malraux.programs[0]] : programs;
    }

    static getMalrauxNearAmount(programs, investment) {
        let appartment = programs[0].apartments[0];
        programs.map(program => {
            program.apartments.map(appart => {
                if (investment <= appart.price && appart.price <= (investment + (investment * 0.2))) {
                    if (investment <= appartment.price && appartment.price <= (investment + (investment * 0.2))) {
                        if (appart.price <= appartment.price || appart.work >= appartment.work) {
                            appartment = appart;
                        }
                    } else {
                        appartment = appart;
                    }
                }
            });
        });
        return appartment;
    }

    static getMalrauxAppartment(program, investment) {
        const maxMalrauxAmount = investment + ((Const.PERCENT_MMH / 100) * investment);
        let appartments = [];
        let maxAppartment = program.apartments[0];
        program.apartments.map(appartment => {
            if (appartment.work > maxAppartment) {
                maxAppartment = appartment;
            }
            if (appartment.work >= investment && appartment.work <= maxMalrauxAmount) {
                appartments.push(appartment)
            }
        });
        return appartments.length === 0 ? maxAppartment : appartments[this.getRandomArbitrary(0, appartments.length - 1)];
    }

    static getMalrauxHorizon(investment) {
        const economy = Math.round(investment * 0.3);
        return {
            key: '0',
            duree: '9',
            economy: economy.toString(),
            saving: Math.ceil(economy / 9).toString(),
        };
    }

    static getMalrauxInvestment(taxAmount) {
        const investment = Math.ceil(taxAmount * 12);
        const maxMalraux = 400000;
        return investment > maxMalraux ? maxMalraux : investment;
    }

    static getMalrauxTaxByInvestment(investment) {
        const taxAmount = Math.ceil(investment / 12);
        return taxAmount > Const.MAX_LAW.MALRAUX ? Const.MAX_LAW.MALRAUX : taxAmount;
    }

    static getMalrauxFinalAmount(taxAmount, investment, isFirstTime = true) {
        const reduc = isFirstTime === true ? this.getMalrauxInvestment(investment) : this.getMalrauxTaxByInvestment(investment);
        const value = taxAmount - reduc;
        return value < 0 ? 0 : value;
    }

    static getMalrauxObject(law, value) {
        const appartment = this.getMalrauxNearAmount(law.programs, value);
        return {
            name: Const.LAW_NAME.MALRAUX,
            description: 'Cette loi permet une réduction d’impôt\n' +
            'Jusqu’à 120 000€ sur 4 ans. La loi Malraux est souscrite pour 9 ans',
            investiment: value.toString(),
            programs: law.programs,
            horizon: this.getMalrauxHorizon(appartment.work),
            appartment
        }
    }

    static getMalraux(malrauxLaw, taxAmount, isFirstTime = true) {
        let programs;
        if (isFirstTime === true) {
            programs = this.getMalrauxPrograms(malrauxLaw, taxAmount);
        } else {
            programs = this.getMalrauxNearPrograms(malrauxLaw, taxAmount);
        }
        if (programs.length > 0) {
            let appartment;
            if (isFirstTime === true) {
                 appartment = this.getMalrauxAppartment(programs[0], this.getMalrauxInvestment(taxAmount));
            } else {
                appartment = this.getMalrauxNearAmount(programs, taxAmount)
            }
            return {
                name: Const.LAW_NAME.MALRAUX,
                description: 'Cette loi permet une réduction d’impôt\n' +
                'Jusqu’à 120 000€ sur 4 ans. La loi Malraux est souscrite pour 9 ans',
                investiment: appartment.price.toString(),
                programs,
                horizon: this.getMalrauxHorizon(appartment.work),
                appartment
            }
        }
        const investment = this.getMalrauxInvestment(taxAmount);
        return {
            name: Const.LAW_NAME.MALRAUX,
            description: 'Cette loi permet une réduction d’impôt\n' +
            'Jusqu’à 120 000€ sur 4 ans. La loi Malraux est souscrite pour 9 ans',
            investiment: investment.toString(),
            programs,
            horizon: this.getMalrauxHorizon(investment)
        }
    }

    static getMalrauxActionSheetValue(investment) {
        let actionSheetValues = [
            200000,
            250000,
            300000,
            350000,
            400000,
            450000,
            500000,
        ].filter(inv => inv !== investment);
        actionSheetValues.push(investment);
        return actionSheetValues;
    }

    // Monument historique

    static getFactorMHFromTax(taxAmount) {
        if (taxAmount > 30000 && taxAmount <= 40000) {
            return 6.0
        } else if (taxAmount > 40000 && taxAmount <= 50000) {
            return 5.5
        } else if (taxAmount > 50000 && taxAmount <= 60000) {
            return 5.0
        } else if (taxAmount > 60000 && taxAmount <= 70000) {
            return 4.5
        } else if (taxAmount > 70000 && taxAmount <= 80000) {
            return 4.4
        } else if (taxAmount > 80000 && taxAmount <= 90000) {
            return 4.3
        } else if (taxAmount > 90000 && taxAmount <= 100000) {
            return 4.2
        } else if (taxAmount > 100000 && taxAmount <= 200000) {
            return 4.0
        } else if (taxAmount > 200000 && taxAmount <= 300000) {
            return 2.5
        } else if (taxAmount > 300000 && taxAmount <= 400000) {
            return 2.2
        } else if (taxAmount > 400000 && taxAmount <= 700000) {
            return 2
        } else if (taxAmount > 700000 && taxAmount <= 9) {
            return 1.9
        } else {
            return 2
        }
    }

    static getFactorMHFromWork(work) {
        if (work > 180000 && work < 220000) {
            return 6.0
        } else if (work > 220000 && work < 250000) {
            return 5.5
        } else if (work > 250000 && work < 270000) {
            return 5.0
        } else if (work > 270000 && work < 308000) {
            return 4.5
        } else if (work > 308000 && work < 344000) {
            return 4.4
        } else if (work > 344000 && work < 378000) {
            return 4.3
        } else if (work > 378000 && work < 400000) {
            return 4.2
        } else if (work > 400000 && work < 500000) {
            return 4.0
        } else if (work > 500000 && work < 660000) {
            return 2.5
        } else if (work > 660000 && work < 800000) {
            return 2.2
        } else if (work > 800000 && work < 1330000) {
            return 2
        } else if (work > 1330000 && work < 1800000) {
            return 1.9
        } else {
            return 2
        }
    }

    static getMHPrograms(mh, taxAmount) {
        const mhAmount = this.getMHInvestment(taxAmount);
        const maxMHAmount = mhAmount + ((Const.PERCENT_MMH / 100) * mhAmount);
        let mhMaxProgram = mh.programs[0];
        let mhMaxAppartment = mhMaxProgram.apartments[0];
        let programs = [];
        let isAlreadyIn = false;
        if (taxAmount < Const.MAX_LAW.MALRAUX + 1) { return programs }
        mh.programs.map(program => {
            isAlreadyIn = false;
            program.apartments.map(appartment => {
                if (appartment.work > mhMaxAppartment.work) {
                    mhMaxProgram = program;
                    mhMaxAppartment = appartment;
                }
                if (program.length < 4) {
                    if (isAlreadyIn === false &&
                        appartment.work >= mhAmount &&
                        appartment.work <= maxMHAmount) {
                        programs.push(program);
                        isAlreadyIn = true;
                    }
                }
            });
        });
        return programs.length === 0 ? [mhMaxProgram] : programs;
    }

    static getMHAppartment(program, investment) {
        const maxMHAmount = investment + ((Const.PERCENT_MMH / 100) * investment);
        let appartments = [];
        let maxAppartment = program.apartments[0];
        program.apartments.map(appartment => {
            if (appartment.work > maxAppartment) {
                maxAppartment = appartment;
            }
            if (appartment.work >= investment && appartment.work <= maxMHAmount) {
                appartments.push(appartment)
            }
        });
        return appartments.length === 0 ? maxAppartment : appartments[this.getRandomArbitrary(0, appartments.length - 1)];
    }

    static getMHHorizon(investment) {
        const economy = investment * 0.41;
        return {
            key: '0',
            duree: '15',
            economy: Math.ceil(economy).toString(),
            saving: Math.ceil(economy).toString(),
        };
    }

    static getMHInvestment(taxAmount) {
        const investment = taxAmount * this.getFactorMHFromTax(taxAmount);
        return Math.ceil(investment + investment * 0.36);
    }

    static getMHTaxByInvestment(investment) {
        const finalInvestment = investment - investment * 0.36;
        return Math.ceil(finalInvestment / this.getFactorMHFromWork(finalInvestment));
    }

    static getMHFinalAmount(taxAmount, investment) {
        const value = taxAmount - this.getMHInvestment(investment);
        return value < 0 ? 0 : value;
    }

    static getMH(mhLaw, taxAmount, isFirstTime = true) {
        let investment;
        let value;
        if (isFirstTime === true) {
            investment = this.getMHInvestment(taxAmount);
            value = taxAmount;
        } else {
            investment = taxAmount;
            value = this.getMHTaxByInvestment(taxAmount);
        }
        return {
            name: Const.LAW_NAME.MONUMENT_HISTORIQUE,
            description: 'Cette loi permet une réduction d’impôt\n' +
            'sans limite. Le régime Monument historique est souscrit pour 15 ans',
            investiment: investment.toString(),
            programs: this.getMHPrograms(mhLaw, value),
            horizon: this.getMHHorizon(investment)
        }
    }

    static getMHActionSheetValue(investment) {
        let actionSheetValues = [
            150000,
            200000,
            250000,
            300000,
            350000,
            400000,
            450000,
            500000,
            550000,
            600000,
            investment
        ];
        let isAlreadySorted = false;
        while (isAlreadySorted === false) {
            isAlreadySorted = true;
            if (actionSheetValues !== actionSheetValues.sort((a, b) => a < b)) {
                actionSheetValues = actionSheetValues.sort((a, b) => a < b);
                isAlreadySorted = false;
            }
        }
        return actionSheetValues;
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
          case Const.LAW_NAME.MALRAUX:
              values = this.getMalrauxActionSheetValue(parseInt(investment));
              break;
          case Const.LAW_NAME.MONUMENT_HISTORIQUE:
              values = this.getMHActionSheetValue(parseInt(investment));
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
              return this.getPinel(filterLaws, taxAmount);
          case Const.LAW_NAME.PINEL_OUTREMER:
              return this.getPinelOM(filterLaws, taxAmount);
          case Const.LAW_NAME.MALRAUX:
              return this.getMalraux(filterLaws, taxAmount);
          case Const.LAW_NAME.MONUMENT_HISTORIQUE:
              return this.getMH(filterLaws, taxAmount);
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
              case Const.LAW_NAME.MALRAUX:
                  value = this.getMalrauxFinalAmount(taxAmount, law.appartment.work, false);
                  break;
              case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                  value = this.getMHFinalAmount(taxAmount, parseInt(law.investiment));
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
          case Const.LAW_NAME.MALRAUX:
              return this.getMalrauxTaxByInvestment(investment);
          case Const.LAW_NAME.MONUMENT_HISTORIQUE:
              return this.getMHTaxByInvestment(investment);
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
            case Const.LAW_NAME.MALRAUX:
                return this.getMalrauxInvestment(taxAmount);
            case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                return this.getMHInvestment(taxAmount);
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
            case Const.LAW_NAME.MALRAUX:
                return this.getMalrauxNearAmount([program], investment);
            case Const.LAW_NAME.MONUMENT_HISTORIQUE:
                return this.getMHAppartment(program, investment);
            default:
                break;
        }
    }

    static getRandomArbitrary(min, max) {
        return Math.ceil( Math.random() * (max - min) + min );
    }

    static getGain(investiment) {
        const minus = parseInt(investiment) * 0.6;
        return Math.ceil(investiment - minus).toString();
    }

    static getEpargne(rent, investment, taxAmount, gain, duree) {
        const gainPerMonth = Math.ceil(gain / (duree * 12));
        const backMoney = Math.ceil((investment + (investment * 0.3)) / 240);
        return (backMoney - rent - gainPerMonth).toString();
    }

    static returnNumberFormat(number: string) {
        let i = 0;
        let numberFormated = "";
        if (number.length <= 4) { return number }
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
                    duree: '4',
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