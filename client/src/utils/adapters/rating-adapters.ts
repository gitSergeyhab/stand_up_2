import { ComedianShowRatingCC, ComedianShowRatingCountCC, ComedianShowRatingCountSC, ComedianShowRatingSC } from "../../types/rating-types";



export const adaptComedianShowRatingToClient = (data: ComedianShowRatingSC): ComedianShowRatingCC => ({
  avgShowRate: data.avg_show_rate,
  showDateRate: data.show_date_rate,
  showId: data.show_id,
  showName: data.show_name,
  showRate: data.show_rate,
  showRatingId: data.show_rating_id,
  totalViews: data.total_views,
  userId: data.user_id,
  userNik: data.user_nik,
  weeklyViews: data.weekly_views,
  showPicture: data.show_picture,
  userAvatar: data.user_avatar
});



export const adaptComedianShowRatingCountToClient = (data: ComedianShowRatingCountSC): ComedianShowRatingCountCC => ({
  list: data.list.map(adaptComedianShowRatingToClient),
  count: +data.count
})
