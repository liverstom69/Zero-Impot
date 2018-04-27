import React from "react";
import {View, TouchableOpacity, Text, Image, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import styles from "../../config/styles";
import images from "../../config/images";
import Const from "../../config/Const";
import TaxLib from "../../lib/TaxLib";

const elemStyle = StyleSheet.create({
    viewTitle: {
        flex: 4
    },
    viewSubTitle: {
        flex: 2,
    }
});

export default class ProgramItem extends React.Component {

    componentDidMount() {
        Image.prefetch(this.props.program.image.url);
    }

    render() {
        return (
            <View>
                <View style={styles.viewWithMarg}>
                    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={() => this.props.navigate("Appartment", { title: this.props.program.title })}>
                        <View style={[styles.containerSpacing, styles.alignCenter, { paddingTop: 10, paddingBottom: 5 }]}>
                            <View style={elemStyle.viewTitle}>
                                <Text style={[styles.textMedium, styles.greyBlackColor]}>{this.props.program.city}</Text>
                            </View>
                            <View style={elemStyle.viewSubTitle}>
                                <Text style={[styles.textMedium, styles.greyColor2]}>{TaxLib.getAverageAppartment(this.props.program.apartments)}</Text>
                            </View>
                            <Image
                                source={images.arrow}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
        )
    }
}

ProgramItem.propTypes = {
    navigate: PropTypes.func.isRequired,
    program: PropTypes.shape({
        image: PropTypes.shape({
            url: PropTypes.string,
        }),
        title: PropTypes.string,
        rent: PropTypes.string,
    }).isRequired,
};