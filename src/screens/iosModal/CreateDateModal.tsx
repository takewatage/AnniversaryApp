import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Platform, KeyboardAvoidingView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Button, Input} from "react-native-elements";
import FIcon from "react-native-vector-icons/Feather";
import dayjs from "dayjs";
import {AppInputStyle} from "../../styles/AppInputStyle";
import DateTimePicker, {Event} from "@react-native-community/datetimepicker";
import Layout from "../../constants/Layout";
import ActionSheet from "react-native-actions-sheet/index";
import {onFocus} from "@reduxjs/toolkit/dist/query/core/setupListeners";

export const CreateDateModalScreen = () => {

    const navigation = useNavigation()
    const [textTitle, setTextTitle] = useState('')
    const [date, setDate] = useState(new Date())
    const [isShow, setIsShow] = useState(false)
    const actionRef = React.useRef(null)
    const [inputStyle, setInputStyle] = useState({})


    useEffect(() => {
        navigation.setOptions({
            headerTitle: '記念日の新規登録'
        })

        // return () => {
        //     setTextTitle('')
        // }
    })

    const showDatepicker = () => {
        if(Platform.OS=='ios') {
            // @ts-ignore
            actionRef.current?.setModalVisible()
        } else {
            setIsShow(true);
        }
    };

    const onChange = (event:Event, selectedDate:any) => {
        if (Platform.OS == 'android') {
            const currentDate = selectedDate || date;
            setIsShow(false);
            setDate(currentDate)
            return
        }
        const currentDate = selectedDate || date
        setDate(currentDate)
    };

    const onFocus = () => {
        setInputStyle({
            borderColor: 'pink',
            borderBottomWidth: 2
        })
    }

    const onblur= () => {
        setInputStyle({
            borderColor: '#909090',
            borderBottomWidth: 1
        })
    }



    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <Input
                    selectionColor={'pink'}
                    onFocus={onFocus}
                    onBlur={onblur}
                    value={textTitle}
                    inputContainerStyle={{...inputStyle}}
                    placeholder={'タイトル'}
                    onChangeText={setTextTitle} />

                <TouchableOpacity activeOpacity={0.8} onPress={() => showDatepicker()}>
                    <View style={AppInputStyle.createInput}>
                        <FIcon size={16} name={'calendar'} style={{marginRight:5}}/>
                        <Text
                            style={{fontSize: 18}}>{dayjs(date).format("YYYY年 MM月 DD日")}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>

                <Button
                    activeOpacity={0.8}
                    titleStyle={{fontSize:18, fontWeight: 'bold'}}
                    containerStyle={{width: '100%'}}
                    buttonStyle={{backgroundColor:'pink', paddingVertical:12}}
                    title={'保存する'}
                    onPress= {() => {

                    }}
                />
            </View>

            <ActionSheet
                ref={actionRef}
                gestureEnabled
                delayActionSheetDraw={true}
            >
                <DateTimePicker
                    style={{width: Layout.window.width}}
                    value={date}
                    textColor={'#000'}
                    is24Hour={true}
                    locale="ja"
                    display={Platform.OS == 'ios' ? 'spinner' : 'default'}
                    minuteInterval={10}
                    onTouchCancel={() => {
                        console.log("cancel")
                    }}
                    onChange={onChange}
                    onAccessibilityAction={() => {
                        console.log("cancel!!!!")
                    }}
                />
            </ActionSheet>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
    },

    footer: {
        marginTop: 'auto',
        width: '100%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
})