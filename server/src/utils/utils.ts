export const getValueOrNull = (value: string) => {
    console.log({value}, value ? value : null)
    return value ? value : null};


/**
 * заменяет значения "", undefined на null в объекте
 * @param obj поля и значения формы с клиента - {key: value, ...}
 * @returns 
 */
export  const getNullObj = (obj: {[key: string]: string}) => 
    Object.entries(obj).reduce((acc, item) => {
        acc[item[0]] = item[1] ? item[1] : null;
        return acc;
    }, {})
