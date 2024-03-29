//@flow
import React from 'react';
import { View, Text, Animated, Image, Dimensions, Easing, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../config/styles';
import Const from '../config/Const';
import Input from '../components/public/Input';
import ConstanceButton from '../components/public/ConstanceButton';
import SmsButton from '../components/public/SmsButton';
import TaxLib from '../lib/TaxLib';
import AlertLib from "../lib/AlertLib";
import images from "../config/images";

const width = Dimensions.get("window").width;

let laws = TaxLib.getTaxLib();

const duration = 1500;

export default class Home extends React.Component {
    state: {
        ir: String,
        is: String,
        bf: String,
        taxConcern: Number,
        nbParts: String,
        isOpen: boolean,
        isPacmanHidden: boolean,
        leftPacmanPosition: any,
    };

    constructor(props) {
        super(props);
        this.state = {
            ir: '',
            is: '',
            bf: '',
            taxConcern: Const.TAX.IR,
            nbParts: '',
            isOpen: false,
            isPacmanHidden: true,
            leftPacmanPosition: new Animated.Value(0),
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
                const basicLaws = this.props.navigation.state.params.laws;
                laws[0] = TaxLib.getLawData(basicLaws, Const.LAW_NAME.PINEL, ir);
                laws[1] = TaxLib.getLawData(basicLaws, Const.LAW_NAME.PINEL_OUTREMER, ir);
                laws[2] = TaxLib.getLawData(basicLaws, Const.LAW_NAME.MALRAUX, ir);
                laws[3] = TaxLib.getLawData(basicLaws, Const.LAW_NAME.MONUMENT_HISTORIQUE, ir);
                if (ir > Const.MAX_LAW.MALRAUX && laws[3].programs.length === 0) {
                    laws = [];
                }
                laws.reverse();
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
        if (laws.length > 2) {
            const pinelLaw = laws.pop();
            laws.splice(1, 0, pinelLaw);
        }
        if (laws.length === 0) {
            AlertLib.alertOK(I18n.t('translation.errorAnyLaws'));
        } else {
            this.setState({ isPacmanHidden: false });
            const widthCaractere = this.state.ir.length * 4.5;
            const maxWidth = width - 150;
            const finalWidth = widthCaractere > maxWidth ? maxWidth : widthCaractere;
            Keyboard.dismiss();
            let i = 0;
            let j = 0;
            const irLength = this.state.ir.length;
            const intervalCar = setInterval(() => {
                if (i <= irLength) {
                    j = 0;
                    let carac = "";
                    while (j < i) {
                        carac += " ";
                        j += 1;
                    }
                    const ir = this.state.ir.slice(i, this.state.ir.length);
                    this.setState({ ir: carac.concat(ir) });
                    i = i + 1;
                }
            }, duration / (finalWidth * 1.1 / irLength));
            Animated.timing(
                this.state.leftPacmanPosition,
                {
                    toValue: finalWidth,
                    duration: duration,
                    easing: Easing.linear,
                }
            ).start(() => {
                clearInterval(intervalCar);
                this.setState({
                    ir: "",
                    isPacmanHidden: true,
                    isOpen: false,
                    leftPacmanPosition: new Animated.Value(0),
                });
                this.props.navigation.navigate('Result', {
                    laws,
                    basicLaws: this.props.navigation.state.params.laws,
                    taxAmount: ir,
                });
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
          <View style={[styles.scrollView, styles.justifyCenter]}>
              <View>
                  <View style={styles.viewWithMMarg}>
                      <Text style={[, styles.textBold, styles.greyBlackColor, styles.textCenter]}>{I18n.t('translation.tax')}</Text>
                      <View style={styles.tinySpace}/>
                      <Input
                          value={this.state.ir}
                          onChangeText={(text) => this.handleIRText(text)}
                          isBig
                      />
                      {this.state.isPacmanHidden === false && (
                          <Animated.View style={{ position: "absolute", bottom: -50, left: this.state.leftPacmanPosition, alignSelf: "center", zIndex: 1 }}>
                              <Image
                                  style={{ width: 40, height: 40 }}
                                  resizeMode={"contain"}
                                  source={images.pacman}
                              />
                          </Animated.View>
                      )}
                  </View>
                  <View style={{ marginTop: 52.5, height: 92}}>
                      <ConstanceButton
                          title={I18n.t('translation.launchSimulation')}
                          color={this.returnButtonColor()}
                          isBottom
                          onPress={this.onClickButton}
                      />
                  </View>
                  <SmsButton />
              </View>
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