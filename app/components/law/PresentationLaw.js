import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../../config/styles';
import images from '../../config/images';
import Input from "../public/Input";

export default class PresentationLaw extends React.Component {
  // TODO : Adding ActionSheet action on Input component
  render() {
    return (
      <View>
        <View style={styles.container}>
            <View>
                <View style={presentationStyle.lawView}>
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", marginRight: 5 }}>
                        <Image style={{ width: 23, height: 23, resizeMode: "contain" }} source={images.trash} />
                    </TouchableOpacity>
                  <Text style={[styles.mediumTextBold, styles.greyBlackColor]}>{this.props.name}</Text>
                </View>
                <Text style={[styles.smallTextRegular, styles.greyColor2]}>{I18n.t('translation.investiment')}</Text>
            </View>
          <View style={presentationStyle.textView}>
            <Text style={[styles.smallTextMedium, styles.blueColor]}>{I18n.t('translation.zeroApport')}</Text>
          </View>
        </View>
        <View style={styles.halfSpace} />
        <View style={styles.container}>
          <View style={presentationStyle.lawView}>
            <Input
              value={this.props.value}
              onChangeText={null}
              isBig={false}
              isEdit={false}
            />
          </View>
          <View style={presentationStyle.textView}>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Image source={images.arrow} />
            </TouchableOpacity>
          </View>
        </View>
        </View>
    )
  }
}

const presentationStyle = StyleSheet.create({
  lawView: {
      flex: 6,
      flexDirection: "row",
      paddingRight: 5,
  },
  textView: {
      flex: 3,
      alignItems: 'flex-end',
  }
});

PresentationLaw.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};