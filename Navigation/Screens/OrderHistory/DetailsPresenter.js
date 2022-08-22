import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../Components/Header/Header";

const s = StyleSheet.create({
    OrderDetailsView: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    SubView: {
        backgroundColor: '#ffffff',
        padding: '4%',
        marginBottom: '2%'
    },
    SubText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000'
    },
    OrderState: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    OrderText: {
        fontSize: 15,
    },
    OrderStateText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        paddingHorizontal: '5%',
        textDecorationLine: 'underline'
    },
    TrackingText: {
        fontSize: 15,
        color: '#5F0080',
        marginLeft: '5%',
        textDecorationLine: 'underline'
    },
    QuestionView: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    QuestionButton: {
        alignItems: 'center'
    },
    QuestionText: {
        fontSize: 15,
        color: '#5F0080',
        fontWeight: 'bold',
        padding: '4%',
    }
});

export default({orderNum, name, option, amount, state, date}) => {
    const navigation = useNavigation();

    return (
        <View style={s.OrderDetailsView}>
            <Header title={'주문 내역 상세'}/>
            <View style={s.SubView}>
                <Text style={s.SubText}>주문번호  {orderNum}</Text>
            </View>
            <View style={s.SubView}>
                <View style={s.OrderState}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={s.OrderText}>냉동</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push('DeliveryCompleted');
                            }}
                        >
                            <Text style={s.OrderStateText}>{state}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={s.OrderText}>넥스트마일</Text>
                        <Text style={s.TrackingText}>배송조회</Text>
                    </View>
                </View>
            </View>
            <View style={s.SubView}>
                <Text style={s.SubText}>결제정보</Text>
            </View>
            <View style={s.SubView}>
                <Text style={s.SubText}>주문정보</Text>
            </View>
            <View style={s.SubView}>
                <Text style={s.SubText}>배송정보</Text>
            </View>
            <View style={s.SubView}>
                <Text style={s.SubText}>추가정보</Text>
            </View>
            <View style={s.QuestionView}>
                <View style={s.QuestionButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push('WriteQuestionPresenter');
                        }}
                    >
                        <Text style={s.QuestionText}>1:1 문의하기 {'>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}