import React, {Component, PropTypes} from 'react';

import SummernoteEditor from '../components/SummernoteEditor';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    content: '',
  }

  handleContentChange = (content) => {
    this.setState({
      content,
    });
  };

  handleBlur = () => {
    if (this.props.note) {
      if (this.props.note.Content != this.state.content) {
        this.props.onChange({ 
          NoteId: this.props.note.NoteId,
          Content: this.state.content,
        });
      }      
    }
  };

  render () {
    const note = this.props.note;
    let content = note ? note.Content : '';
    return (
      <div className="note">
      <SummernoteEditor
        value={content}
        options={{
          dialogsInBody: true,
          lang: "en-US",
          minHeight: 300,
          toolbar: [
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
            ['view', ['codeview']]
          ],
          popover: {
            image: [],
            link: [],
            air: [],
          },
          defaultFontName: 'Helvetica Neue',
          fontNames: [
            'Arial', 'Courier New', 'Helvetica Neue', 'Lucida Sans', 'Tahoma', 'Times New Roman'
          ],
          fontNamesIgnoreCheck: [
            'Arial', 'Courier New', 'Helvetica Neue', 'Lucida Sans', 'Tahoma', 'Times New Roman'
          ],
          fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
        }}
        onBlur={this.handleBlur}
        onChange={this.handleContentChange}
      />
      </div>
    );
  }
}

export default Note;
