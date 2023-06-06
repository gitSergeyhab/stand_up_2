
/**
 * делает строку для места вида: "Страна (Город)" / "Страна" / "Город" / ""
 * @param country
 * @param city
 * @returns
 */
export const getCountryCityStr = (country?: string, city?: string) => {
  if (country && city) {
    return `${country} (${city})`;
  }
  if (country) {
    return country;
  }
  if (city) {
    return city;
  }
  return ''
}
