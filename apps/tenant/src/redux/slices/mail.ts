import keyBy from 'lodash/keyBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import { IMailState } from '../../@types/mail';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: IMailState = {
  isLoading: false,
  error: null,
  mails: { byId: {}, allIds: [] },
  labels: [],
};

const slice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LABELS
    getLabelsSuccess(state, action) {
      state.isLoading = false;
      state.labels = action.payload;
    },

    // GET MAILS
    getMailsSuccess(state, action) {
      const mails = action.payload;

      state.isLoading = false;
      state.mails.byId = keyBy(mails, 'id');
      state.mails.allIds = Object.keys(state.mails.byId);
    },

    // GET MAIL
    getMailSuccess(state, action) {
      const mail = action.payload;

      state.mails.byId[mail.id] = mail;
      if (!state.mails.allIds.includes(mail.id)) {
        state.mails.allIds.push(mail.id);
      }
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getLabels() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/labels');
      dispatch(slice.actions.getLabelsSuccess(response.data.labels));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMails(params: Record<string, string>) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mails', { params });
      dispatch(slice.actions.getMailsSuccess(response.data.mails));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMail(mailId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mail', {
        params: { mailId },
      });
      dispatch(slice.actions.getMailSuccess(response.data.mail));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
