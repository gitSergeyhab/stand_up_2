import { OptionType } from "../types/types";

export const appendData = (formData: FormData, options: (OptionType|null)[], ids: string[]) => {
  console.log('+++++++++++++++++++++++++++appendData.entries()')
  options.forEach((item, i) => {
      // formData.delete(ids[i]);
      console.log(formData.getAll('event_status'), 'formData.entries()')
      formData.append(ids[i], item ? String(item.id) : '')
  })
}

