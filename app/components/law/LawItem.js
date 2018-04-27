import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../../config/styles';
import PresentationLaw from './PresentationLaw';
import EconomyLaw from "./EconomyLaw";
import LawDelimiter from "./LawDelimiter";

export default class LawItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickAS = this.handleClickAS.bind(this);
    }

    handleClickAS(name, value) { this.props.onPressActionSheet(name, value) }

    render() {
        return (
            <View>
                <View style={styles.viewWithMarg}>
                    <PresentationLaw
                        name={this.props.name}
                        value={this.props.value}
                        onPress={this.props.onPress}
                        isTrashHidden={this.props.isTrashHidden}
                        onPressTrash={this.props.onPressTrash}
                        lawName={this.props.name}
                        onPressActionSheet={this.handleClickAS}
                        basicInvest={this.props.basicInvest}
                    />
                    <View style={styles.halfSpace} />
                    <View style={styles.line} />
                    <View style={styles.halfSpace} />
                    <Text style={[styles.semiBoldText, styles.greyBlackColor]}>{I18n.t('translation.economy')}</Text>
                    <View style={styles.littleSpace} />
                    <EconomyLaw economy={this.props.economy} />
                </View>
                {this.props.isLast === false && (
                    <View>
                        <LawDelimiter text={"OU"} />
                        <View style={styles.halfSpace} />
                    </View>
                )}
                </View>
        )
    }
}

LawItem.propTypes = {
    navigation: PropTypes.object.isRequired,
    economy: PropTypes.shape({
        key: PropTypes.string,
        duree: PropTypes.string,
        economy: PropTypes.string,
        saving: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired,
    isTrashHidden: PropTypes.bool.isRequired,
    onPressTrash: PropTypes.func.isRequired,
    onPressActionSheet: PropTypes.func.isRequired,
    basicInvest: PropTypes.number.isRequired,
};