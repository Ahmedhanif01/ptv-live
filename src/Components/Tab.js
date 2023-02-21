import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {

  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    const { label, onClick } = this.props;
    onClick(label);
    e.preventDefault();
    return false;
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'nav-link';

    if (activeTab === label) {
      className += ' active';
    }

    return (
      <li className="nav-item" >
        <div className={className} onClick={onClick}>
          {label}
        </div>
      </li>
    );
  }
}


export default Tab;