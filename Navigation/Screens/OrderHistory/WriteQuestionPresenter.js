import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Keyboard, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import Header from "../../../Components/Header/Header";
import Icon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";

const s = StyleSheet.create({
    WriteQuestionView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    SubView: {
        padding: '4%',
    },
    SubText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000000'
    },
    Border: {
        borderWidth: 1,
        marginTop: '3%',
        padding: '3%',
        borderRadius: 7,
        borderColor: '#C4C4C4'
    },
    BorderText: {
        fontSize: 16,
        color: '#000000'
    },
    InputTitle: {
        borderWidth: 1,
        marginTop: '3%',
        borderRadius: 7,
        borderColor: '#C4C4C4',
        padding: '3%'
    },
    InputContent: {
        borderWidth: 1,
        marginTop: '3%',
        borderRadius: 7,
        borderColor: '#C4C4C4',
        padding: '3%',
        height: 150
    },
    CameraView: {
        width: '20%',
        aspectRatio: 1/1,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ButtonView: {
        backgroundColor: '#5F0080',
        borderRadius: 7
    },
    ButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        paddingVertical: '4%',
        fontSize: 16,
        fontWeight: 'bold'
    },
    BottomSheetView: {
        padding: '4%'
    },
    BottomSheetButton: {
        paddingVertical: '5%'
    },
    BottomSheetHeadText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000'
    },
    BottomSheeText: {
        fontSize: 16,
        color: '#000000'
    }
});

export default({}) => {
    const bottomSheet = useRef();
    const [category, setCategory] = useState('상세 유형을 선택해주세요')
    
    return(
        <View style={s.WriteQuestionView}>
            <Header title={'1:1문의 작성'}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={s.SubView}>
                        <Text style={s.SubText}>문의 유형 <Text style={{color: '#ff0000'}}>*</Text></Text>
                        <View style={s.Border}>
                            <Text style={s.BorderText}>배송 문의</Text>
                        </View>
                        <View style={s.Border}>
                            <TouchableOpacity
                                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                                activeOpacity={1}
                                onPress={() => {
                                    bottomSheet.current.open()
                                }}
                            >
                                <Text style={s.BorderText}>{category}</Text>
                                <Icon name="caret-down" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={s.SubView}>
                        <Text style={s.SubText}>문의 내용 <Text style={{color: '#ff0000'}}>*</Text></Text>
                        <TextInput
                            style={s.InputTitle}
                            placeholder="제목을 입력해주세요"
                        />
                        <View style={s.InputContent}>
                            <TextInput
                                placeholder="문의하실 내용을 입력해주세요"
                                multiline={true}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>
                    <View style={s.SubView}>
                        <TouchableOpacity
                            style={s.CameraView}
                            activeOpacity={1}
                        >
                            <Icon name="camera" size={30}/>
                        </TouchableOpacity>
                    </View>
                    <View style={s.SubView}>
                        <TouchableOpacity
                            style={s.ButtonView}
                        >
                            <Text style={s.ButtonText}>등록하기</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <RBSheet
                ref={bottomSheet}
                height={200}
                closeOnDragDown={true}
                customStyles={{
                    draggableIcon: { backgroundColor: "#a2a2a2" },
                    container:{
                        borderTopRightRadius:20,
                        borderTopLeftRadius: 20,
                    }
                }}
            >
                <View style={s.BottomSheetView}>
                    <Text style={s.BottomSheetHeadText}>상세 유형 선택</Text>
                    <TouchableOpacity
                        style={s.BottomSheetButton}
                        onPress={() => {
                            setCategory('상품이 다른 곳으로 갔어요');
                            bottomSheet.current.close();
                        }}
                    >
                        <Text style={s.BottomSheeText}>상품이 다른 곳으로 갔어요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={s.BottomSheetButton}
                        onPress={() => {
                            setCategory('배송 상품이 안 왔어요');
                            bottomSheet.current.close();
                        }}
                    >
                        <Text style={s.BottomSheeText}>배송 상품이 안 왔어요</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    )
}