import { toast } from 'react-toastify';
import { adaptLoginUserDataToClient } from '../utils/adapters/user-adapters';
import { storageUtils } from '../utils/storage-utils';
import { setUser } from './actions';
import { getRefresh } from './refresh-api';
import { ThunkActionResult } from './store';


export const authAction = (): ThunkActionResult => async (dispatch) => {
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
    const {} = await api.get('form-data/preload')
  }