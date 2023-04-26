import {
  DataRateCC,
  DataRateSC,
  StatRateCC,
  StatRateSC,
} from '../../types/types';

export const adaptStatToClient = (data: StatRateSC): StatRateCC => ({
  count: data.rate_count,
  rate: data.rate,
});

export const adaptRateToClient = (data: DataRateSC): DataRateCC => ({
  date: data.date,
  rateId: data.rate_id,
  userAvatar: data.user_avatar,
  userId: data.user_id,
  userNik: data.user_nik,
  rate: data.rate,
});
