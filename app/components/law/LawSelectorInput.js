//@flow
import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ActionSheet from 'react-native-actionsheet';
import I18n from 'ex-react-native-i18n';

import images from "../../config/images";
import styles from "../../config/styles";
import Const from "../../config/Const";

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
        return (
            <TouchableOpacity
                activeOpacity={Const.ACTIVE_OPACITY}
                onPress={() => this.onPress()}>
                <View style={[styles.container, selectorStyles.container]}>
                    <View style={selectorStyles.textView}>
                        <Text style={[styles.semiBoldText, styles.blueColor]} >{ this.props.value } </Text>
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
                    options={['Apple', 'Banana', I18n.t("translation.cancel")]}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => { /* do something */ }}
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
};