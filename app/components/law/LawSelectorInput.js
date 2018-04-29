//@flow
import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ActionSheet from 'react-native-actionsheet';
import I18n from 'ex-react-native-i18n';

import images from "../../config/images";
import styles from "../../config/styles";
import Const from "../../config/Const";
import TaxLib from "../../lib/TaxLib";

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

export default class LawSelectorInput extends React.Component {

    onPress() {
        this.ActionSheet.show();
    };

    render() {
        const actionSheetValues = TaxLib.getActionSheetByLaw(
            this.props.law,
            this.props.basicInvest)
            .concat([I18n.t("translation.cancel")]);
        return (
            <TouchableOpacity
                activeOpacity={Const.ACTIVE_OPACITY}
                onPress={() => this.onPress()}>
                <View style={[styles.container, selectorStyles.container]}>
                    <View style={selectorStyles.textView}>
                        <Text style={[styles.semiBoldText, styles.blueColor]} >{ TaxLib.returnNumberFormat(this.props.value) } </Text>
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
                    destructiveButtonIndex={actionSheetValues.indexOf(TaxLib.returnNumberFormat(this.props.value))}
                    onPress={(index) => {
                        if (index !== actionSheetValues.length - 1) {
                            this.props.onPressActionSheet(TaxLib.deleteSpace(actionSheetValues[index]))
                        }
                    }}
                />
            </TouchableOpacity>
        )
    }
}
LawSelectorInput.propTypes = {
    value: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    law: PropTypes.string.isRequired,
    basicValue: PropTypes.string.isRequired,
    onPressActionSheet: PropTypes.func.isRequired,
    basicInvest: PropTypes.number.isRequired,
};