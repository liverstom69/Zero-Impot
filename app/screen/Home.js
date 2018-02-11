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
import TaxTest from "../components/law/TaxTest";

export default class Home extends React.Component {
  state: {
      value: String,
      socity: String,
      taxConcern: Number,
  };

  constructor(props) {
      super(props);
      this.state = {
          value: '45678',
          socity: '',
          taxConcern: 1,
      };
      this.returnButtonColor = this.returnButtonColor.bind(this);
      this.onChangeValue = this.onChangeValue.bind(this);
      this.onChangeSocity = this.onChangeSocity.bind(this);
      this.onClickButton = this.onClickButton.bind(this);
      this.selectTaxConcern = this.selectTaxConcern.bind(this);
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

  selectTaxConcern(taxConcern) {
    if (taxConcern !== this.state.taxConcern) {
        this.setState({ taxConcern });
    }
  }

  render() {
      return (
          <View style={styles.scrollView}>
              <KeyboardAwareScrollView bounces={false}>
                  <ScrollView bounces={false}>
                      <View style={styles.viewWithMarg}>
                          <Text style={[styles.mediumTextBold, styles.greyBlackColor]}>{I18n.t('translation.taxQuestion')}</Text>
                        </View>
                    <TaxTest
                        title={I18n.t('translation.irTax')}
                        taxConcern={Const.TAX.IR}
                        onClick={() => this.selectTaxConcern(Const.TAX.IR)}
                        isChecked={this.state.taxConcern === Const.TAX.IR}
                    />
                      <TaxTest
                          title={I18n.t('translation.bfTax')}
                          subTitle={I18n.t('translation.bfTaxSub')}
                          taxConcern={Const.TAX.BF}
                          onClick={() => this.selectTaxConcern(Const.TAX.BF)}
                          isChecked={this.state.taxConcern === Const.TAX.BF}
                      />
                      <TaxTest
                          title={I18n.t('translation.isTax')}
                          subTitle={I18n.t('translation.isTaxSub')}
                          taxConcern={Const.TAX.IS}
                          onClick={() => this.selectTaxConcern(Const.TAX.IS)}
                          isChecked={this.state.taxConcern === Const.TAX.IS}
                      />
                      {this.state.taxConcern === Const.TAX.IR &&
                      (
                          <View style={styles.viewWithMMarg}>
                              <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.tax')}</Text>
                              <Input
                                  value={this.state.value}
                                  onChangeText={(text) => this.onChangeValue(text)}
                                  isBig
                              />
                              <View style={styles.halfSpace} />
                          </View>
                      )
                      }
                      {this.state.taxConcern === Const.TAX.BF &&
                      (
                          <View style={styles.viewWithMMarg}>
                              <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.taxIR')}</Text>
                              <Input
                                  value={this.state.value}
                                  onChangeText={(text) => this.onChangeValue(text)}
                                  isBig
                              />
                              <View style={styles.halfSpace} />
                              <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.bfTaxText')}</Text>
                              <Input
                                  value={this.state.value}
                                  onChangeText={(text) => this.onChangeValue(text)}
                                  isBig={false}
                              />
                              <View style={styles.halfSpace} />
                              <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.numberParts')}</Text>
                              <Input
                                  value={this.state.value}
                                  onChangeText={(text) => this.onChangeValue(text)}
                                  isBig={false}
                              />
                              <View style={styles.halfSpace} />
                          </View>
                      )}
                      {this.state.taxConcern === Const.TAX.IS &&
                      (
                          <View style={styles.viewWithMMarg}>
                              <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.taxSocity')}</Text>
                              <Input
                                  value={this.state.value}
                                  onChangeText={(text) => this.onChangeValue(text)}
                                  isBig
                              />
                              <View style={styles.halfSpace} />
                          </View>
                      )
                      }
                  </ScrollView>
                  <View style={{height: 92}}>
                      <ConstanceButton
                          title={I18n.t('translation.launchSimulation')}
                          color={this.returnButtonColor()}
                          isBottom
                          onPress={this.onClickButton}
                      />
                  </View>
              </KeyboardAwareScrollView>
          </View>
      );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
};