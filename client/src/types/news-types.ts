import { CommonListDataType } from "./common-types";

export type NewsSC = {
  news_id: string;
  news_title: string;
  news_text: string;
  // news_img_url?: string;
  user_id: string;
  user_nik: string;
  main_picture: string;
  // user_img?: string;
  date_added: Date;
  date_updated: Date;
  weekly_views: string;
  total_views: string;
}

export type NewsCC = {
  newsId: string;
  newsTitle: string;
  newsText: string;
  // newsImgUrl?: string;
  mainPicture: string;
  userId: string;
  userNik: string;
  // userImg?: string;
  dateAdded: Date;
  dateUpdated: Date;
  weeklyViews: string;
  totalViews: string;
}

export type NewsDataSC = CommonListDataType<NewsSC>

export type NewsDataCC = CommonListDataType<NewsCC>

export type NewsState = {
  newsId: string;
  newsTitle: string;
  newsText: string;
  mainPicture: string;
}

