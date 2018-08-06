import React from "react";
import { ScrollView, TouchableOpacity, View, Image, Text, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import I18n from "ex-react-native-i18n";
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionSheet from 'react-native-actionsheet';

import ConstanceButton from "../components/public/ConstanceButton";
import Const from "../config/Const";
import styles from "../config/styles";
import SavingResult from "../components/saving/SavingResult";
import images from "../config/images";
import ProgramItem from "../components/program/ProgramItem";
import TaxLib from "../lib/TaxLib";
import AlertLib from "../lib/AlertLib";

const selectorStyles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: Const.COLOR.GREY,
    },
    euroStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Const.COLOR.GREEN,
    },
    textView: {
        flex: 7,
        padding: 7.5,
        justifyContent: "center"
    },
    icon: {
        flex: 1,
        alignSelf: "center",
    }
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
        if (law.name === Const.LAW_NAME.MALRAUX) {
            investiment = law.appartment.price.toString();
        }
        this.state = {
            epargne: "",
            programs: this.props.navigation.state.params.law.programs,
            value: investiment,
            gain: TaxLib.getGain(investiment)
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
        if (law.name === Const.LAW_NAME.MALRAUX) {
            finalLaw = TaxLib.getMalrauxObject(TaxLib.getMalraux(TaxLib.getProgramFromLaw(basicLaws, Const.LAW_NAME.MALRAUX), value, false), value);
        } else {
            finalLaw = TaxLib.getLawData(basicLaws, law.name, TaxLib.getTaxByInvestmentByLaw(law.name, parseInt(value)));
        }
        this.setState({
            programs: finalLaw.programs,
            value,
            gain: TaxLib.getGain(value),
        });
    }

    handleClickInfo() {
        AlertLib.alertOK("Apport mensuel", "Votre apport mensuel est le différentiel entre\n" +
            "le loyer + le gain d’impôt – le rbt du prêt");
    }

    handleEpargne(epargne) { this.setState({ epargne }) }

    render() {
        const { law, taxAmount } = this.props.navigation.state.params;
        const actionSheetValues = TaxLib.getActionSheetByLaw(
            law.name,
            TaxLib.getInvestmentByLaw(law.name, taxAmount))
            .concat([I18n.t("translation.cancel")]);
        console.log(law);
        return (
            <KeyboardAwareScrollView style={[styles.backgroundWhite]}>
                <View style={[styles.viewWithMarg, styles.alignCenter]}>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.bigText, styles.blackColor, styles.textCenter]}>
                        {I18n.t("translation.titleOperator1").concat(
                            this.props.navigation.state.params.law.name,
                            I18n.t("translation.titleOperator2"))}
                    </Text>
                    <Text style={[styles.smallTextRegular, styles.blueColor, styles.textCenter]}>{I18n.t("translation.subtitleOperator")}</Text>
                    <View style={styles.halfSpace} />
                    <View style={styles.halfSpace} />
                    <View style={[styles.container, styles.justifyCenter, styles.alignCenter]}>
                        <View>
                            <Text style={styles.textCenter}>
                                <Text style={[styles.semiBoldText, styles.blackColor]}>{I18n.t("translation.epargneProgramTitle")}</Text>
                                <Text style={[styles.smallTextRegular, styles.blueColor]}>{I18n.t("translation.epargneProgramSubtitle")}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.alignCenter, { marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ flex: 3, flexDirection: "row", alignItems: "center" }}>
                        <Text style={[styles.smallTextRegular, styles.blueColor, { flex: 1 }]}>Les villes</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={images.pig}
                            style={{ alignSelf: "center", marginHorizontal: 10 }}
                            resizeMode={"contain"}
                        />
                    </View>
                    <View style={[{ flex: 3, flexDirection: "row" }, styles.alignCenter, styles.justifyCenter]}>
                        <Text style={[styles.smallTextRegular, styles.blueColor]}>Apport mensuel</Text>
                        <TouchableOpacity
                            onPress={() => this.handleClickInfo()}
                            style={[styles.justifyCenter, styles.alignCenter, { marginLeft: 5 }]}
                            activeOpacity={0.8}>
                            <Ionicons
                                name="ios-information-circle-outline"
                                size={22}
                                color="pink"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.programs}
                    renderItem={({ item }) => (
                        <ProgramItem
                            navigate={this.props.navigation.navigate}
                            program={item}
                            investiment={parseInt(this.state.value)}
                            law={law}
                            economy={parseInt(law.horizon.economy)}
                            gain={parseInt(this.state.gain)}
                            taxAmount={taxAmount}
                        />
                    )}
                />
                <View style={[styles.viewWithMarg]}>
                    <View style={styles.littleSpace} />
                    <SavingResult
                        value={this.state.gain}
                        text={I18n.t("translation.epargneGain") + law.horizon.duree + " " + I18n.t("translation.years")}
                        titleDescription={"Gain moyen à ".concat(law.horizon.duree, " ans")}
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