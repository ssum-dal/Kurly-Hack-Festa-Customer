import React, {useEffect, useState} from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import Header from "../../../Components/Header/Header";
import Order from "../../../Components/Order/Order";
import { mainURL } from "../../../Context/Route";
import { useIsFocused } from "@react-navigation/native";

const s = StyleSheet.create({
    OrderHistoryView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    HeaderView: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: '4%'
    },
    TextView: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    }
});

export default({navigation}) => {
    const [orderList, setOrderList] = useState([]);
    const isFocused = useIsFocused();

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

    }, [isFocused]);

    return(
        <View style={s.OrderHistoryView}>
            <View style={s.HeaderView}>
                <Text style={s.TextView}>주문내역</Text>
            </View>
            <FlatList
                data={orderList}
                renderItem={renderOrderList}
                keyExtractor={(item) => String(item.order_num)}
            />
        </View>
    )

}