import React from 'react';

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

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="input-name">
          Nome
          <input
            type="text"
            className="input-name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="name"
            value={ name }
          />
        </label>

        <label htmlFor="input-email">
          Email
          <input
            type="text"
            className="input-email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <button
          data-testid="btn-play"
          disabled={ isDisabled }
          type="button"
        >
          Play

        </button>
      </form>
    );
  }
}

export default Login;
