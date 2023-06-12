export type ComedianShowRatingSC = {
  user_id:         string;
  user_nik:        string;
  show_id:         string;
  show_name:       string;
  show_rating_id:  string;
  show_rate:       number;
  show_date_rate:  string;
  weekly_views:    string;
  total_views:     string;
  avg_show_rate:   number;
  user_avatar?:    string;
  show_picture?:   string;
}

export type ComedianShowRatingCountSC = {list: ComedianShowRatingSC[]} & {count: string}


export type ComedianShowRatingCC = {
  userId:        string;
  userNik:       string;
  showId:        string;
  showName:      string;
  showRatingId: string;
  showRate:      number;
  showDateRate: string;
  weeklyViews:   string;
  totalViews:    string;
  avgShowRate:  number;
  userAvatar?:    string;
  showPicture?:   string;
}

export type ComedianShowRatingCountCC = {list: ComedianShowRatingCC[]} & {count: number}
