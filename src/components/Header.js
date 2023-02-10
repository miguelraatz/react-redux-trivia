import React, { Component } from 'react';
// import { useSelect } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { user: { name, gravatarEmail, score } } = this.props;

    const EmailOfGravatar = md5(gravatarEmail).toString();
    console.log(gravatarEmail);

    return (
      <div>
        <header>
          <img src={ logo } alt="logo" />
        </header>
        <main>
          <img
            src={ `https://www.gravatar.com/avatar/${EmailOfGravatar}` }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">
            { score }
            {' '}
          </p>
        </main>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.player,
});

export default connect(mapStateToProps)(Header);
