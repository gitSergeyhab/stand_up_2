import { NewsCC, NewsSC, NewsDataCC, NewsDataSC } from '../../types/news-types';


export const adaptServerNewsToClient = (data: NewsSC): NewsCC => ({

  newsId: data.news_id,
  newsText: data.news_text,
  newsTitle: data.news_title,
  mainPicture: data.main_picture,
  // newsImgUrl: data.news_img_url,
  totalViews: data.total_views,
  weeklyViews: data.weekly_views,
  userId: data.user_id,
  userNik: data.user_nik,
  // userImg: data.user_img,
  dateAdded: data.date_added,
  dateUpdated: data.date_updated

});

export const adaptServerNewsDataToClient = (result: NewsDataSC): NewsDataCC => ({
  list: result.list.map(adaptServerNewsToClient),
  count: +result.count,
});
