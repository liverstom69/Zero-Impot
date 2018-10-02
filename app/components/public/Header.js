import React from 'react';
import { View, Text, Platform } from 'react-native';

import styles from '../../config/styles';

const Header = () => (
    <View style={[styles.navBarTitleView]}>
      <Text style={[styles.textNavBar, styles.textCenter, styles.container, { marginTop: Platform.OS === "android" ? 0 : 10 }]}>
        <Text style={styles.blueColor}>ZERO </Text>
        <Text style={styles.greyColor}>IMPOT</Text>
      </Text>
    </View>
);

export default Header;