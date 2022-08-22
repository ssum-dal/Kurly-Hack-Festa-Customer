import React, {useEffect, useState} from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import Header from "../../../Components/Header/Header";
import Order from "../../../Components/Order/Order";
import { mainURL } from "../../../Context/Route";

const s = StyleSheet.create({
    OrderHistoryView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default({navigation}) => {
    const [orderList, setOrderList] = useState([]);

    const renderOrderList= ({item, index}) => {
        return (
            <Order
                navigation={navigation}
                orderNum={item.order_num}
                name={item.order_product}
                option={item.pay_by}
                amount={item.pay_price}
                state={item.order_status}
                date={item.order_date}
            />
        );
    }

    useEffect(() => {
        const getData = async() => {
            const url = `${mainURL}/user/order`;

            await axios.get(url).then((result) => {
                const response = JSON.parse(result.request._response);
                setOrderList(response);
            })
        }
        getData();

    }, []);

    return(
        <View style={s.OrderHistoryView}>
            <Header title={'주문 내역'}/>
            <FlatList
                data={orderList}
                renderItem={renderOrderList}
                keyExtractor={(item) => String(item.order_num)}
            />
        </View>
    )

}