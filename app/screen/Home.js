//@flow
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from '../config/styles';
import Const from '../config/Const';
import Input from '../components/public/Input';
import ConstanceButton from '../components/public/ConstanceButton';
import TaxLib from '../lib/TaxLib';
import AlertLib from "../lib/AlertLib";
import TaxText from "../components/law/TaxText";

let laws = [
    {
        name: 'Loi Pinel',
        programs: [],
        investiment: 0,
        horizon: {
            key: '0',
            duree: '9',
            economy: '0',
            saving: '0',
        }
    },
    {
        name: 'Loi Pinel Outremer',
        programs: [],
        investiment: 0,
        horizon: {
            key: '0',
            duree: '9',
            economy: '0',
            saving: '0',
        }
    },
    {
        name: 'Loi Malraux',
        programs: [],
        investiment: 0,
        horizon: {
            key: '0',
            duree: '9',
            economy: '0',
            saving: '0',
        }
    },
    {
        name: 'Loi Monument Historique',
        programs: [],
        investiment: 0,
        horizon: {
            key: '0',
            duree: '9',
            economy: '0',
            saving: '0',
        }
    }
];

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
          ir: '4000',
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
      this.handleIRText = this.handleIRText.bind(this);
      this.handleISText = this.handleISText.bind(this);
      this.handleBFText = this.handleBFText.bind(this);
      this.handleNbText = this.handleNbText.bind(this);
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
      const ir = parseInt(this.state.ir);
      // Pinel
      laws[0] = TaxLib.getPinel(TaxLib.getProgramFromLaw(this.props.navigation.state.params.laws, "Pinel"), ir);
      switch (this.state.taxConcern) {
          case Const.TAX.IR:
              if (this.state.ir.length === 0) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxLenght'));
                  return;
              }
              if (ir < 0) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxValue'));
                  return;
              }
              break;
          case Const.TAX.IS:
              if (this.state.is.length === 0) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxLenght'));
                  return;
              }
              if (parseInt(this.state.ir) < 0) {
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
              if (parseInt(this.state.bf) < 0) {
                  AlertLib.alertOK(I18n.t('translation.errorTaxValue'));
                  return;
              }
              break;
      }
      laws = laws.filter(law => law.programs.length > 0);
      if (laws.length === 0) {
          AlertLib.alertOK(I18n.t('translation.errorAnyLaws'));
      } else {
          this.props.navigation.navigate('Result', {
              laws,
              basicLaws: this.props.navigation.state.params.laws,
              taxAmount: ir,
          });
      }
  }

  selectTaxConcern(taxConcern) {
    if (taxConcern !== this.state.taxConcern) {
        this.setState({ taxConcern });
    }
  }

  handleIRText(ir) { this.setState({ ir }) }

  handleISText(is) { this.setState({ is }) }

  handleBFText(bf) { this.setState({ bf }) }

  handleNbText(nbParts) { this.setState({ nbParts }) }

  render() {
      return (
          <View style={styles.scrollView}>
              <KeyboardAwareScrollView>
                  <View style={styles.viewWithMarg}>
                      <Text style={[styles.mediumTextBold, styles.greyBlackColor]}>{I18n.t('translation.taxQuestion')}</Text>
                  </View>
                  <TaxText
                      title={I18n.t('translation.irTax')}
                      taxConcern={Const.TAX.IR}
                      onClick={() => this.selectTaxConcern(Const.TAX.IR)}
                      isChecked={this.state.taxConcern === Const.TAX.IR}
                  />
                  {/*<TaxTest
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
                  />*/}
                  {this.state.taxConcern === Const.TAX.IR &&
                  (
                      <View style={styles.viewWithMMarg}>
                          <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.tax')}</Text>
                          <Input
                              value={this.state.ir}
                              onChangeText={(text) => this.handleIRText(text)}
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
                              onChangeText={(text) => this.handleIRText(text)}
                              isBig
                          />
                          <View style={styles.halfSpace} />
                          <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.bfTaxText')}</Text>
                          <Input
                              value={this.state.bf}
                              onChangeText={(text) => this.handleBFText(text)}
                              isBig={false}
                          />
                          <View style={styles.halfSpace} />
                          <Text style={[, styles.textBold, styles.greyBlackColor]}>{I18n.t('translation.numberParts')}</Text>
                          <Input
                              value={this.state.nbParts}
                              onChangeText={(text) => this.handleNbText(text)}
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
                              onChangeText={(text) => this.handleISText(text)}
                              isBig
                          />
                          <View style={styles.halfSpace} />
                      </View>
                  )
                  }
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
  navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
          params: PropTypes.shape({
              laws: PropTypes.array,
          })
      })
  })
};