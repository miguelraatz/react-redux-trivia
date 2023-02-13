import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { actionFetchQuestionsApi, saveScore } from '../redux/actions';
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

  difficultyScore = () => {
    const { index } = this.state;
    const { questions } = this.props;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    switch (questions[index].difficulty) {
    case 'easy':
      return EASY;
    case 'medium':
      return MEDIUM;
    case 'hard':
      return HARD;
    default:
      return 0;
    }
  };

  handleClick = ({ target }) => {
    this.setState({ classButton: true });
    const { questions, dispatch } = this.props;
    const { index } = this.state;
    const POINTS = 10;
    if (target.value === questions[index].correct_answer) {
      const { secondsTimer } = this.state;
      const sum = POINTS + (secondsTimer * this.difficultyScore());
      dispatch(saveScore(sum));
      this.setState({ secondsTimer: 0 });
    } else {
      this.setState({ secondsTimer: 0 });
    }
  };

  verificationClass = (answer) => {
    const { questions } = this.props;
    const { index, classButton, secondsTimer } = this.state;
    if (classButton || secondsTimer === 0) {
      if (questions[index].correct_answer === answer) {
        return 'correct-answer';
      }
      return 'wrong-answer';
    } return '';
  };

  render() {
    const { questions, answersShuffle } = this.props;
    const { index, secondsTimer } = this.state;
    return (
      <>
        <Header />
        {questions.length > 0 && (
          <div>
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
                    className={ this.verificationClass(answer) }
                    data-testid={ questions[index]
                      .correct_answer === answer
                      ? 'correct-answer' : `wrong-answer-${i}` }
                  >
                    {answer}
                  </button>
                ))}
              </div>
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
