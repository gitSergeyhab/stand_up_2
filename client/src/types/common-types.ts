export type ServerTitles = {
  titles: {
    native: string,
    en?: string
  }

}

export type CommonListDataType<ListType> = {
  list: ListType[],
  count: number
}

export type CommonListDataWithTitlesType<ListType> = CommonListDataType<ListType> & ServerTitles;
