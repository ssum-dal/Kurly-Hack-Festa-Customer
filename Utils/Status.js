export const ConvertStatus = (status) => {
    if (status == 0) {
        return "주문접수"
    } else if (status == 1) {
        return "배송중"
    } else if (status == 2) {
        return "배송지연"
    } else {
        return "배송완료"
    }
}

export const ConvertTemperature = (status) => {
    if (status == "room") {
        return "상온"
    } else if (status == "refrigerating") {
        return "냉장"
    } else if (status == "freezing") {
        return "냉동"
    } else {
        return "문의하실 배송을 선택해주세요"
    }
}

export const ConvertCategory = (status) => {
    if (status == 0) {
        return "상세 유형을 선택해주세요"
    } else if (status == 1) {
        return "상품이 다른 곳으로 갔어요"
    } else {
        return "배송 상품이 안 왔어요"
    }
}