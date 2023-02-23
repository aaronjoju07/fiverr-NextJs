import React, { Component } from 'react';

class TagsInput extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tags: [],
      currentTag: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({ currentTag: event.target.value });
  };

  handleInputKeyDown = (event) => {
    const { currentTag, tags } = this.state;
    if (event.key === 'Enter' && currentTag.trim() !== '') {
      this.setState({
        tags: [...tags, currentTag.trim()],
        currentTag: ''
      });
    } else if (event.key === 'Backspace' && currentTag === '') {
      this.setState({
        tags: tags.slice(0, tags.length - 1)
      });
    }
  };

  handleTagRemove = (tag) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((t) => t !== tag)
    });
  };

  render() {
    const { tags, currentTag } = this.state;

    return (
      <div>
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <button type="button" onClick={() => this.handleTagRemove(tag)}>
              x
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Add tag"
          value={currentTag}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
      </div>
    );
  }
}

export default TagsInput;
