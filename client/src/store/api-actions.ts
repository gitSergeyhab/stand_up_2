import { toast } from 'react-toastify';
import { adaptLoginUserDataToClient } from '../utils/adapters/user-adapters';
import { storageUtils } from '../utils/storage-utils';
import { setPreloadData, setRooms, setUser } from './actions';
import { getRefresh } from './refresh-api';
import { ThunkActionResult } from './store';
import { FormDataSC } from '../types/preload-type';
import { adaptFormDataToClient } from '../utils/adapters/preload-adapters';
import { RoomSC } from '../types/chat-types';
import { adaptRooms } from '../utils/adapters/chat-adapters';


export const authAction = (): ThunkActionResult =>
  async (dispatch) => {
    try {
      const { data } = await getRefresh();
      const userData = adaptLoginUserDataToClient(data);
      storageUtils.setData(userData);
      dispatch(setUser(userData.user));
      toast.success('Auth Complete');
    } catch (err) {
      storageUtils.removeData();
      dispatch(setUser(null));
      toast.error('!!! - Auth Error - !!!');
      // console.log(err);
    }
};


export const fetchPreloadData = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<FormDataSC>('form-data/preload');
      const adaptedData = adaptFormDataToClient(data);
      dispatch(setPreloadData(adaptedData));
      // console.log({adaptedData})
    } catch (err) {
      console.log({err})
      toast.error('Данные не загрузились. Попробуте позже')
    }
  }


  export const fetchRooms = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<RoomSC[]>('chat/rooms');
      const rooms = adaptRooms(data);
      dispatch(setRooms(rooms));
      // console.log({rooms})
    } catch (err) {
      console.log({err})
      toast.error('Данные не загрузились. Попробуте позже')
    }
  }
