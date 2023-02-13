import React, { Component } from 'react';
// import { useSelect } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import '../header.css';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    const EmailOfGravatar = md5(gravatarEmail).toString();
    const urlImage = `https://www.gravatar.com/avatar/${EmailOfGravatar}`;
    return (
      <div>
        <header>
          <img src={ logo } alt="logo" className="logo-trivia" />
        </header>
        <main>
          <img
            src={ urlImage }
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
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
