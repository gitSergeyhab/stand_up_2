import { toast } from 'react-toastify';
import { adaptLoginUserDataToClient } from '../utils/adapters/user-adapters';
import { storageUtils } from '../utils/storage-utils';
import { setPreloadData, setUser, setUserInfo } from './actions';
import { getRefresh } from './refresh-api';
import { ThunkActionResult } from './store';
import { FormDataSC } from '../types/preload-type';
import { adaptFormDataToClient } from '../utils/adapters/preload-adapters';
import { UserInfo } from '../types/user-types';


export const authAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await getRefresh();
      const userData = adaptLoginUserDataToClient(data);
      storageUtils.setData(userData);
      dispatch(setUser(userData.user));
      toast.success('Auth Complete');
      const {data: userInfo} = await api.get<UserInfo>('users/user-info');
      console.log({userInfo})
      dispatch(setUserInfo(userInfo));
      console.log({userInfo})
      toast.success('user info downloaded');
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
      console.log({adaptedData})
    } catch (err) {
      console.log({err})
      toast.error('Данные не загрузились. Попробуте позже')
    }
  }
