//@flow
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styles from "../../config/styles";
import Const from "../../config/Const";

const LawDelimiter = props => (
    <View>
        <View style={styles.halfSpace} />
        <View style={[styles.line]} />
        <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center", borderWidth: 0.5, borderColor: Const.COLOR.GREY, height: 25, width: 140, marginTop: -12.5, backgroundColor: "white" }}>
            <Text style={[styles.blueColor, styles.smallTextMedium]}>{ props.text }</Text>
        </View>
    </View>
);

LawDelimiter.propTypes = {
    text: PropTypes.string.isRequired,
};

export default LawDelimiter;