import React from "react";
import {View, TouchableOpacity, Text, Image, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from '@expo/vector-icons';

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
        const appartment = this.props.appartment;
        const epargne = TaxLib.getEpargneByLaw(appartment.rent, appartment.price, this.props.taxAmount, this.props.economy, this.props.law.horizon.duree, this.props.law.name);
        return (
            <View>
                <View style={styles.viewWithMarg}>
                    <TouchableOpacity
                        activeOpacity={Const.ACTIVE_OPACITY}
                        onPress={() => this.props.navigate("Appartment",{
                            lawName: this.props.law.name,
                            lawDate: this.props.law.horizon.duree,
                            city: this.props.program.city,
                            imageUrl: this.props.program.image.url,
                            description: this.props.program.description,
                            appartment,
                            price: appartment.price,
                            taxAmount: this.props.taxAmount,
                            epargne,
                            gain: TaxLib.getGlobalGain(appartment, this.props.law.name),
                        })}>
                        <View style={[styles.containerSpacing, styles.alignCenter, { paddingTop: 10, paddingBottom: 5 }]}>
                            <View style={elemStyle.viewTitle}>
                                <Text style={[styles.textMedium, styles.greyBlackColor]}>{this.props.program.city}</Text>
                            </View>
                            <View style={elemStyle.viewSubTitle}>
                                <Text style={[styles.textMedium, styles.greyColor2]}>{ TaxLib.returnNumberFormat(epargne) }</Text>
                            </View>
                            <View>
                                <Text style={[styles.smallTextMedium, styles.greyBlackColor]}>VOIR</Text>
                            </View>
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
    appartment: PropTypes.object.isRequired,
    taxAmount: PropTypes.number.isRequired,
    investiment: PropTypes.number.isRequired,
    economy: PropTypes.number.isRequired,
    law: PropTypes.shape({
        name: PropTypes.string,
        horizon: PropTypes.shape({
            duree: PropTypes.string.isRequired,
        })
    }).isRequired,
    program: PropTypes.shape({
        image: PropTypes.shape({
            url: PropTypes.string,
        }),
        title: PropTypes.string,
        rent: PropTypes.string,
    }).isRequired,
};