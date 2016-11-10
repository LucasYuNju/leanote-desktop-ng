import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const initialNotes = {
  searchIds: [],
  starredIds: [],
  byId: {},
}
function notes(state = initialNotes, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.note.noteId]: action.note,
        }
      };
    case types.RECEIVE_NOTES:
      return {
        ...initialNotes,
        byId: action.entities,
      }
    case types.UPDATE_NOTE_SUCCEEDED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.note.noteId]: action.note,
        }
      };
    default:
      return state;
  }
}

const initialNotebooks = {
  rootIds: [],
  byId: {},
};
function notebooks(state = initialNotebooks, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.notebookId]: {
            ...state.byId[action.notebookId],
            noteIds: [
              action.note.noteId,
              ...state.byId[action.notebookId].noteIds,
            ],
          }
        }
      }
    case types.RECEIVE_NOTES:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.notebookId]: {
            ...state.byId[action.notebookId],
            noteIds: action.ids,
          }
        }
      }
    case types.RECEIVE_NOTEBOOKS:
      return {
        rootIds: action.rootIds,
        byId: action.entities,
      };
    default:
      return state;
  }
}


const initialTags={
  byTag: {},
}
function tags(state = initialTags, action) {
  switch (action.type) {
    case types.RECEIVE_NOTES:
      const ret = {
        byTag: {
          ...state.byTag,
        },
      }
      const notes = Object.keys(action.entities).forEach(noteId => {
        const note = action.entities[noteId];
        note.tags.forEach(tag => {
          if (tag) {
            if (!ret.byTag[tag]) {
              ret.byTag[tag] = {
                tag,
                noteIds: [],
              };
            }
            if (!ret.byTag[tag].noteIds.includes()) {
              ret.byTag[tag].noteIds.push(noteId);
            }
          }
        })
      });
      return ret;
    default:
      return state;
  }
}

function users(state = { byId: {} }, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      if (action.status === 'success') {
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.user.userId]: action.user,
          }
        }
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  notes,
  notebooks,
  tags,
  users,
});