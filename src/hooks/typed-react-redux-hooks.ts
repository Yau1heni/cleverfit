import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@redux/configure-store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: unknown;
    extra?: unknown;
}>();
