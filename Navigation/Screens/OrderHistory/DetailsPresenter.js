import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../Components/Header/Header";
import { mainURL } from "../../../Context/Route";
import axios from "axios";
import { ConvertStatus, ConvertTemperature } from "../../../Utils/Status";

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
        color: '#000000',
        paddingHorizontal: '5%',
    },
    CompletedText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#5F0080',
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

export default({orderNum, state}) => {
    const navigation = useNavigation();
    const [storageMethod, setStorageMethod] = useState();

    const renderOrder = ({item, index}) => {
        return (
            <View style={s.OrderState}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={s.OrderText}>{ConvertTemperature(item.temperature)}</Text>
                    <TouchableOpacity
                        disabled={item.tracking_status == 3 ? false: true}
                        onPress={() => {
                            navigation.push('DeliveryCompleted', {
                                orderNum: orderNum,
                                temperature: item.temperature
                            });
                        }}
                    >
                        <Text style={item.tracking_status == 3 ? s.CompletedText : s.OrderStateText}>{ConvertStatus(item.tracking_status)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={s.OrderText}>넥스트마일</Text>
                    <Text style={s.TrackingText}>배송조회</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        const getData = async() => {
            const url = `${mainURL}/user/order/${Number(orderNum)}`;

            await axios.get(url).then((result) => {
                const response = JSON.parse(result.request._response);
                setStorageMethod(response);
            })
        }
        getData();
    }, []);

    return (
        <View style={s.OrderDetailsView}>
            <Header title={'주문 내역 상세'}/>
            <View style={s.SubView}>
                <Text style={s.SubText}>주문번호  {orderNum}</Text>
            </View>
            <View style={s.SubView}>
                <FlatList
                    data={storageMethod}
                    renderItem={renderOrder}
                    keyExtractor={(item) => String(item.tracking_num)}
                />
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
                            navigation.push('WriteQuestionPresenter', {
                                orderNum: orderNum,
                                tempArr : storageMethod.filter(v=> v.tracking_status === 3).map(v=>v.temperature)
                            });
                        }}
                    >
                        <Text style={s.QuestionText}>1:1 문의하기 {'>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}