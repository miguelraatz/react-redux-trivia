import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  yourRank = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minNumberOfAnswers = 3;
    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-text">
            {assertions < minNumberOfAnswers ? 'Could be better...'
              : 'Well Done!'}
          </p>

          <p data-testid="feedback-total-score">
            {score}
          </p>
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
          <button
            onClick={ this.playAgain }
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
          <button
            onClick={ this.yourRank }
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,

};

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
