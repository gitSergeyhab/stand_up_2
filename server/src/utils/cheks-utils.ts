export const checkNik = (nik: string) => nik && nik.length > 2 && nik.length < 50;

const DIGIT_LIST_PATTERN = /^[,\d]+$/
export const checkDigitList = (list: string) => {
    if (typeof list !== 'string' || !list) {
        return false
    }

    return DIGIT_LIST_PATTERN.test(list)
}