import React, { Component } from "react";
import Link from 'next/link';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button, Card, Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import { Container } from 'components/container'
import { Row, Column } from 'components/flex'
import styled from 'styled-components';
import { AdminLayout } from 'layouts';

const Wrapper = styled.div`
  margin-top: 200px;
  padding: 50px;
  width: 500px;
  text-align: center;
`;
// const Admin = (props) => {
//   console.log('props', props);
//   return (
//     <AdminLayout>
//       hi
//     </AdminLayout>
//   )
// }
@inject('AppStore', 'UserStore')
@observer class Admin extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <AdminLayout>
        hi
      </AdminLayout>
    )
  }
}


export default Admin;