import Const from "../config/Const";
import TaxLib from "./TaxLib";

export default class PinelOMLib {
    static getPrograms(pinelOM, taxAmount, isFirstTime = true) {
        const percent = Const.PERCENT_PINEL;
        const pinelOMAmount = taxAmount * Const.FACTOR.PINEL_OUTREMER;
        const minPinelOMAmount = pinelOMAmount;
        const maxPinelOMAmount = pinelOMAmount + ((percent / 100) * pinelOMAmount);
        let pinelOMMaxProgram = pinelOM.programs[0];
        let pinelMaxAppartment = pinelOMMaxProgram.apartments[0];
        let programs = [];
        if (taxAmount < Const.MAX_LAW.PINEL + 1 && isFirstTime === true) { return programs }
        let isAlreadyIn = false;
        pinelOM.programs.map(program => {
            isAlreadyIn = false;
            program.apartments.map(appartment => {
                if (appartment.price > pinelMaxAppartment) {
                    pinelMaxAppartment = appartment;
                    pinelOMMaxProgram = program;
                }
                if (isAlreadyIn === false &&
                    appartment.price >= minPinelOMAmount &&
                    appartment.price <= maxPinelOMAmount) {
                    isAlreadyIn = true;
                    programs.push(program);
                }
            });
        });
        return programs.length === 0 ? [pinelOMMaxProgram] : programs;
    }

    static getAppartment(program, investment) {
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

    static getHorizon(investment) {
        const economy = Math.round(investment * 0.29);
        return {
            key: '0',
            duree: '9',
            economy: economy.toString(),
            saving: Math.round(economy / 9).toString(),
        };
    }

    static getInvestment(taxAmount) {
        const investment = Math.ceil(taxAmount * Const.FACTOR.PINEL_OUTREMER);
        const maxInvestment = Math.ceil(Const.MAX_LAW.PINEL_OUTREMER * Const.FACTOR.PINEL_OUTREMER);
        return investment > maxInvestment ? maxInvestment : investment;
    }

    static getTaxByInvestment(investment) {
        const taxAmount = Math.ceil(investment / Const.FACTOR.PINEL_OUTREMER);
        return taxAmount > Const.MAX_LAW.PINEL_OUTREMER ? Const.MAX_LAW.PINEL_OUTREMER : taxAmount;
    }

    static getFinalAmount(taxAmount, investment) {
        const value = taxAmount - this.getTaxByInvestment(investment);
        return value < 0 ? 0 : value;
    }

    static getObject(pinelOMLaw, taxAmount, isFirstTime = true) {
        let investment;
        let finalAmount;
        if (isFirstTime === true) {
            investment = this.getInvestment(taxAmount);
            finalAmount = taxAmount;
        } else {
            investment = taxAmount;
            finalAmount = this.getTaxByInvestment(investment);
        }
        return {
            name: Const.LAW_NAME.PINEL_OUTREMER,
            description: 'Ex pour 9 ans\n' +
            'Cette loi permet une réduction d’impôt\n' +
            'De 29% sur 9 ans. La loi Pinel Outremer peut être souscrite pour 6, 9 ou 12ans',
            investiment: investment.toString(),
            programs: this.getPrograms(pinelOMLaw, finalAmount, isFirstTime),
            horizon: this.getHorizon(investment)
        }
    }

    static getActionSheetValue(investment) {
        return [
            150000,
            200000,
            250000,
            300000,
            investment
        ];
    }

    static getEpargne(rent, investment, taxAmount, gain, duree) {
        const adjustInvest = investment + (investment * 0.55);
        const finalInvest = adjustInvest > Const.MAX_LAW_VALUE.PINEL ? Const.MAX_LAW_VALUE.PINEL_OUTREMER : adjustInvest;
        return TaxLib.getBasicEpargne(rent, adjustInvest, taxAmount, gain, duree);
    }
}