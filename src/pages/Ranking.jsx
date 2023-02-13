import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Inicio

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};

export default connect()(Ranking);
