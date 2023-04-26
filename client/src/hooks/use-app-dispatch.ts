import { useDispatch } from 'react-redux';
import { ReducerType } from '../store/store';
import { TypedDispatch } from '../types/types';

export const useAppDispatch = () => useDispatch<TypedDispatch<ReducerType>>();
