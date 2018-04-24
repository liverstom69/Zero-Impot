import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../../config/styles';
import images from '../../config/images';
import Input from "../public/Input";
import LawSelectorInput from "./LawSelectorInput";

const presentationStyle = StyleSheet.create({
    lawView1: {
        flex: 6,
        flexDirection: "row",
        paddingRight: 5,
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
        marginRight: 10,
    }
});

export default class PresentationLaw extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View>
                        <View style={presentationStyle.lawView1}>
                            {this.props.isTrashHidden === false && (
                                <TouchableOpacity
                                    onPress={() => this.props.onPressTrash(this.props.name)}
                                    style={presentationStyle.trashView}>
                                    <Image style={[presentationStyle.trashImg, ]} source={images.trash} />
                                </TouchableOpacity>
                            )}
                            <Text style={[styles.mediumTextBold, styles.greyBlackColor]}>{this.props.name}</Text>
                        </View>
                    </View>
                    <View style={presentationStyle.textView}>
                        <Text style={[styles.smallTextMedium, styles.blueColor]}>{I18n.t('translation.zeroApport')}</Text>
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

PresentationLaw.propTypes = {
    lawName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isTrashHidden: PropTypes.bool.isRequired,
    onPressTrash: PropTypes.func.isRequired,
};