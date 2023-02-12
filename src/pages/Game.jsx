import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { actionFetchQuestionsApi } from '../redux/actions';
import '../game.css';

class Game extends Component {
  state = {
    index: 0,
    classButton: false,
    secondsTimer: 30,
  };

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const token = localStorage.getItem('token');
    const fetch = await dispatch(actionFetchQuestionsApi(token));
    const INVALID_TOKEN = 3;
    if (fetch.response_code === INVALID_TOKEN) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.timer();
    }
  }

  timer = () => {
    const MILLISECONDS = 1000;
    const timerInterval = setInterval(() => {
      const { secondsTimer } = this.state;
      if (secondsTimer > 0) {
        this.setState({ secondsTimer: secondsTimer - 1 });
      }
    }, MILLISECONDS);
    return () => clearInterval(timerInterval);
  };

  handleClick = () => {
    this.setState({ classButton: true });
  };

  render() {
    const { questions, answersShuffle } = this.props;
    const { index, classButton, secondsTimer } = this.state;
    return (
      <>
        <Header />
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>
            <p data-testid="question-text">{questions[index].question}</p>
            <div data-testid="answer-options">
              {answersShuffle[index].map((answer, i) => (
                <button
                  key={ answer }
                  value={ answer }
                  disabled={ secondsTimer === 0 }
                  onClick={ this.handleClick }
                  className={ (classButton || secondsTimer === 0) && (questions[index]
                    .correct_answer === answer
                    ? 'correct-answer' : 'wrong-answer') }
                  data-testid={ questions[index]
                    .correct_answer === answer
                    ? 'correct-answer' : `wrong-answer-${i}` }
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

Game.propTypes = {
  answersShuffle: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  answersShuffle: game.answersShuffle,
});

export default connect(mapStateToProps)(Game);
