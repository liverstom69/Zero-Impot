import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import PropTypes from "prop-types";
import I18n from "ex-react-native-i18n";

import styles from "../config/styles";
import Const from "../config/Const";
import images from "../config/images";
import ConstanceButton from "../components/public/ConstanceButton";

export default class Appartment extends React.Component {
    render() {
        return (
            <ScrollView style={styles.backgroundWhite}>
                <Image
                    style={{ height: 251, backgroundColor: Const.COLOR.GREY }}
                    resizeMode={"cover"}
                />
                <View style={styles.viewWithMarg}>
                    <Text style={[styles.blackColor, styles.semiBoldText]}>{ I18n.t("translation.appartmentDescription") }</Text>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.greyColor2, styles.textMedium]}>La résidence est parfaitement implantée à Montpellier, à proximité du quartier moderne d'Antigone au Sud de la ville et à quelques minutes à pied du centre historique de Montpellier, plus communément appelé l'Ecusson, la superbe place de la Comédie, et ses nombreux hôtels particuliers.</Text>
                    <View style={styles.halfSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.contactUs')}
                        color={Const.COLOR.BLUE}
                        image={images.letter}
                        onPress={() => this.props.navigation.navigate("Article")}
                    />
                </View>
            </ScrollView>
        )
    }
}
