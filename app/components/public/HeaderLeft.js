import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import images from '../../config/images';
import styles from '../../config/styles';

export default class HeaderLeft extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.headerLeft}
        onPress={() => this.props.navigation.goBack()}>
        <Image
          source={images.backLogo}
        />
      </TouchableOpacity>
    )
  }
}

HeaderLeft.propTypes = {
  navigation: PropTypes.object.isRequired,
};