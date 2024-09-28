import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, Appdispatch } from './store';

export const useAppDispatch: () => Appdispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;