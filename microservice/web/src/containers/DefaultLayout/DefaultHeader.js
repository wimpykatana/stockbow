import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png';

import Avatar from '../../component/Avatar';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {



  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>

        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 156, height: 80, alt: 'Invesgram Logo' }}
        />

        <Avatar />

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
