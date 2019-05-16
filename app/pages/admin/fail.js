import React, { PureComponent } from 'react';
import Router, { withRouter } from 'next/router';
import axios from 'axios';
import { Spinner } from "@blueprintjs/core";
import { Container } from 'components/container'
import { Row, Column } from 'components/flex'
import styled from 'styled-components';
import Cookies from 'js-cookie';
import Link from 'next/link'
import { channelAccessToken, channelSecret } from '../../config';
const Wrapper = styled.div`
  margin-top: 200px;
  padding: 50px;
  width: 500px;
  text-align: center;
`;
class FailLogin extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Container>
        <Row space-center>
          <Column>
            <Wrapper>
              <div className="bp3-callout">
                <div className="bp3-non-ideal-state">
                  <div className="bp3-non-ideal-state-visual">
                    <span className="bp3-icon bp3-icon-blocked-person"></span>
                  </div>
                  <h4 className="bp3-heading">คุณไม่มีสิทธิเข้าใช้ระบบนี้</h4>
                  <div>โปรดติดต่อ 0993266161</div>
                  <Link href="/">
                    <span className="bp3-button bp3-intent-primary">กลับหน้าแรก</span>
                  </Link>
                </div>
              </div>
            </Wrapper>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default FailLogin;