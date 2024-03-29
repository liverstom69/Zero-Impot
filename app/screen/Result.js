import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import PropTypes from "prop-types";
import I18n from 'ex-react-native-i18n';

import styles from '../config/styles';
import images from '../config/images';
import SavingResult from "../components/saving/SavingResult";
import LawItem from "../components/law/LawItem";
import SmsButton from "../components/public/SmsButton";
import TaxLib from "../lib/TaxLib";
import AlertLib from "../lib/AlertLib";
import Const from "../config/Const";
import MHLib from "../lib/MHLib";
import MalrauxLib from "../lib/MalrauxLib";
import PinelLib from "../lib/PinelLib";
import PinelOMLib from "../lib/PinelOMLib";
let moment = require('moment');

export default class Result extends React.Component {
    state = {
        isUpdate: false,
        laws: [],
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                params: PropTypes.shape({
                    laws: PropTypes.array,
                    taxAmount: PropTypes.number,
                    basicLaws: PropTypes.array,
                })
            })
        }),
    };

    constructor(props) {
        super(props);

        this.state = {
            isUpdate: false,
            laws: this.props.navigation.state.params.laws,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleClickActionSheet = this.handleClickActionSheet.bind(this);
    }

    handleClick(name) {
        let laws = this.state.laws;
        laws = laws.filter(law => law.name !== name);
        this.setState({
            laws,
            isUpdate: true,
        });
    }

    handleUpdate() { this.setState({ isUpdate: true }) }

    handleClickActionSheet(name, value) {
        let isUpdate = false;
        let laws = this.state.laws.map(law => {
            if (law.name === name && parseInt(law.investiment) !== value) {
                let programs = TaxLib.getProgramFromLaw(this.props.navigation.state.params.basicLaws, law.name);
                if (law.name === Const.LAW_NAME.MALRAUX) {
                    law = MalrauxLib.getSpecficObject(MalrauxLib.getObject(programs, TaxLib.getTaxByInvestmentByLaw(name, value), true), value);
                } else if (law.name === Const.LAW_NAME.MONUMENT_HISTORIQUE) {
                    law = MHLib.getSpecificObject(MHLib.getObject(programs, TaxLib.getTaxByInvestmentByLaw(name, value), true), value);
                } else if (law.name === Const.LAW_NAME.PINEL_OUTREMER) {
                    law = PinelOMLib.getObject(programs, value, false);
                } else {
                    law = TaxLib.getLawData(this.props.navigation.state.params.basicLaws,
                        name,
                        TaxLib.getTaxByInvestmentByLaw(name, value));
                }
                isUpdate = true;
            }
            return law;
        });
        if (isUpdate === true) {
            this.setState({
                laws,
                isUpdate,
            });
        }
    }

    handleClickLaw(law) {
        if (law.programs.length === 0) {
            AlertLib.alertOK("translation.errorSelection ");
        } else {
            const { taxAmount, basicLaws } = this.props.navigation.state.params;
            this.props.navigation.navigate("Law", {
                title: "Loi ".concat(law.name),
                law: law,
                basicLaws,
                taxAmount,
            });
        }
    }

  render() {
        console.log(this.state.laws);
        const taxAmount = this.props.navigation.state.params.taxAmount;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewWithMarg}>
          <Text style={[styles.bigText, styles.greyBlackColor, styles.textCenter]}>
              {I18n.t('translation.resultCalculated')}
          </Text>
          <View style={styles.halfSpace}/>
          <SavingResult
            image={images.smiley}
            value={TaxLib.getTaxMinByLaw(this.state.laws, taxAmount).toString()}
            text={I18n.t('translation.taxYear').concat(moment().add(1, "year").format("YYYY"))}
          />
        </View>
        <FlatList
          data={this.state.laws}
          renderItem={({ item, index }) => (
              <LawItem
                  navigation={this.props.navigation}
                  name={item.name}
                  economy={item.horizon}
                  value={item.investiment}
                  isLast={index === this.state.laws.length - 1}
                  onPress={() => this.handleClickLaw(item)}
                  isTrashHidden={this.state.laws.length <= 1}
                  onPressTrash={this.handleClick}
                  onPressActionSheet={this.handleClickActionSheet}
                  basicInvest={TaxLib.getInvestmentByLaw(item.name, taxAmount)}
                  description={item.description}
              />
          )}
        />
          <SmsButton />
      </ScrollView>
    )
  }
}