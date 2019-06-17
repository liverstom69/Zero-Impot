import Const from "../config/Const";
import TaxLib from "./TaxLib";

export default class MalrauxLib {
    static getPrograms(malraux, taxAmount) {
        const malrauxAmount = this.getInvestment(taxAmount);
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
                if (isAlreadyIn === false &&
                    appartment.work >= malrauxAmount &&
                    appartment.work <= maxMalrauxAmount) {
                    programs.push(program);
                    isAlreadyIn = true;
                }
            });
        });
        console.log(programs);
        return programs.length === 0 ? [malrauxMaxProgram] : programs;
    }

    static getNearPrograms(malraux, investment) {
        let programs = [];
        let isAlreadyIn = false;
        console.log(investment);
        malraux.programs.map(program => {
            isAlreadyIn = false;
            program.apartments.map(appartment => {
                if (isAlreadyIn === false && investment <= appartment.price && appartment.price <= (investment + (investment * 0.2))) {
                    if (programs.length < Const.NUMBER_OF_ELEMENTS) {
                        programs.push(program);
                        isAlreadyIn = true;
                    }
                }
            })
        });
        return programs.length === 0 ? [malraux.programs[0]] : programs;
    }

    static getNearAmount(programs, investment) {
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

    static getAppartment(program, investment) {
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
        return appartments.length === 0 ? maxAppartment : appartments[TaxLib.getRandomArbitrary(0, appartments.length - 1)];
    }

    static getHorizon(investment) {
        const economy = Math.round(investment * 0.3);
        return {
            key: '0',
            duree: '9',
            economy: economy.toString(),
            saving: Math.ceil(economy / 9).toString(),
        };
    }

    static getInvestment(taxAmount) {
        const investment = Math.ceil(taxAmount * 12);
        const maxMalraux = 400000;
        return investment > maxMalraux ? maxMalraux : investment;
    }

    static getTaxByInvestment(investment) {
        const taxAmount = Math.ceil(investment / 12);
        return taxAmount > Const.MAX_LAW.MALRAUX ? Const.MAX_LAW.MALRAUX : taxAmount;
    }

    static getFinalAmount(taxAmount, investment, isFirstTime = true) {
        const reduc = isFirstTime === true ? this.getInvestment(investment) : this.getTaxByInvestment(investment);
        const value = taxAmount - reduc;
        return value < 0 ? 0 : value;
    }

    static getSpecficObject(law, value) {
        const appartment = this.getNearAmount(law.programs, value);
        return {
            name: Const.LAW_NAME.MALRAUX,
            description: 'Cette loi permet une réduction d’impôt\n' +
            'Jusqu’à 120 000€ sur 4 ans. La loi Malraux est souscrite pour 9 ans',
            investiment: value.toString(),
            programs: law.programs,
            horizon: this.getHorizon(appartment.work),
            appartment
        }
    }

    static getObject(malrauxLaw, taxAmount, isFirstTime = true) {
        let programs;
        let finalTaxAmount = taxAmount;
        if (taxAmount > Const.MAX_LAW.MALRAUX) {
            finalTaxAmount = Const.MAX_LAW.MALRAUX;
        }
        if (isFirstTime === true) {
            programs = this.getPrograms(malrauxLaw, finalTaxAmount);
        } else {
            programs = this.getNearPrograms(malrauxLaw, finalTaxAmount);
        }
        if (programs.length > 0) {
            let appartment;
            if (isFirstTime === true) {
                appartment = this.getAppartment(programs[0], this.getInvestment(finalTaxAmount));
            } else {
                appartment = this.getNearAmount(programs, finalTaxAmount)
            }
            return {
                name: Const.LAW_NAME.MALRAUX,
                description: 'Cette loi permet une réduction d’impôt\n' +
                'Jusqu’à 120 000€ sur 4 ans. La loi Malraux est souscrite pour 9 ans',
                investiment: appartment.price.toString(),
                programs,
                horizon: this.getHorizon(appartment.work),
                appartment
            }
        }
        const investment = this.getInvestment(taxAmount);
        return {
            name: Const.LAW_NAME.MALRAUX,
            description: 'Cette loi permet une réduction d’impôt\n' +
            'Jusqu’à 120 000€ sur 4 ans. La loi Malraux est souscrite pour 9 ans',
            investiment: investment.toString(),
            programs,
            horizon: this.getHorizon(investment)
        }
    }

    static getActionSheetValue(investment) {
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

    static getEpargne(rent, investment, taxAmount, gain, duree) {
        return TaxLib.getBasicEpargne(rent, investment, taxAmount, gain, duree)
    }
}