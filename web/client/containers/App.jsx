import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GameSelector from '../components/GameSelector';
import PostList from '../components/PostList';

const mapStateToProps = (state) => state;

class App extends React.Component {
  componentWillMount() {
    const {
      fetchGames,
    } = this.props;
    fetchGames();
  }

  onGameSelected(game) {
    const {
      setCurrentGame,
      fetchPosts
    } = this.props;
    setCurrentGame(game);
    if(game) {
      fetchPosts(game.id);
    }
  }

  render() {
    const {
      games,
      currentGame
    } = this.props;
    const maybeposts = currentGame.posts.length > 0 ? <PostList posts={currentGame.posts} topics={currentGame.topics}/>: undefined;
    return (
      <div>
        <GameSelector
          keyText="name" keyValue="id"
          options={games.data} onOptionSelected={this.onGameSelected.bind(this)}
          selectedValue={currentGame.id}
        />
        {maybeposts}
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(App);
