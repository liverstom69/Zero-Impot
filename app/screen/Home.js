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
import TaxLib from '../lib/TaxLib';
import AlertLib from "../lib/AlertLib";
import TaxTest from "../components/law/TaxTest";

export default class Home extends React.Component {
  state: {
      ir: String,
      is: String,
      bf: String,
      taxConcern: Number,
      nbParts: String,
  };

  constructor(props) {
      super(props);
      this.state = {
          ir: '3000',
          is: '',
          bf: '',
          taxConcern: Const.TAX.IR,
          nbParts: '',
      };
      this.returnButtonColor = this.returnButtonColor.bind(this);
      this.onChangeValue = this.onChangeValue.bind(this);
      this.onChangeSocity = this.onChangeSocity.bind(this);
      this.onClickButton = this.onClickButton.bind(this);
      this.selectTaxConcern = this.selectTaxConcern.bind(this);
  }

  returnButtonColor() : String {
      switch (this.state.taxConcern) {
          case Const.TAX.IR:
              return this.state.ir.length > 0 ? Const.COLOR.BLUE : Const.COLOR.GREY;
          case Const.TAX.BF:
              return this.state.ir.length > 0 && this.state.bf.length > 0 && this.state.nbParts.length > 0 ? Const.COLOR.BLUE : Const.COLOR.GREY;
          default:
              return this.state.is.length > 0 ? Const.COLOR.BLUE : Const.COLOR.GREY;
      }
  }

  onChangeValue(value: String) {
    if (!TaxLib.checkNumber(value)) this.setState({ value });
  }

  onChangeSocity(socity: String) {
    if (!TaxLib.checkNumber(socity)) this.setState({ socity });
  }

  onClickButton() {
      switch (this.state.taxConcern) {
          case Const.TAX.IR:
              if (this.state.ir.length === 0) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxLenght'));
                  return;
              }
              if (parseInt(this.state.ir) <= 2500) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxValue'));
                  return;
              }
              break;
          case Const.TAX.IS:
              if (this.state.is.length === 0) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxLenght'));
                  return;
              }
              if (parseInt(this.state.ir) <= 60000) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxValue'));
                  return;
              }
              break;
          default:
              if (this.state.bf.length === 0 ||
                  this.state.nbParts.length === 0 ||
                  this.state.is.length === 0 ) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxLenght'));
                  return;
              }
              if (parseInt(this.state.bf) <= 60000) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxValue'));
                  return;
              }
              break;
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
                                  value={this.state.ir}
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
                                  value={this.state.ir}
                                  onChangeText={(text) => this.onChangeValue(text)}
                                  isBig
                              />
                              <View style={styles.halfSpace} />
                              <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.bfTaxText')}</Text>
                              <Input
                                  value={this.state.bf}
                                  onChangeText={(text) => this.onChangeValue(text)}
                                  isBig={false}
                              />
                              <View style={styles.halfSpace} />
                              <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.numberParts')}</Text>
                              <Input
                                  value={this.state.nbParts}
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
                                  value={this.state.is}
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