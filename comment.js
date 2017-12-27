class CommentBox extends React.Component {
  constructor(){
    super();

    this.state = {
      showComments: false,
      isAbusive: false,
    };
  }

  render() {
    const comments = this._getComments() || [];
    let commentNodes;
    if (this.state.showComments){
      commentNodes = <div className="comment-list">{comments}</div>
    }
    let buttonText = "Show Comments";
    if (this.state.showComments){
      buttonText = "Hide comments";
    }
    return(
      <div className="comment-box">
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)} comments</h4>
        {commentNodes}
      </div>
    );
  }

  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;

    if(commentCount > POPULAR_COUNT) {
      return(
         <div>
            This post is getting really popular, dont miss out!
         </div>
      );
    }
  }

  _getComments() {
    const commentList = [
      { id: 1, author: 'Clu', body: 'Just say no to love!', avatarUrl: 'images/default-avatar.png' },
      { id: 2, author: 'Anne Droid', body: 'I wanna know what love is...', avatarUrl: 'images/default-avatar.png' }
    ];

    return commentList.map((comment) => {
      return (<Comment
               author={comment.author}
               body={comment.body}
               avatarUrl={comment.avatarUrl}
               key={comment.id} />);
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }
}


class Comment extends React.Component {
  _toggleAbuse(event){
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    })

  }
  render() {
    let commentBody;
    if (!this.state.isAbusive) {
      commentbody = this.props.body
    } else {
      commentBody = <em>Content marked as abusive
    }
    return(
      <div className="comment">
      <img src = {this.props.avatarUrl} alt = {`${this.props.author}'s picture`}/>

        <p className="comment-header">
          {this.props.author}
        </p>
        <p className="comment-body">
          {commentBody}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abusive</a>
        </div>
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New comment</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={input => this._author = input} />
          <textarea
            placeholder="Comment:"
            ref={textarea => this._body = textarea} >
            onKeyUp={this._getCharacterCount.bind(this)}
          </textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0 });
  }

  _getCharacterCount(){
    this.setState({
      characters: this._body.value.length
    });
  }

}
