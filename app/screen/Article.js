import React from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import I18n from "ex-react-native-i18n";
let moment = require('moment');

import styles from "../config/styles";
import images from "../config/images";
import SavingResult from "../components/saving/SavingResult";
import ArticleItem from "../components/Article/ArticleItem";
import ConstanceButton from "../components/public/ConstanceButton";
import Const from "../config/Const";

const data = [
    {
        title: "Montant Opération",
        value: "300000",
        subTitles: [
            {
                title: "Conservation 6 ans minimum",
                value: "-1",
            }
        ],
    },
    {
        title: "Economie d'impôt",
        value: "",
        subTitles: [
            {
                title: "En ".concat(moment().format("YYYY")),
                value: "100000",
            },
            {
                title: "De ".concat(moment().format("YYYY"), " à ", moment().add(4, "year").format("YYYY")),
                value: "100000",
            }
        ],
    },
    {
        title: "Revenu locatif",
        value: "160000",
        subTitles: [],
    },
    {
        title: "Gain à ".concat("6", " ans"),
        value: "160000",
        subTitles: [],
    }
];

export default class Article extends React.Component {
    render() {
        return (
            <ScrollView style={styles.backgroundWhite}>
                <View style={styles.halfSpace} />
                <View style={styles.viewWithMarg}>
                    <SavingResult
                        value={"0"}
                        text={I18n.t('translation.taxYear').concat(moment().format("YYYY"))}
                        image={images.smiley}
                    />
                    <View style={styles.halfSpace} />
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => <ArticleItem key={index} article={item} isLast={index === data.length - 1} />}
                    />
                </View>
                    <View style={styles.halfSpace} />
                    <View style={styles.line} />
                    <View style={styles.halfSpace} />
                <View style={styles.viewWithMarg}>
                    <View style={styles.halfSpace} />
                    <Text style={[styles.greyColor2, styles.smallTextRegular]}>{ I18n.t('translation.articleDef') }</Text>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.blackColor, styles.smallTextRegular]}>{ I18n.t('translation.articleOperation') }</Text>
                    <View style={styles.halfSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.contactUs')}
                        color={Const.COLOR.BLUE}
                        image={images.letter}
                        onPress={() => alert('tes')}
                    />
                </View>
            </ScrollView>
        );
    }
}