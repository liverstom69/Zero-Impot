//@flow

import React from 'react';
import { Alert } from 'react-native';

export default class AlertLib {
    static alertOK(title: String, message: String = '', cancelable: Boolean = false) {
        Alert.alert(
            title,
            message,
            [
                { text: 'OK' },
            ],
            { cancelable }
            );
    }
}