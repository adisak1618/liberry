import React, { PureComponent } from 'react';
import Router, { withRouter } from 'next/router';
import axios from 'axios';
import { Container } from 'components/container'
import { Row, Column } from 'components/flex'
import FindBookWithISBN from 'components/modules/findBook'
import CreateBook from 'components/modules/createBook'
import styled from 'styled-components';
import Link from 'next/link'
import { AdminLayout } from 'layouts';
import { Button, Card, Elevation } from "@blueprintjs/core";
const Wrapper = styled.div`
  padding: 50px 0;
`;

const ISBNPanel = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 30px;
  h3 {
    text-align: center;
  }
`
class FailLogin extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <AdminLayout>
        <Wrapper>
          <Container>
            <AddBookBox>
              <Card elevation={Elevation.ONE}>
                <FindBookWithISBN />
                <CreateBook />
              </Card>
            </AddBookBox>
          </Container>
        </Wrapper>
      </AdminLayout>
    );
  }
}

export default FailLogin;


const AddBookBox = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 30px;
  h3 {
    text-align: center;
  }
`