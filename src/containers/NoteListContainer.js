import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import NoteList from '../components/NoteList';
import * as NavigatorActionCreators from '../actions/NavigatorActions';
import * as NoteActionCreators from '../actions/NoteActions';
import { parseUrl } from '../util/RouteUtil';

class NoteListContainer extends Component {
  render() {
    return (
      <NoteList {...this.props} selectNote={this.selectNote}/>
    );
  }

	selectNote = (noteId) => {
		this.props.replaceState(`#/${this.props.noteListType}/${this.props.noteListId}/notes/${noteId}`);
	};
}

function mapStateToProps(state) {
  const {
    entities,
		navigator,
    note,
    noteList: noteListRef,
  } = state;
	const params = parseUrl('/:noteListType?/:noteListId?/notes/:noteId?', navigator.path) || {};
	const {
		noteListType,
		noteListId,
		noteId,
	} = params;

  const result = { ...params };
  if (noteListId) {
    const noteList = entities[noteListType].byId[noteListId];
		// console.error(noteListId, noteListType, noteList);
		// if (!noteList) {
		// 	console.log("notelistcontaine", window.location.hash);
		// }

    const order = noteListRef.order;
    // TODO rewrite with reselect
		result.notes = noteList.noteIds
			.map(noteId => entities.notes.byId[noteId])
			.sort((note1, note2) => {
				// TODO refactor
				let extractKey = (note) => note[order.key];
				if (order.key.toLowerCase().includes('time')) {
					extractKey = (note) => new Date(note[order.key]);
				}
				const key1 = extractKey(note1);
				const key2 = extractKey(note2);
				return order.ascending ? key1 > key2 : key1 < key2;
			});
    result.notebookId = noteListId;
    result.notebookTitle = noteListType === 'notebooks' ? noteList.title : noteList.tag;
  }
  return result;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActionCreators, ...NavigatorActionCreators}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
