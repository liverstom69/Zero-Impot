import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import I18n from 'ex-react-native-i18n';

import styles from '../../config/styles';
import images from '../../config/images';
import Input from "../public/Input";
import LawSelectorInput from "./LawSelectorInput";
import AlertLib from "../../lib/AlertLib";
import Const from "../../config/Const";

const presentationStyle = StyleSheet.create({
    lawView1: {
        flex: 6,
        flexDirection: "row",
        paddingRight: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    lawView2: {
        flex: 6,
        paddingRight: 5,
    },
    textView: {
        flex: 3,
        alignItems: 'flex-end',
        justifyContent: "center"
    },
    trashImg: {
        width: 23,
        height: 23,
        resizeMode: "contain"
    },
    trashView: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
    },
});

export default class PresentationLaw extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickActionSheet = this.handleClickActionSheet.bind(this);
    }

    handleClickActionSheet(value) { this.props.onPressActionSheet(this.props.name, parseInt(value)) }

    handleClick() {
        AlertLib.alertOK("Loi " + this.props.lawName, this.props.description);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View>
                        <View style={presentationStyle.lawView1}>
                            <TouchableOpacity
                                onPress={() => this.handleClick()}
                                style={[styles.justifyCenter, styles.alignCenter, styles.infoTextView, { marginRight: 5 }]}
                                activeOpacity={0.8}>
                                <Text style={styles.infoText}>info</Text>
                            </TouchableOpacity>
                            <Text style={[styles.mediumTextBold, styles.greyBlackColor]}>Loi {this.props.name}</Text>
                            {this.props.isTrashHidden === false && (
                                <TouchableOpacity
                                    onPress={() => this.props.onPressTrash(this.props.name)}
                                    style={presentationStyle.trashView}>
                                    <Image style={[presentationStyle.trashImg, ]} source={images.trash} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                <Text style={[styles.smallTextRegular, styles.greyColor2]}>{I18n.t('translation.investiment')}</Text>
                <View style={styles.container}>
                    <View style={presentationStyle.lawView2}>
                        <LawSelectorInput
                            value={this.props.value}
                            onPress={() => console.log("test")}
                            law={this.props.lawName}
                            basicValue={this.props.value}
                            onPressActionSheet={this.handleClickActionSheet}
                            basicInvest={this.props.basicInvest}
                        />
                    </View>
                    <View style={presentationStyle.textView}>
                        <TouchableOpacity onPress={() => this.props.onPress()}>
                            <Text style={[styles.smallTextMedium, styles.greyBlackColor]}>VOIR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

PresentationLaw.propTypes = {
    lawName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isTrashHidden: PropTypes.bool.isRequired,
    onPressTrash: PropTypes.func.isRequired,
    onPressActionSheet: PropTypes.func.isRequired,
    basicInvest: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
};