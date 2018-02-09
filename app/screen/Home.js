//@flow
import React from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from '../config/styles';
import Const from '../config/Const';
import Input from '../components/public/Input';
import ConstanceButton from '../components/public/ConstanceButton';
import images from '../config/images';
import TaxLib from '../lib/TaxLib';
import AlertLib from "../lib/AlertLib";

export default class Home extends React.Component {
  state: {
    value: String,
    socity: String,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      socity: '',
    };
    this.returnButtonColor = this.returnButtonColor.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeSocity = this.onChangeSocity.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  returnButtonColor() : String {
    return this.state.value.length > 0 ? Const.COLOR.BLUE : Const.COLOR.GREY;
  }

  onChangeValue(value: String) {
    if (!TaxLib.checkNumber(value)) this.setState({ value });
  }

  onChangeSocity(socity: String) {
    if (!TaxLib.checkNumber(socity)) this.setState({ socity });
  }

  onClickButton() {
    if (this.state.value.length === 0) {
      AlertLib.alertOK(I18n.t('translation.errorTaxLenght'));
      return;
    }
    if (parseInt(this.state.value) <= 2500) {
      AlertLib.alertOK(I18n.t('translation.errorTaxValue'));
      return;
    }
    this.props.navigation.navigate('Result');
  }

  render() {
    return (
      <View style={styles.scrollView}>
        <KeyboardAwareScrollView bounces={false}>
          <ScrollView bounces={false}>
            <View style={styles.viewWithMarg}>
              <Text style={[styles.bigText, styles.greyBlackColor]}>{I18n.t('translation.tax')}</Text>
              <Text style={[styles.bigText, styles.greyBlackColor, styles.textCenter]}>{I18n.t('translation.customer')}</Text>
              <Input
                value={this.state.value}
                onChangeText={(text) => this.onChangeValue(text)}
                isBig
              />
            </View>
            <View style={styles.halfSpace} />
            <View style={styles.line} />
            <View style={styles.halfSpace} />
            <View style={styles.viewWithMarg}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={images.point} style={{marginRight: 10}}/>
                <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.socity')}</Text>
              </View>
              <Input
                value={this.state.socity}
                onChangeText={(text) => this.onChangeSocity(text)}
                isBig={false}
              />
              <View style={styles.halfSpace} />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <View style={{height: 92}}>
          <ConstanceButton
              title={I18n.t('translation.launchSimulation')}
              color={this.returnButtonColor()}
              isBottom
              onPress={this.onClickButton}
          />
        </View>
      </View>
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
};