import Const from "../config/Const";
import TaxLib from "./TaxLib";

export default class PinelLib {
    static getPrograms(pinel, taxAmount) {
        const pinelAmount = this.getInvestment(taxAmount);
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
                if (isAlreadyIn === false &&
                    appartment.price >= minPinelAmount &&
                    appartment.price <= maxPinelAmount) {
                    programs.push(program);
                    isAlreadyIn = true
                }
            });
        });
        return programs.length === 0 ? [pinelMaxProgram] : programs;
    }

    static getAppartment(program, investment) {
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

    static getHorizon(investment) {
        const economy = investment * 0.18;
        return {
            key: '0',
            duree: '9',
            economy: economy.toString(),
            saving: Math.round(economy / 9).toString(),
        };
    }

    static getInvestment(taxAmount) {
        const investment = Math.ceil(taxAmount * 50);
        const maxInvestment = Math.ceil(Const.MAX_LAW.PINEL * 50);
        return investment > maxInvestment ? maxInvestment : investment;
    }

    static getTaxByInvestment(investment) {
        const taxAmount = investment / 50;
        return taxAmount > Const.MAX_LAW.PINEL ? Const.MAX_LAW.PINEL : taxAmount;
    }

    static getFinalAmount(taxAmount, investment) {
        const value = taxAmount - investment / 50;
        return value < 0 ? 0 : value;
    }

    static getObject(pinelLaw, taxAmount) {
        const investment = this.getInvestment(taxAmount);
        return {
            name: Const.LAW_NAME.PINEL,
            investiment: investment.toString(),
            description: 'Ex pour 9 ans\n' +
            'Cette loi permet une réduction d’impôt\n' +
            'De 18% sur 9 ans. La loi Pinel peut être souscrite pour 6, 9 ou 12ans',
            programs: this.getPrograms(pinelLaw, taxAmount),
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
        const finalInvest = adjustInvest > Const.MAX_LAW_VALUE.PINEL ? Const.MAX_LAW_VALUE.PINEL : adjustInvest;
        return TaxLib.getBasicEpargne(rent, adjustInvest, taxAmount, gain, duree);
    }
}