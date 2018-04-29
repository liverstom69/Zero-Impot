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
        const appartment = TaxLib.getAppartmentByLaw(this.props.law.name, this.props.program, this.props.investiment);
        const epargne = TaxLib.getEpargne(appartment.rent, appartment.price, this.props.taxAmount, this.props.gain, this.props.law.horizon.duree);
        return (
            <View>
                <View style={styles.viewWithMarg}>
                    <TouchableOpacity
                        activeOpacity={Const.ACTIVE_OPACITY}
                        onPress={() => this.props.navigate("Appartment",{
                            lawName: this.props.law.name,
                            city: this.props.program.city,
                            imageUrl: this.props.program.image.url,
                            description: this.props.program.description,
                            price: TaxLib.getAppartmentValue(appartment, this.props.law.name),
                            taxAmount: this.props.taxAmount,
                            epargne,
                            gain: this.props.gain,
                        })}>
                        <View style={[styles.containerSpacing, styles.alignCenter, { paddingTop: 10, paddingBottom: 5 }]}>
                            <View style={elemStyle.viewTitle}>
                                <Text style={[styles.textMedium, styles.greyBlackColor]}>{this.props.program.city}</Text>
                            </View>
                            <View style={elemStyle.viewSubTitle}>
                                <Text style={[styles.textMedium, styles.greyColor2]}>{ TaxLib.returnNumberFormat(epargne) }</Text>
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
    gain: PropTypes.number.isRequired,
    taxAmount: PropTypes.number.isRequired,
    investiment: PropTypes.number.isRequired,
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