import React, { PureComponent } from 'react';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { withApollo } from 'react-apollo';
import inviteStaff from "./../apolloComponents/invite/inviteStaff"
import createInvite from "./../apolloComponents/invite/create"
import { AnchorButton, Card, Elevation, Spinner, Icon, Button } from "@blueprintjs/core";
import { Container } from 'components/container'
import { Row, Column } from 'components/flex'
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 200px;
  padding-bottom: 50px;
  text-align: center;
`;

class Invite extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      lineid: "none",
      working: true,
      profile_url: "profile_url",
      error: false
    }
  }
  async componentDidMount() {
    const { client, router: { query } } = this.props;
    if(query.code === undefined || query.code === "") {
      this.setState({
        error: true
      });
      return
    }
    liff.init(
      async (data) => {
        // Now you can call LIFF API
        // const userId = data.context.userId;
        const result = await liff.getProfile()
        const { data: { createStaff } } = await inviteStaff(
          client,
          {
            code: query.code,
            name: result.displayName,
            profile_url: result.pictureUrl,
            lineid: data.context.userId
          }
        )
        if (createStaff) {
          this.setState({
            working: false
          });
        } else {
          this.setState({
            error: true
          });
        }
      },
      err => {
        // LIFF initialization failed
        this.setState({
          lineid: "error",
          profile_url: "error"
        })
      }
    );
  }

  closeWindown() {
    liff.closeWindow()
  }


  render () {
    const random = Math.floor(Math.random()*10000)
    const { lineid, working, profile_url, error } = this.state;
    return (
      <Wrapper>
        <Head>
          <script src="https://d.line-scdn.net/liff/1.0/sdk.js"></script>
        </Head>
        <Container>
          <Row space-center>
            <Column>
              {
                error ? <Card>
                  <Icon icon="error" iconSize={35} intent="danger"/>
                  <br /><br />
                  <h2 class="bp3-heading">Link นี้ใช้งานไม่ได้</h2>
                </Card>: (
                  (working) ? (
                    <Card>
                      {/* <h2>{profile_url}</h2> */}
                      <h2 class="bp3-heading">กำลังดำเนินการ</h2>
                      <br />
                      <Spinner />
                      <br />
                      <div class="bp3-running-text">
                        เรากำลังสร้างบัญชีผู้ใช้ใหม่ให้คุณกรุณารอซักครู่
                      </div>
                    </Card>
                  ): <Card>
                    <Icon icon="tick-circle" iconSize={35} intent="success"/>
                    <br /><br />
                    <h2 class="bp3-heading">สำเร็จแล้ว</h2>
                    เริ่มใช้งาน line bot ของเราได้เลย
                    <br /><br />
                    <AnchorButton href="line://ti/p/%40456buhvr" onClick={this.closeWindown} large>เริ่มใช้งาน</AnchorButton>
                  </Card>
                )
              }
            </Column>
          </Row>
        </Container>
      </Wrapper>
    )
  }
}

export default withRouter(withApollo(Invite));