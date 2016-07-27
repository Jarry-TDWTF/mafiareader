import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GameSelector from '../components/GameSelector';

const mapStateToProps = (state) => state;

class App extends React.Component {
  componentWillMount() {
    const {
      fetchGames
    } = this.props;
    fetchGames();
  }

  render() {
    const {games} = this.props;
    return (
      <div>
        <GameSelector keyText="name" keyValue="id" options={games.data} onOptionSelected=""/>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(App);
