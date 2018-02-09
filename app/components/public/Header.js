import React from 'react';
import { Text } from 'react-native';

import styles from '../../config/styles';

const Header = () => (
  <Text style={[styles.textBold, styles.textCenter]}>
    <Text style={styles.blueColor}>ZERO </Text>
    <Text style={styles.greyColor}>IMPOT</Text>
  </Text>
);

export default Header;