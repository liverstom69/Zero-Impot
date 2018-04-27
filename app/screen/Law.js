import React from "react";
import { ScrollView, TouchableOpacity, View, Image, Text, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import I18n from "ex-react-native-i18n";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionSheet from 'react-native-actionsheet';

import ConstanceButton from "../components/public/ConstanceButton";
import Const from "../config/Const";
import styles from "../config/styles";
import SavingResult from "../components/saving/SavingResult";
import images from "../config/images";
import ProgramItem from "../components/program/ProgramItem";
import TaxLib from "../lib/TaxLib";
import Input from '../components/public/Input';

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
        const investiment = law.investiment.toString();
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
        let finalLaw = TaxLib.getLawData(basicLaws, law.name, TaxLib.getTaxByInvestmentByLaw(law.name, parseInt(value)));
        this.setState({
            programs: finalLaw.programs,
            value,
            gain: TaxLib.getGain(value),
        });
    }

    handleEpargne(epargne) { this.setState({ epargne }) }

    render() {
        const { law, taxAmount } = this.props.navigation.state.params;
        const actionSheetValues = TaxLib.getActionSheetByLaw(
            law.name,
            TaxLib.getInvestmentByLaw(law.name, taxAmount))
            .concat([I18n.t("translation.cancel")]);
        return (
            <KeyboardAwareScrollView style={[styles.backgroundWhite]}>
                <View style={[styles.viewWithMarg]}>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.bigText, styles.blackColor]}>
                        {I18n.t("translation.titleOperator1").concat(
                            this.props.navigation.state.params.law.name,
                            I18n.t("translation.titleOperator2"))}
                    </Text>
                    <Text style={[styles.smallTextRegular, styles.blueColor, { paddingLeft: 7.5 }]}>{I18n.t("translation.subtitleOperator")}</Text>
                    <View style={styles.halfSpace} />
                    <View style={styles.halfSpace} />
                    <View style={[styles.container, { justifyContent: "center" }]}>
                        <Image
                            source={images.pig}
                            style={{ alignSelf: "center", marginRight: 10 }}
                            resizeMode={"contain"}
                        />
                        <View>
                            <Text>
                                <Text style={[styles.semiBoldText, styles.blackColor]}>{I18n.t("translation.epargneProgramTitle")}</Text>
                                <Text style={[styles.smallTextRegular, styles.blueColor]}>{I18n.t("translation.epargneProgramSubtitle")}</Text>
                            </Text>
                        </View>
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
                            gain={parseInt(this.state.gain)}
                            taxAmount={taxAmount}
                        />
                    )}
                />
                <View style={[styles.viewWithMarg]}>
                    <View style={styles.littleSpace} />
                    <SavingResult
                        value={this.state.gain}
                        text={I18n.t("translation.epargneGain")}
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
                                <Text style={[styles.semiBoldText, styles.blueColor]} >{ this.state.value } </Text>
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
                            destructiveButtonIndex={actionSheetValues.indexOf(this.state.value)}
                            onPress={(index) => {
                                if (index !== actionSheetValues.length - 1) {
                                    this.handleClickActionSheet(actionSheetValues[index]);
                                }
                            }}
                        />
                    </TouchableOpacity>
                    <View style={styles.halfSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.contactUs')}
                        color={Const.COLOR.BLUE}
                        image={images.letter}
                        onPress={() => this.props.navigation.navigate("Article")}
                    />
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
                    investiment: PropTypes.string,
                }),
                basicLaws: PropTypes.array,
                taxAmount: PropTypes.number,
            })
        })
    }),
};