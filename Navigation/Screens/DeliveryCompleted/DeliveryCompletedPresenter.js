import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header from "../../../Components/Header/Header";
import Icon from "react-native-vector-icons/Ionicons";

const s = StyleSheet.create({
    CompletedView: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: '5%',
    },
    IconView: {
        alignItems: 'center',
        paddingVertical: '5%'
    },
    CompletedText: {
        color: '#000000',
        fontSize: 18,
        marginVertical: '5%'
    },
    ImageView: {
        alignItems: 'center',
        marginVertical : '3%'
    },
    ImageStyle: {
        width: '50%',
        aspectRatio: 1/1,
    }
});

export default() => {
    return(
        <View style={s.CompletedView}>
            <Header title={'배송완료'}/>
            <View style={s.IconView}>
                <Icon name="cart" size={60} color="#5F0080"/>
            </View>
            <Text style={s.CompletedText}>안녕하세요 천예지 고객님 마켓컬리의 강지복입니다.</Text>
            <Text style={s.CompletedText}>주문하신 신선한 상품을 요청하신 문 앞에 안전하게 배송완료 하였습니다.</Text>
        
            <View style={s.ImageView}>
                <Image
                    source={{uri : 'https://cdn.pixabay.com/photo/2021/08/25/07/21/cat-6572630_960_720.jpg'}}
                    style={s.ImageStyle}
                />
            </View>
        </View>
    )
}