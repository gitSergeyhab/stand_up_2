import { OptionType } from "../types/types"

export const appendData = (formData: FormData, options: (OptionType|null)[], ids: string[]) => {
  options.forEach((item, i) => {
    if (item) {
      formData.append(ids[i], item.id)
    }
  })
}
