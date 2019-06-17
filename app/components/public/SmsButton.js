import React from "react";
import { View } from 'react-native';
import Communications from 'react-native-communications';
import ConstanceButton from "./ConstanceButton";
import styles from "../../config/styles";
import images from "../../config/images";

const sendSms = () => {
    Communications.textWithoutEncoding("0661233060", "J’ai des questions. Merci de me recontacter");
};

const SmsButton = () => (
    <View style={styles.viewWithMarg}>
        <ConstanceButton
            title={"Nous contacter"}
            color={'white'}
            onPress={() => sendSms()}
            image={images.letter}
        />
    </View>
);

export default SmsButton;