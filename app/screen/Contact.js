import React from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Communications from 'react-native-communications';
import I18n from "ex-react-native-i18n";

import styles from "../config/styles";
import ArticleItem from "../components/Article/ArticleItem";
import Const from "../config/Const";
import Input from "../components/public/Input";
import ConstanceButton from "../components/public/ConstanceButton";
import images from "../config/images";
import TaxLib from "../lib/TaxLib";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);

        const { lawName, lawDate, taxAmount, gain, epargne, city, price } = this.props.navigation.state.params;
        const economy = TaxLib.getTaxByInvestmentByLaw(lawName, price);
        const maxEconomy = economy < taxAmount ? economy : taxAmount;
        const data = [
            {
                title: "Votre impôt",
                value: TaxLib.returnNumberFormat(taxAmount.toString()),
                subTitles: [],
            },
            {
                title: "Economie d'impôt",
                value: price === -1 ? I18n.t("translation.resumeNotDefined") : TaxLib.returnNumberFormat(maxEconomy.toString()),
                subTitles: [],
            },
            {
                title: "Montant de l'opération",
                value: price === -1 ? I18n.t("translation.resumeNotDefined") : price.toString(),
                subTitles: [],
            },
            {
                title: "Gain à ".concat(lawDate, " ans"),
                value: price === -1 ? I18n.t("translation.resumeNotDefined") : TaxLib.returnNumberFormat(gain.toString()),
                subTitles: [],
            },
            {
                title: "Votre apport mensuel",
                value: price === -1 ? I18n.t("translation.resumeNotDefined") : TaxLib.returnNumberFormat(epargne),
                subTitles: [],
            },
            {
                title: "Dispositif fiscal",
                value: lawName,
                subTitles: [],
            },
            {
                title: "Ville/Programme choisi",
                value: city,
                subTitles: [],
            }
        ];
        this.state = {
            comment: "",
            phoneNumber: "",
            data
        };

        this.handleComment = this.handleComment.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleClickEmail = this.handleClickEmail.bind(this);
        this.handleClickSMS = this.handleClickSMS.bind(this);
    }

    handleComment(comment) { this.setState({ comment }) }

    handlePhoneNumber(phoneNumber) { this.setState({ phoneNumber }) }

    handleClickEmail() {
        Communications.email(["zeroimpot@support.com"], null, null, "ZERO IMPOT",
            "Bonjour Zero Impôt,\n\n\n" +
            "Merci de nous contacter pour plus de précisions en fonction de ma situation.\n\n" +
            "Récapitulatif\n" +
            "Montant d'impôt: " + this.state.data[0].value + "\n" +
            "Economie d'impôt:" + this.state.data[1].value + "\n" +
            "Gain à " + this.props.navigation.state.params.lawDate + " ans: " + this.state.data[2].value + "\n" +
            "Apport mensuel: " + this.state.data[3].value + "\n" +
            "Dispositif fiscal: " + this.state.data[4].value + "\n" +
            "Ville/Programme choisi" + this.state.data[5].value + "\n\n\n" +
            "Commentaire: \n" + this.state.comment + "\n" +
            "Numéro de téléphone: " + this.state.phoneNumber + "\n\n" +
            "Zero Impôt"
        );
    }

    handleClickSMS() {
        Communications.textWithoutEncoding("0661233060",
            "Bonjour Zero Impôt,\n\n\n" +
            "Montant d'impôt: " + this.state.data[0].value + "\n" +
            "Economie d'impôt:" + this.state.data[1].value + "\n" +
            "Gain à " + this.props.navigation.state.params.lawDate + " ans: " + this.state.data[2].value + "\n" +
            "Apport mensuel: " + this.state.data[3].value + "\n" +
            "Dispositif fiscal: " + this.state.data[4].value + "\n" +
            "Ville/Programme choisi" + this.state.data[5].value + "\n\n\n" +
            "Commentaire: \n" + this.state.comment + "\n" +
            "Numéro de téléphone: " + this.state.phoneNumber + "\n\n" +
            "Zero Impôt"
        );
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.backgroundWhite}>
                <View style={styles.viewWithMarg}>
                    <Text style={[styles.blueColor, styles.mediumTextBold]}>{ I18n.t('translation.resumeTitle') }</Text>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => <ArticleItem key={index} article={item} isLast={index === this.state.data.length - 1} />}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.halfSpace} />
                <View style={styles.viewWithMarg}>
                    <Text style={[styles.blueColor, styles.mediumTextBold]}>{ I18n.t('translation.resumeComment') }</Text>
                    <View style={styles.halfSpace} />
                    <TextInput
                        value={this.state.comment}
                        multiline
                        onChangeText={text => this.handleComment(text)}
                        underlineColorAndroid={"transparent"}
                        style={{ height: 150, borderColor: Const.COLOR.GREY2, borderWidth: 0.5, borderRadius: 5 }}
                    />
                    <View style={styles.halfSpace} />
                    <View style={styles.halfSpace} />
                    <Input
                        value={this.state.phoneNumber}
                        onChangeText={text => this.handlePhoneNumber(text)}
                        isBig
                        isPhone={true}
                        placeholder={I18n.t('translation.resumePhone')}
                    />
                    <View style={styles.halfSpace} />
                    <View style={styles.halfSpace} />
                    <View style={styles.halfSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.resumeEmail')}
                        color={"white"}
                        onPress={() => this.handleClickEmail()}
                        image={images.letter}
                    />
                    <View style={styles.halfSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.resumeSms')}
                        color={Const.COLOR.BLUE}
                        image={images.phone}
                        onPress={() => this.handleClickSMS()}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

Contact.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            params: PropTypes.shape({
                city: PropTypes.string.isRequired,
                lawName: PropTypes.string.isRequired,
                lawDate: PropTypes.string.isRequired,
                imageUrl: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                taxAmount: PropTypes.number.isRequired,
                epargne: PropTypes.string.isRequired,
                gain: PropTypes.number.isRequired,
            }),
        }),
    }),
};