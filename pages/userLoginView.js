

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

type Props = {};
export default class userLoginView extends Component<Props> {

    static navigationOptions = {
        title: '用户登录',
        /* No more header config here! */
    };
    // static code = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };

    _onPressButton() {
        // Alert.alert('You tapped the button!'+local.get("code"));
        // local.get('code').then((code) => {
        //     console.log("get code:"+ code);
        // });
        //    httpApi.personLogin(this.state.userName, this.state.password)
        httpApi.personLogin('cs', 'xl', '123456')
            .then((data) => {
                let code = data.code;
                if (code == 1000) {
                    local.set("username", "xl");
                    local.set("password", "123456");
                    local.set("uid", data.uId);
                    httpApi.saveLogin({
                        account: 'cs',
                        username: 'xl',
                        password: '123456',
                        uid: 18
                    });
                    this.props.navigation.navigate('Main');
                }
                else
                    Alert.alert('错误', JSON.stringify(data));
            });
        //   this.props.navigation.navigate('UserLogin');
    }
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('code', 'NO-ID');
        return (
            <View style={styles.container}>
                {/*{头像}*/}
                <Image source={require('../img/userLogin.jpg')} style={styles.iconStyle} />
                {/*账号和密码*/}
                <TextInput placeholder={'请输入用户名'}
                    style={styles.textInputStyle}
                    onChangeText={(userName) => this.setState({ userName })}
                />
                <TextInput placeholder={'请输入密码'}
                    style={styles.textInputStyle}
                    password={true}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                {/*登录*/}
                <View style={styles.loginBtnStyle}>
                    <Button style={{ color: 'white' }} title="登录" onPress={this._onPressButton.bind(this)} />
                </View>
                {/*设置*/}
                <View style={styles.settingStyle}>
                    <Text>无法登录+ {JSON.stringify(itemId)}</Text>
                    <Text>新用户</Text>
                    <Text>新用户8811</Text>
                </View>
                {/*三方登录方式*/}
                <View style={styles.otherLoginStyle}>
                    <Text>其他登录方式</Text>
                    <Image source={require('../img/userLogin.jpg')} style={styles.otherImageStyle}></Image>
                    <Image source={require('../img/userLogin.jpg')} style={styles.otherImageStyle}></Image>
                    <Image source={require('../img/userLogin.jpg')} style={styles.otherImageStyle}></Image>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'red',
    },
    iconStyle: {
        width: 80,
        height: 80,
        marginTop: 50,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'orange',
        marginBottom: 30,
    },
    textInputStyle: {
        backgroundColor: 'white',
        width: width * 0.8,
        height: 40,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        paddingLeft: 15,
        borderRadius: 8,
    },
    loginBtnStyle: {
        height: 40,
        width: width * 0.8,
        backgroundColor: 'blue',
        marginTop: 30,
        marginBottom: 30,
        //flex布局
        justifyContent: 'center',
        //   alignItems: 'center',
        borderRadius: 8
    },
    settingStyle: {
        flexDirection: 'row',
        width: width * 0.8,
        justifyContent: 'space-between',
    },
    otherLoginStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 20
    },
    otherImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
});

//输出一个类
module.exports = userLoginView;