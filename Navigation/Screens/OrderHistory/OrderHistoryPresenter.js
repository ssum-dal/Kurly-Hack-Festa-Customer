import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../../../Components/Header/Header";
import Order from "../../../Components/Order/Order";

const info =[
    {
        name: '[퀘스크렘] 라이트 크림치즈 외 1건',
        orderNum: 2276715160026,
        option: '신용카드',
        amount: '11,900원',
        state: '배송 완료',
        date: '2022.07.30'
    },
]

const s = StyleSheet.create({
    OrderHistoryView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default({navigation}) => {

    const renderOrderList= ({item, index}) => {
        return (
            <Order
                navigation={navigation}
                orderNum={item.orderNum}
                name={item.name}
                option={item.option}
                amount={item.amount}
                state={item.state}
                date={item.date}
            />
        );
    }

    return(
        <View style={s.OrderHistoryView}>
            <Header title={'주문 내역'}/>
            <FlatList
                data={info}
                renderItem={renderOrderList}
                keyExtractor={(item) => String(item.orderNum)}
            />
        </View>
    )

}