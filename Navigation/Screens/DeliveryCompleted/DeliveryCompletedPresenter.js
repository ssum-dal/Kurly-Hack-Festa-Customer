import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header from "../../../Components/Header/Header";
import { mainURL } from "../../../Context/Route";
import axios from "axios";

const s = StyleSheet.create({
    CompletedView: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: '5%',
    },
    LogoView: {
        alignItems: 'center',
        paddingVertical: '15%'
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

export default({orderNum, temperature}) => {

    const [data, setData] = useState([{text: "", img_uri: ""}]);

    useEffect(()=> {
        const getData = async() => {
            let tempState;
            
            if (temperature === 'room') {
                tempState = 0
            } else if (temperature === 'refrigerating') {
                tempState = 1
            } else {
                tempState = 2
            }

            const url = `${mainURL}/user/order/${orderNum}/${tempState}`;

            await axios.get(url).then((result) => {
                const response = JSON.parse(result.request._response);
                setData(response);
            })
        }
        getData();

    }, []);
    
    return(
        <>
        <Header title={'배송완료'}/>
        <View style={s.CompletedView}>
            <View style={s.LogoView}>
                <Image
                    resizeMode="stretch"
                    style={{width: 200, height: 100}} 
                    source={require('./../../../src/res/logo.png')}
                />
            </View>
            {data.length > 0 &&
                <Text style={s.CompletedText}>{data[0].text}</Text>
            }
        
            <View style={s.ImageView}>
                {data.length > 0 && data[0].img_uri.length > 0 &&
                    <Image
                        source={{uri : data[0].img_uri}}
                        style={s.ImageStyle}
                    />
                }
            </View>
        </View>
        </>
    )
}