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
    } else {
        return "냉동"
    }
    
}