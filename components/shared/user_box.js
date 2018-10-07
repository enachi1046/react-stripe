import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {User} from 'react-feather'
import DropdownMenu from 'react-dd-menu';

export default class AccountDropdown extends Component {
  constructor() {
    super();
    this.state = {
        isMenuOpen: false
    };
    this.click = this.click.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

  click() {
    console.log('You clicked an item');
  }

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <li onClick={this.toggle}><a href="#" className="white">My Account</a></li>,
      align: 'left'
    };
    return (
      <DropdownMenu {...menuOptions}>
      <li><a href="#" className="white">Logout</a></li>
      </DropdownMenu>
    );
  }
}