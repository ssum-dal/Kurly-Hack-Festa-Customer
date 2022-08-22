import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ConvertDateForm } from "../../Utils/Date";

const s = StyleSheet.create({
    OrderView: {
        backgroundColor: '#ffffff',
        marginVertical: '3%'
    },
    DateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        borderBottomWidth: 0.5,
        borderColor: '#aaaaaa'

    },
    DateText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000',
        marginBottom: '2%'
    },
    OrderDetailText: {
        fontSize: 15
    },
    OrderInfoView: {
        flexDirection: 'row',
        margin: '4%',
    },
    CategoryText: {
        fontSize: 15
    },
    ItemDetailText: {
        fontSize: 15,
        color: '#000000',
        marginLeft: '10%'
    }
});

function Order({navigation, orderNum, name, option, amount, state, date }) {
    return (
        <View style={s.OrderView}>
            <View style={s.DateView}>
                 <Text style={s.DateText}>{ConvertDateForm(new Date(date))}</Text>
                 <TouchableOpacity
                    onPress={() => {
                        navigation.push('DetailsPresenter',{
                            orderNum: orderNum,
                            name: name,
                            option: option,
                            amount: amount,
                            state: state,
                            date: date,
                        })
                    }}
                 >
                     <Text style={s.OrderDetailText}>주문 상세{'>'}</Text>
                 </TouchableOpacity>
            </View>
            <View style={s.OrderInfoView}>
                <View>
                     <Text style={s.CategoryText}>상품명</Text>
                     <Text style={s.CategoryText}>주문 번호</Text>
                     <Text style={s.CategoryText}>결제 방법</Text>
                     <Text style={s.CategoryText}>결제 금액</Text>
                     <Text style={s.CategoryText}>주문 상태</Text>
                </View>
                <View>
                    <Text style={s.ItemDetailText} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                    <Text style={s.ItemDetailText}>{orderNum}</Text>
                    <Text style={s.ItemDetailText}>{option}</Text>
                    <Text style={s.ItemDetailText}>{amount}</Text>
                    <Text style={s.ItemDetailText}>{state == 0 ? '주문 접수' : state == 1 ? '배송완료' : '배송지연'}</Text>
                </View>
            </View>
        </View>
    );
}

export default Order;