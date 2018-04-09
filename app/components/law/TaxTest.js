import React from "react";
import CheckBox from 'react-native-checkbox';
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import images from "../../config/images";
import styles from "../../config/styles";

const styleTax = StyleSheet.create({
    viewStyle: {
        flexDirection: "row",
        alignItems: "flex-start",
        height: 55,
        marginBottom: 10,
    },
    checkStyle: {
        paddingHorizontal: 10
    }
});

export default class TaxTest extends React.PureComponent {
    render() {
        console.log(this.props.isChecked);
        return (
            <View style={styleTax.viewStyle}>
                <CheckBox
                    label={""}
                    containerStyle={styleTax.checkStyle}
                    onChange={() => this.props.onClick(this.props.taxConcern)}
                    checked={this.props.isChecked}
                    checkedImage={images.checkboxChecked}
                    uncheckedImage={images.checkboxUnchecked}
                />
                <Text>
                    <Text style={[styles.smallMediumTB, styles.greyBlackColor]}>{ this.props.title }</Text>
                    {this.props.subTitle !== undefined && <Text style={[styles.smallTextRegular, styles.greyColor2]}>{'\n'}{ this.props.subTitle }</Text>}
                </Text>
            </View>
        );
    }
}

TaxTest.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    taxConcern: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
};