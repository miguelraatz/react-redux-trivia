import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getTokenApi } from '../services/fetchApi';
import { saveInfo } from '../redux/actions';
import '../Login.css';
import logoTrivia from '../imagens/logotrivia.png';
import iconeTrybe from '../imagens/íconetrybe.png';

class Login extends React.Component {
  state = {
    isDisabled: true,
    name: '',
    email: '',
  };

  verificationEmail = () => {
    const { email, name } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexEmail = regex.test(email);
    if (regexEmail && name) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verificationEmail);
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const token = await getTokenApi();
    localStorage.setItem('token', token);
    dispatch(saveInfo({ name, email }));
    history.push('/game');
  };

  clickSettings = () => {
    const { history } = this.props;
    history.push('./settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <>
        <header>
          <img src={ logoTrivia } alt="logo-quiz" className="logo-quiz" />
        </header>

        <form>
          <label htmlFor="input-name">
            <input
              placeholder="Digite seu nome aqui"
              type="text"
              className="input-name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="name"
              value={ name }
            />
          </label>

          <label htmlFor="input-email">
            <input
              placeholder="Digite seu email aqui"
              type="text"
              className="input-email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <button
            className="btn-play"
            data-testid="btn-play"
            disabled={ isDisabled }
            type="button"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            className="btn-config"
            data-testid="btn-settings"
            type="button"
            onClick={ this.clickSettings }
          >
            Configurações
          </button>
        </form>
        <footer>
          <img src={ iconeTrybe } alt="icone trybe" className="icone-trybe" />
        </footer>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
