import React, { PureComponent } from 'react';
import Router, { withRouter } from 'next/router';
import axios from 'axios';
import { Spinner } from "@blueprintjs/core";
import { Container } from 'components/container'
import { Row, Column } from 'components/flex'
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { channelAccessToken, channelSecret } from '../../config';
const Wrapper = styled.div`
  margin-top: 200px;
  padding: 50px;
  width: 500px;
  text-align: center;
`;
class SuccessLogin extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { router } = this.props;
    const { query } = router;
    const { token } = query;
    if (token) {
      Cookies.set('library-token', token);
      Router.push('/admin')
    } else {
      Router.push('/')
    }
  }


  render() {
    return (
      <Container>
        <Row space-center>
          <Column>
            <Wrapper>
              <Spinner size={Spinner.SIZE_LARGE} />
              <div className="bp3-running-text">
                <h2>กำลังเข้าสู่ระบบ</h2>
              </div>
            </Wrapper>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SuccessLogin);