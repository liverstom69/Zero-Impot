import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../config/styles';
import images from '../../config/images';

export default class ElemItem extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.viewWithMarg}>
          <TouchableOpacity onPress={() => this.props.item.onPress(this.props.item.id)}>
            <View style={[styles.containerSpacing, styles.alignCenter]}>
              <View style={elemStyle.viewText}>
                <Text style={[styles.textMedium, styles.greyBlackColor]}>{this.props.item.title}</Text>
              </View>
              {this.props.item.optionalText && <Text style={[styles.textMedium, styles.greyColor2]}>{this.props.item.optionalText}</Text>}
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

const elemStyle = StyleSheet.create({
  viewText: {
    width: 150,
  },
});

ElemItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    optionalText: PropTypes.string,
  }).isRequired,
};