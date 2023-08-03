export const getValueOrNull = (value: string) =>  value ? value : null;



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


export const getNewFileName = (filename: string) => {
    const names = filename.split('.');
    const ext = names[names.length-1];
    const name = names.slice(0, names.length-1).join('.') + '_' + Date.now();
    return name + '.' + ext;
}