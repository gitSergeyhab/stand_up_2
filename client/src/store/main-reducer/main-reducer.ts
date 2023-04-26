import { createReducer } from '@reduxjs/toolkit';
import { ContentName } from '../../const/const';
import { TabData } from '../../const/data';
import { TabsContent, Titles } from '../../types/types';
import { setTitles, setType } from '../actions';

export type InitialState = {
  type: null | ContentName;
  titles: Titles;
  tabsContent: TabsContent[];
};

const initialState: InitialState = {
  type: null,
  titles: { first: '', second: '' },
  tabsContent: TabData.comedians,
};

export const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTitles, (state, action) => {
      state.titles = action.payload;
    })
    .addCase(setType, (state, action) => {
      state.type = action.payload;
      state.tabsContent = action.payload
        ? TabData[action.payload]
        : TabData.comedians;
    });
});
