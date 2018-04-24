import React from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import I18n from "ex-react-native-i18n";

import styles from "../config/styles";
import ArticleItem from "../components/Article/ArticleItem";
import Const from "../config/Const";
import Input from "../components/public/Input";
import ConstanceButton from "../components/public/ConstanceButton";
import images from "../config/images";

const data = [
    {
        title: "Montant d'impôt",
        value: "300000",
        subTitles: [],
    },
    {
        title: "Economie d'impôt",
        value: "160000",
        subTitles: [],
    },
    {
        title: "Gain impôt",
        value: "160000",
        subTitles: [],
    },
    {
        title: "Epargne",
        value: "160000",
        subTitles: [],
    },
    {
        title: "Dispositif fiscal",
        value: "160000",
        subTitles: [],
    },
    {
        title: "Ville/Programme choisi",
        value: "160000",
        subTitles: [],
    }
];

export default class Contact extends React.Component {
    render() {
        return (
            <KeyboardAwareScrollView style={styles.backgroundWhite}>
                <View style={styles.viewWithMarg}>
                    <Text style={[styles.blueColor, styles.mediumTextBold]}>{ I18n.t('translation.resumeTitle') }</Text>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => <ArticleItem key={index} article={item} isLast={index === data.length - 1} />}
                    />
                </View>
                <View style={styles.halfSpace} />
                <View style={styles.line} />
                <View style={styles.halfSpace} />
                <View style={styles.viewWithMarg}>
                    <Text style={[styles.blueColor, styles.mediumTextBold]}>{ I18n.t('translation.resumeComment') }</Text>
                    <View style={styles.halfSpace} />
                    <TextInput
                        value={""}
                        multiline
                        underlineColorAndroid={"transparent"}
                        style={{ height: 150, borderColor: Const.COLOR.GREY2, borderWidth: 0.5, borderRadius: 5 }}
                    />
                    <View style={styles.halfSpace} />
                    <View style={styles.halfSpace} />
                    <Input
                        value={""}
                        onChangeText={() => console.log("t")}
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
                        onPress={() => console.log("test")}
                        image={images.letter}
                    />
                    <View style={styles.halfSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.resumeSms')}
                        color={Const.COLOR.BLUE}
                        image={images.phone}
                        onPress={() => alert('tes')}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}