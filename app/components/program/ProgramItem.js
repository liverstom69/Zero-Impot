import React from "react";
import {View, TouchableOpacity, Text, Image, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import styles from "../../config/styles";
import images from "../../config/images";
import Const from "../../config/Const";

const elemStyle = StyleSheet.create({
    viewTitle: {
        flex: 4
    },
    viewSubTitle: {
        flex: 2,
    }
});

export default class ProgramItem extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.viewWithMarg}>
                    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={() => this.props.navigate("Appartment", { title: this.props.program.title })}>
                        <View style={[styles.containerSpacing, styles.alignCenter, { paddingTop: 10, paddingBottom: 5 }]}>
                            <View style={elemStyle.viewTitle}>
                                <Text style={[styles.textMedium, styles.greyBlackColor]}>{this.props.program.title}</Text>
                            </View>
                            <View style={elemStyle.viewSubTitle}>
                                <Text style={[styles.textMedium, styles.greyColor2]}>{this.props.program.rent}</Text>
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
        title: PropTypes.string,
        rent: PropTypes.string,
    }).isRequired,
};