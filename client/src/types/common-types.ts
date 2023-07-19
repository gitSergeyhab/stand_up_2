import { GridCardType } from "./types"

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
export type CardDataCC = CommonListDataType<GridCardType>
export type CardDataWithTitlesCC = CommonListDataWithTitlesType<GridCardType>
