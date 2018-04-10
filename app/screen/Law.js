import React from "react";
import { ScrollView, View, Image, Text, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import I18n from "ex-react-native-i18n";

import Input from "../components/public/Input";
import ConstanceButton from "../components/public/ConstanceButton";
import Const from "../config/Const";
import styles from "../config/styles";
import SavingResult from "../components/saving/SavingResult";
import images from "../config/images";
import ProgramItem from "../components/program/ProgramItem";

const data = [
    {
        title: "Montpellier",
        rent: "345",
    },
    {
        title: "Bordeaux",
        rent: "310",
    },
    {
        title: "Nice",
        rent: "368",
    },
    {
        title: "Strasbourg",
        rent: "290",
    },
];

export default class Law extends React.Component {
    state: {
        epargne: String,
    };

    constructor(props) {
        super(props);

        this.state = {
            epargne: "",
        };

        this.handleEpargne = this.handleEpargne.bind(this);
    }

    handleEpargne(epargne) { this.setState({ epargne }) }

    render() {
        return (
            <ScrollView style={[styles.backgroundWhite]}>
                <View style={[styles.viewWithMarg]}>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.smallTextRegular, styles.greyColor2]}>{I18n.t("translation.initialText")}</Text>
                    <View style={styles.halfSpace} />
                    <Input
                        value={this.state.epargne}
                        onChangeText={(text) => this.handleEpargne(text)}
                        isBig
                    />
                    <View style={styles.halfSpace} />
                    <View style={styles.littleSpace} />
                    <ConstanceButton
                        title={I18n.t("translation.updateEpargne")}
                        color={Const.COLOR.BLUE}
                        onPress={() => console.log("button")}
                    />
                    <View style={styles.halfSpace} />
                </View>
                <View style={styles.line} />
                <View style={[styles.viewWithMarg]}>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.bigText, styles.blackColor]}>{I18n.t("translation.titleOperator")}</Text>
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
                    data={data}
                    renderItem={({ item }) => <ProgramItem navigate={this.props.navigation.navigate} program={item} />}
                />
                <View style={[styles.viewWithMarg]}>
                    <View style={styles.halfSpace} />
                    <View style={styles.halfSpace} />
                    <SavingResult
                        value={"100000"}
                        text={I18n.t("translation.epargneGain")}
                    />
                    <View style={styles.halfSpace} />
                    <View style={styles.littleSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.contactUs')}
                        color={Const.COLOR.BLUE}
                        image={images.letter}
                        onPress={() => alert('tes')}
                    />
                </View>
            </ScrollView>
        )
    }
}

Law.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }),
};