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
        const { imageUrl, description } = this.props.navigation.state.params;
        return (
            <ScrollView style={styles.backgroundWhite}>
                <Image
                    style={{ height: 251, backgroundColor: Const.COLOR.GREY }}
                    resizeMode={"cover"}
                    source={{ uri: imageUrl }}
                />
                <View style={styles.viewWithMarg}>
                    <Text style={[styles.blackColor, styles.semiBoldText]}>{ I18n.t("translation.appartmentDescription") }</Text>
                    <View style={styles.littleSpace} />
                    <Text style={[styles.greyColor2, styles.textMedium]}>{ description }</Text>
                    <View style={styles.halfSpace} />
                    <ConstanceButton
                        title={I18n.t('translation.contactUs')}
                        color={Const.COLOR.BLUE}
                        onPress={() => this.props.navigation.navigate("Contact", {
                            ...this.props.navigation.state.params
                        })}
                    />
                </View>
            </ScrollView>
        )
    }
}

Appartment.propTypes = {
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