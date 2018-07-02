import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";

import styles from '../../config/styles';

const HeaderTitle = props => (
    <View style={styles.navBarTitleView}>
        <View style={styles.littleSpace} />
        <Text style={[styles.textBold, styles.greyBlackColor, styles.justifyCenter, styles.textCenter, styles.container]}>
            { props.title }
        </Text>
    </View>
);

HeaderTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeaderTitle;