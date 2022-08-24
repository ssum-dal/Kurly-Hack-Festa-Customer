import React, { useEffect, useRef, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Keyboard, 
    TextInput, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    ScrollView, 
    ImageBackground, 
    Alert, 
    ToastAndroid, 
} from "react-native";
import Header from "../../../Components/Header/Header";
import Icon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from "axios";
import { mainURL } from "../../../Context/Route";
import { ConvertCategory, ConvertTemperature } from "../../../Utils/Status";
import { useNavigation } from "@react-navigation/native";

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
        width: '25%',
        aspectRatio: 1/1,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageStyle: {
        width: '100%',
        aspectRatio: 1/1,
    },
    DisabledButton: {
        backgroundColor: '#dddddd',
        borderRadius: 7
    },
    ActivatedButton: {
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

export default({orderNum, tempArr}) => {
    const navigation = useNavigation();
    const bottomSheet = useRef();
    const tempSheet = useRef();
    const [disabled, setDisabled] = useState(true);
    const [photo, setPhoto] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(0);
    const [tempState, setTempState] = useState(0);

    const updateButton = () => {
        if (title.trim().length !== 0 && content.trim().length !== 0 && category !== 0 && tempState !== 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const sendAlert = () => {
        Alert.alert("1:1 문의 등록", "이대로 1:1 문의를 등록하시겠습니까?", [
			{ text: "취소", onPress: () => null, style: "cancel" },
			{ 
                text: "등록", onPress: () => {
                    sendQuestion();
			}}
		]);
    }

    const sendQuestion = async() => {
        const url = `${mainURL}/user/order/${Number(orderNum)}`

        const data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('category', ConvertCategory(category));
        data.append('temperature', tempState);

        if (photo) {
            data.append('img_uri', {
                uri: photo,
                name: String(photo),
                type: 'multipart/form-data'
            })
        }
        
        await axios.post(url, data, {
            headers: {'content-type': 'multipart/form-data'}
        }).then((result) => {
            navigation.goBack();
            ToastAndroid.show("문의가 정상적으로 등록되었습니다", ToastAndroid.SHORT);

        }).catch((err) => {
            console.log(`sendQuestion err = ${err}`);
        });
    }

    useEffect(() => {
        
        updateButton();

    }, [title, content, category, tempState]);
    
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
                                <Text style={s.BorderText}>{ConvertCategory(category)}</Text>
                                <Icon name="caret-down" size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={s.Border}>
                            <TouchableOpacity
                                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                                activeOpacity={1}
                                onPress={() => {
                                    tempSheet.current.open()
                                }}
                            >
                                <Text style={s.BorderText}>{ConvertTemperature(tempState)}</Text>
                                <Icon name="caret-down" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={s.SubView}>
                        <Text style={s.SubText}>문의 내용 <Text style={{color: '#ff0000'}}>*</Text></Text>
                        <TextInput
                            maxLength={20}
                            style={s.InputTitle}
                            placeholder="제목을 입력해주세요"
                            value={title}
                            onChangeText={(text)=> {
                                setTitle(text);
                            }}
                        />
                        <View style={s.InputContent}>
                            <TextInput
                                placeholder="문의하실 내용을 입력해주세요"
                                multiline={true}
                                textAlignVertical="top"
                                value={content}
                                onChangeText={(text)=> {
                                    setContent(text);
                                }}
                            />
                        </View>
                    </View>
                    <View style={s.SubView}>
                        <TouchableOpacity
                            style={s.CameraView}
                            activeOpacity={1}
                            onPress={() => {
                                launchImageLibrary(
                                    {
                                        mediaType: 'photo',
                                        maxWidth: 400,
                                        maxHeight: 400,
                                        selectionLimit: 1,
                                    },
                                    (response) => {
                                        if (response.didCancel || response.errorCode) {
                                            console.log(`launchImageLibrary error: ${response.errorCode}\n${response.errorMessage}`);
                                            return;
                                        }
                                        if (!response.assets[0]) {
                                            console.log('launchImageLibrary no photo');
                                        }
                                        
                                        let photo = response.assets[0];
                                        setPhoto(photo.uri)
                                    }
                                );
                            }}
                        >{!photo ?
                            <Icon name="camera" size={30}/> :
                            <ImageBackground
                                style={s.ImageStyle}
                                source={{uri: photo}}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setPhoto();
                                    }}
                                >
                                    <Icon name="close-circle" size={20} style={s.DeleteImage}/>
                                </TouchableOpacity>
                            </ImageBackground>
                        }
                        </TouchableOpacity>
                    </View>
                    <View style={s.SubView}>
                        <TouchableOpacity
                            disabled={disabled}
                            style={disabled ? s.DisabledButton : s.ActivatedButton}
                            onPress={() => {
                                sendAlert();
                            }}
                        >
                            <Text style={s.ButtonText}>등록하기</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <RBSheet
                ref={bottomSheet}
                height={250}
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
                            setCategory(1);
                            bottomSheet.current.close();
                        }}
                    >
                        <Text style={s.BottomSheeText}>상품이 다른 곳으로 갔어요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={s.BottomSheetButton}
                        onPress={() => {
                            setCategory(2);
                            bottomSheet.current.close();
                        }}
                    >
                        <Text style={s.BottomSheeText}>배송 상품이 안 왔어요</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
            <RBSheet
                ref={tempSheet}
                height={250}
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
                    <Text style={s.BottomSheetHeadText}>배송 유형 선택</Text>
                    {
                        tempArr.map((v, index)=>{
                            return(
                                <TouchableOpacity
                                    key={String(v)}
                                    style={s.BottomSheetButton}
                                    onPress={() => {
                                        setTempState(v);
                                        tempSheet.current.close();
                                    }}
                                >
                                    <Text style={s.BottomSheeText}>{ConvertTemperature(v)}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </RBSheet>
        </View>
    )
}