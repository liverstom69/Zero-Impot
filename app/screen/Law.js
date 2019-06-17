import React from "react";
import { ScrollView, TouchableOpacity, View, Image, Text, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import I18n from "ex-react-native-i18n";
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionSheet from 'react-native-actionsheet';

import ConstanceButton from "../components/public/ConstanceButton";
import SmsButton from '../components/public/SmsButton';
import Const from "../config/Const";
import styles from "../config/styles";
import SavingResult from "../components/saving/SavingResult";
import images from "../config/images";
import ProgramItem from "../components/program/ProgramItem";
import TaxLib from "../lib/TaxLib";
import AlertLib from "../lib/AlertLib";
import MHLib from "../lib/MHLib";
import MalrauxLib from "../lib/MalrauxLib";
import PinelLib from "../lib/PinelLib";
import PinelOMLib from "../lib/PinelOMLib";

const selectorStyles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: Const.COLOR.GREY,
    },
    euroStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Const.COLOR.GREY,
    },
    textView: {
        flex: 7,
        padding: 7.5,
        justifyContent: "center"
    },
    icon: {
        flex: 1,
        alignSelf: "center",
    },
});

export default class Law extends React.Component {
    state: {
        epargne: String,
        programs: Array,
        value: String,
        gain: String,
    };

    constructor(props) {
        super(props);

        const { law } = this.props.navigation.state.params;
        let investiment = law.investiment.toString();
        console.log(law.investiment);
        this.state = {
            law,
            epargne: "",
            programs: this.filterPrograms(this.props.navigation.state.params.law.programs.sort((a, b) => this.compare(a, b, law, parseInt(investiment)))),
            value: investiment,
            gain: TaxLib.getGain(TaxLib.getGainByLaw(law.name, law))
        };

        this.handleEpargne = this.handleEpargne.bind(this);
        this.handleClickActionSheet = this.handleClickActionSheet.bind(this);
    }

    onPress() {
        console.log(parseInt(this.props.navigation.state.params.law.investiment));
        this.ActionSheet.show();
    };

    handleClickActionSheet(value) {
        const { law, basicLaws } = this.props.navigation.state.params;
        let finalLaw;
        let intValue = parseInt(value);
        let programs = TaxLib.getProgramFromLaw(this.props.navigation.state.params.basicLaws, law.name);
        if (law.name === Const.LAW_NAME.MALRAUX) {
            finalLaw = MHLib.getSpecificObject(MalrauxLib.getObject(programs, TaxLib.getTaxByInvestmentByLaw(law.name, intValue), true), intValue);
        } else if (law.name === Const.LAW_NAME.MONUMENT_HISTORIQUE) {
            finalLaw = MHLib.getSpecificObject(MHLib.getObject(programs, TaxLib.getTaxByInvestmentByLaw(law.name, intValue), true), intValue);
        } else if (law.name === Const.LAW_NAME.PINEL_OUTREMER) {
            finalLaw = PinelOMLib.getObject(programs, intValue, false);
        } else {
            finalLaw = TaxLib.getLawData(basicLaws, law.name, TaxLib.getTaxByInvestmentByLaw(law.name, intValue));
        }
        this.setState({
            law: finalLaw,
            programs: this.filterPrograms(finalLaw.programs.sort((a, b) => this.compare(a, b, finalLaw, intValue))),
            value,
            gain: TaxLib.getGain(TaxLib.getGainByLaw(finalLaw.name, finalLaw)),
        });
    }

    handleClickInfo() {
        AlertLib.alertOK("Apport mensuel", "Votre apport mensuel est le différentiel entre\n" +
            "le loyer + le gain d’impôt – le remboursement du prêt");
    }

    handleEpargne(epargne) { this.setState({ epargne }) }

    compare(a,b, law, investment) {
        const { taxAmount } = this.props.navigation.state.params;
        const appartmentA = TaxLib.getAppartmentByLaw(law.name, a, investment);
        const appartmentB = TaxLib.getAppartmentByLaw(law.name, b, investment);
        const epargneA = TaxLib.getEpargneByLaw(appartmentA.rent, appartmentA.price, taxAmount, parseInt(TaxLib.getGlobalEconomy(law.name, appartmentA)), law.horizon.duree, law.name);
        const epargneB = TaxLib.getEpargneByLaw(appartmentB.rent, appartmentB.price, taxAmount, parseInt(TaxLib.getGlobalEconomy(law.name, appartmentB)), law.horizon.duree, law.name);
        return parseInt(epargneA) > parseInt(epargneB);
    }

    filterPrograms(array) {
        const maxNumber = 3;
        let finalArray = [];
        while (finalArray.length < maxNumber && finalArray.length < array.length) {
            finalArray.push(array[finalArray.length]);
        }
        return finalArray;
    }

    render() {
        const { taxAmount } = this.props.navigation.state.params;
        const { law } = this.state;
        const actionSheetValues = TaxLib.getActionSheetByLaw(
            law.name,
            TaxLib.getInvestmentByLaw(law.name, taxAmount))
            .concat([I18n.t("translation.cancel")]);
        const cityText = law.name === Const.LAW_NAME.PINEL_OUTREMER ? "DOM TOM" : "Les villes";
        return (
            <KeyboardAwareScrollView style={[styles.backgroundWhite]}>
                <View style={[styles.viewWithMarg, styles.alignCenter]}>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.bigText, styles.blackColor, styles.textCenter]}>
                        {I18n.t("translation.titleOperator1").concat(
                            this.props.navigation.state.params.law.name,
                            I18n.t("translation.titleOperator2"))}
                    </Text>
                    <Text style={[styles.smallTextRegular, styles.blackColor, styles.textCenter]}>{I18n.t("translation.subtitleOperator")}</Text>
                    <View style={styles.halfSpace} />
                    <View style={[styles.container, styles.justifyCenter, styles.alignCenter]}>
                        <Text style={[styles.textCenter, styles.semiBoldText, styles.blackColor]}>{I18n.t("translation.epargneProgramTitle")}</Text>
                    </View>
                </View>
                <View style={[styles.alignCenter, { marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ flex: 4, flexDirection: "row", alignItems: "flex-end", justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                        <Text style={[styles.smallTextRegular, styles.blueColor, { flex: 1 }]}>{ cityText }</Text>
                    </View>
                    <View style={{ flex: 2, alignSelf: 'stretch', justifyContent: 'flex-start' }}>
                        <Image
                            source={images.pig}
                            style={{ alignSelf: "center" }}
                            resizeMode={"contain"}
                        />
                        <View style={[{ flexDirection: "row" }, styles.alignCenter, styles.justifyCenter]}>
                            <Text style={[styles.smallTextRegular, styles.blueColor]}>Apport mensuel</Text>
                            <TouchableOpacity
                                onPress={() => this.handleClickInfo()}
                                style={[styles.infoTextView, styles.justifyCenter, styles.alignCenter, { marginLeft: 5 }]}
                                activeOpacity={0.8}>
                                <Text style={styles.infoText}>info</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[{ flex: 1, flexDirection: "row", alignSelf: 'stretch' }]} />
                </View>
                <FlatList
                    data={this.state.programs}
                    renderItem={({ item }) => {
                        const apartment = TaxLib.getAppartmentByLaw(law.name, item, parseInt(this.state.value));
                        console.log(apartment);
                        return (
                            <ProgramItem
                                navigate={this.props.navigation.navigate}
                                program={item}
                                appartment={apartment}
                                investiment={parseInt(this.state.value)}
                                law={law}
                                economy={parseInt(TaxLib.getGlobalEconomy(law.name, apartment))}
                                taxAmount={taxAmount}
                            />
                        )
                    }}
                />
                <View style={[styles.viewWithMarg]}>
                    <View style={styles.littleSpace} />
                    <SavingResult
                        value={this.state.gain}
                        text={I18n.t("translation.epargneGain") + law.horizon.duree + " " + I18n.t("translation.years")}
                        titleDescription={"Votre capital à ".concat(law.horizon.duree, " ans")}
                        description={"Le gain moyen est le capital constitué en cas de vente à ".concat(law.horizon.duree, " ans\ndiminué du capital restant dû à la banque")}
                    />
                    <View style={styles.littleSpace} />
                    <View style={styles.littleSpace} />
                    <Text style={[styles.smallTextRegular, styles.greyColor2]}>{I18n.t("translation.initialText")}</Text>
                    <View style={styles.halfSpace} />
                    <TouchableOpacity
                        activeOpacity={Const.ACTIVE_OPACITY}
                        onPress={() => this.onPress()}>
                        <View style={[styles.container, selectorStyles.container]}>
                            <View style={selectorStyles.textView}>
                                <Text style={[styles.semiBoldText, styles.blueColor]} >{ TaxLib.returnNumberFormat(this.state.value) } </Text>
                            </View>
                            <Image
                                source={images.shape}
                                style={selectorStyles.icon}
                                resizeMode={"contain"}
                            />
                            <View style={[selectorStyles.euroStyle, { flex: 2 }]}>
                                <Text style={[styles.textRegular, styles.whiteColor]}>€</Text>
                            </View>
                        </View>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            options={actionSheetValues}
                            cancelButtonIndex={actionSheetValues.length - 1}
                            destructiveButtonIndex={actionSheetValues.indexOf(TaxLib.returnNumberFormat(this.state.value))}
                            onPress={(index) => {
                                if (index !== actionSheetValues.length - 1) {
                                    this.handleClickActionSheet(TaxLib.deleteSpace(actionSheetValues[index]));
                                }
                            }}
                        />
                    </TouchableOpacity>
                    <View style={styles.halfSpace} />
                </View>
                <SmsButton />
            </KeyboardAwareScrollView>
        )
    }
}

Law.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            params: PropTypes.shape({
                law: PropTypes.shape({
                    name: PropTypes.string,
                    programs: PropTypes.array,
                    horizon: PropTypes.shape({
                        economy: PropTypes.string,
                    }),
                    investiment: PropTypes.string,
                }),
                basicLaws: PropTypes.array,
                taxAmount: PropTypes.number,
            })
        })
    }),
};