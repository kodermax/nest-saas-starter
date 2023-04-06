import keyBy from 'lodash/keyBy';
import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
// utils
import axios from '../../utils/axios';
// @types
import { IKanbanState, IKanbanCard, IKanbanColumn } from '../../@types/kanban';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: IKanbanState = {
  isLoading: false,
  error: null,
  board: {
    cards: {},
    columns: {},
    columnOrder: [],
  },
};

const slice = createSlice({
  name: 'kanban',
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

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const cards = keyBy(board.cards, 'id');
      const columns = keyBy(board.columns, 'id');
      const { columnOrder } = board;

      state.board = {
        cards,
        columns,
        columnOrder,
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = {
        ...state.board.columns,
        [newColumn.id]: newColumn,
      };
      state.board.columnOrder.push(newColumn.id);
    },

    persistCard(state, action) {
      const columns = action.payload;
      state.board.columns = columns;
    },

    persistColumn(state, action) {
      state.board.columnOrder = action.payload;
    },

    addTask(state, action) {
      const { card, columnId } = action.payload;

      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },

    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;

      state.board.columns[columnId].cardIds = state.board.columns[columnId].cardIds.filter(
        (id) => id !== cardId
      );

      state.board.cards = omit(state.board.cards, [cardId]);
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.isLoading = false;
      state.board.columns[column.id] = column;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.isLoading = false;
      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.cards = omit(state.board.cards, [...deletedColumn.cardIds]);
      state.board.columnOrder = state.board.columnOrder.filter((c) => c !== columnId);
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBoard() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/kanban/board');
      dispatch(slice.actions.getBoardSuccess(response.data.board));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn: { name: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/new', newColumn);
      dispatch(slice.actions.createColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId: string, updateColumn: IKanbanColumn) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/update', {
        columnId,
        updateColumn,
      });
      dispatch(slice.actions.updateColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/kanban/columns/delete', { columnId });
      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistColumn(newColumnOrder: string[]) {
  return () => {
    dispatch(slice.actions.persistColumn(newColumnOrder));
  };
}

// ----------------------------------------------------------------------

export function persistCard(columns: Record<string, IKanbanColumn>) {
  return () => {
    dispatch(slice.actions.persistCard(columns));
  };
}

// ----------------------------------------------------------------------

export function addTask({ card, columnId }: { card: Partial<IKanbanCard>; columnId: string }) {
  return () => {
    dispatch(slice.actions.addTask({ card, columnId }));
  };
}

// ----------------------------------------------------------------------

export function deleteTask({ cardId, columnId }: { cardId: string; columnId: string }) {
  return () => {
    dispatch(slice.actions.deleteTask({ cardId, columnId }));
  };
}
