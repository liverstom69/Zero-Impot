import Const from "../config/Const";
import TaxLib from "./TaxLib";

export default class MHLib {
    static getFactorFromTax(taxAmount) {
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

    static getFactorFromWork(work) {
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

    static getPrograms(mh, taxAmount) {
        console.log('MH', mh);
        const mhAmount = MHLib.getInvestment(taxAmount);
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
                if (isAlreadyIn === false &&
                    appartment.work >= mhAmount &&
                    appartment.work <= maxMHAmount) {
                    programs.push(program);
                    isAlreadyIn = true;
                }
            });
        });
        return programs.length === 0 ? [] : programs;
    }

    static getNearPrograms(mh, investment) {
        let programs = [];
        let isAlreadyIn = false;
        mh.programs.map(program => {
            isAlreadyIn = false;
            program.apartments.map(appartment => {
                if (!isAlreadyIn && investment <= appartment.price && appartment.price <= (investment * Const.PERCENT_MMH)) {
                    if (programs.length < Const.NUMBER_OF_ELEMENTS) {
                        programs.push(program);
                        isAlreadyIn = true;
                    }
                }
            })
        });
        return programs.length === 0 ? [mh.programs[0]] : programs;
    }

  static getNearAmount(programs, investment) {
    let appartment = programs[0].apartments[0];
    programs.map(program => {
      program.apartments.map(appart => {
        if (investment <= appart.price && appart.price <= (investment + (investment * Const.PERCENT_MMH))) {
          if (investment <= appartment.price && appartment.price <= (investment + (investment * Const.PERCENT_MMH))) {
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

    static getAppartment(program, investment) {
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
        return appartments.length === 0 ? maxAppartment : appartments[TaxLib.getRandomArbitrary(0, appartments.length - 1)];
    }

    static getHorizon(investment) {
        const economy = investment * 0.36;
        return {
            key: '0',
            duree: '15',
            economy: Math.ceil(economy).toString(),
            saving: Math.ceil(economy).toString(),
        };
    }

    static getInvestment(taxAmount) {
        const investment = taxAmount * MHLib.getFactorFromTax(taxAmount);
        return Math.ceil(investment + investment * 0.36);
    }

    static getTaxByInvestment(investment) {
        const finalInvestment = investment - investment * 0.36;
        return Math.ceil(finalInvestment / MHLib.getFactorFromWork(finalInvestment));
    }

    static getSpecificObject(law, value) {
        const appartment = MHLib.getNearAmount(law.programs, value);
        return {
            name: Const.LAW_NAME.MONUMENT_HISTORIQUE,
            description: 'Cette loi permet une réduction d’impôt\n' +
            'sans limite. Le régime Monument historique est souscrit pour 15 ans',
            investiment: value.toString(),
            programs: law.programs,
            horizon: MHLib.getHorizon(appartment.work),
            appartment
        }
    }

    static getFinalAmount(taxAmount, investment) {
        const value = taxAmount - MHLib.getInvestment(investment);
        return value < 0 ? 0 : value;
    }

    static getObject(mhLaw, taxAmount, isFirstTime = true) {
        let programs;
        if (isFirstTime === true) {
            programs = MHLib.getPrograms(mhLaw, taxAmount);
        } else {
            programs = MHLib.getNearPrograms(mhLaw, taxAmount);
        }
        if (programs.length > 0) {
            let appartment;
            if (isFirstTime === true) {
                appartment = MHLib.getAppartment(programs[0], MHLib.getInvestment(taxAmount));
            } else {
                appartment = MHLib.getNearAmount(programs, taxAmount)
            }
            return {
                name: Const.LAW_NAME.MONUMENT_HISTORIQUE,
                description: 'Cette loi permet une réduction d’impôt\n' +
                'sans limite. Le régime Monument historique est souscrit pour 15 ans',
                investiment: appartment.price.toString(),
                programs,
                horizon: MHLib.getHorizon(appartment.work),
                appartment
            }
        }
        const investment = MHLib.getInvestment(taxAmount);
        return {
            name: Const.LAW_NAME.MONUMENT_HISTORIQUE,
            description: 'Cette loi permet une réduction d’impôt\n' +
            'sans limite. Le régime Monument historique est souscrit pour 15 ans',
            investiment: investment.toString(),
            programs,
            horizon: MHLib.getHorizon(investment)
        }
    }

    static getActionSheetValue(investment) {
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

    static getEpargne(rent, investment, taxAmount, gain, duree) {
        return TaxLib.getBasicEpargne(rent, investment, taxAmount, gain, duree)
    }

    static getGain(work) {
        return work * 0.65;
    }
}