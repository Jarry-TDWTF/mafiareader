import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GameSelector from '../components/GameSelector';
import PostList from '../components/PostList';
import Spinner from '../components/Spinner';

const mapStateToProps = (state) => state;

class App extends React.Component {
  isFetching(state) {
    return state.games.fetching || state.currentGame.fetching;
  }

  componentWillMount() {
    const {
      fetchGames,
    } = this.props;
    fetchGames();
  }

  onGameSelected(game) {
    const {
      setCurrentGame,
      fetchGameInfo
    } = this.props;
    setCurrentGame(game);
    if(game) {
      fetchGameInfo(game.id);
    }
  }

  render() {
    const {
      games,
      currentGame
    } = this.props;
    const maybeposts = currentGame.posts.length > 0 ? <PostList posts={currentGame.posts} topics={currentGame.topics}/>: undefined;
    const maybeSpinner = this.isFetching(this.props)?<Spinner/>:undefined;
    return (
      <div>
        {maybeSpinner}
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
