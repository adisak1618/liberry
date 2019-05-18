import React, { Component } from "react";
import Link from 'next/link';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button, Card, Menu, MenuItem, Popover, Position, Elevation } from "@blueprintjs/core";
import { Container } from 'components/container'
import { Row, Column } from 'components/flex'
import styled from 'styled-components';
import { AdminLayout } from 'layouts';
import QueryBookState from "./../../apolloComponents/book/queryBookState"
const Wrapper = styled.div`
  margin-top: 50px;
  padding: 50px;
  text-align: center;
  .info-card {
    height: 100%;
    margin: 0 10px;
    label {
      font-size: 4em;
      font-weight: bold;
    }
  }
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
        <Wrapper>
          
          <Container>
            <QueryBookState>
              {({ loading, error, data, fetchMore }) => {
                if (error) return <div>Error loading.</div>
                if (loading) return <div>Loading</div>
                const { bookState: { book, returnBook, success } } = data;
                return (
                  <Row space-between alignItem="stretch">
                    <Column fill>
                      <Card className="info-card" elevation={Elevation.TWO}>
                        <h1>จำนวนหนังสือ</h1>
                        <label>{book}</label>
                      </Card>
                    </Column>
                    <Column fill>
                      <Card className="info-card" interactive={true} elevation={Elevation.TWO}>
                        <h1>ยังไม่ได้คืน</h1>
                        <label>{returnBook}</label>
                      </Card>
                    </Column>
                    <Column fill>
                      <Card className="info-card" interactive={true} elevation={Elevation.TWO}>
                        <h1>ยิมแล้ว</h1>
                        <label>{success}</label>
                      </Card>
                    </Column>
                  </Row>
                )
              }}
            </QueryBookState>
          </Container>
        </Wrapper>
      </AdminLayout>
    )
  }
}


export default Admin;