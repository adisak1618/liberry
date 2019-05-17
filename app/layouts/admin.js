import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { Button, Card, Menu, MenuItem, Popover, Position, PopoverInteractionKind, Icon, MenuDivider } from "@blueprintjs/core";
import { Row, Column } from 'components/flex';
import { Container } from 'components/container';
import { withRouter } from 'next/router';
import { media } from 'components/style/media-query';
import GetProfileQuery from '../apolloComponents/staff/getProfile'

const MainWrapper = styled.div`
  height: 100%;
`;

const DropDownMenu = styled.div`
  text-align: right;
  ${Row} {
    width: 150px;
  }
`;

const MainContainer = styled.div`
  min-height: 70vh;
  min-height: -webkit-calc(100vh - 350px);
  min-height: -moz-calc(100vh - 350px);
  min-height: calc(100vh - 350px);
`;

const Avatar = styled.div`
  background: url(${props => props.src});
  background-size: cover;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

class MainLayout extends React.PureComponent {
  render() {
    const { children, theme, statusCode, router, title = 'Tc Library' } = this.props;
    const { route } = router;
    return (
      <MainWrapper>
        <Head>
          <title>{title}</title>
        </Head>
        <GetProfileQuery>
          {({ loading, error, data: { getProfile }, fetchMore }) => {
              if (error) return <div>Error loading.</div>
              if (loading) return <div>Loading</div>
              return (
                <nav className="bp3-navbar bp3-dark">
                  <Container>
                    <div className="bp3-navbar-group bp3-align-left">
                      <div className="bp3-navbar-heading">TC Library</div>
                    </div>
                    <div className="bp3-navbar-group bp3-align-right">
                      <Link href="/admin"><button className="bp3-button bp3-minimal bp3-icon-dashboard">Dashboard</button></Link>
                      <span className="bp3-navbar-divider"></span>
                      <Popover
                        content={
                          <DropDownMenu>
                            <Menu>
                              {/* <MenuItem position={Position.LEFT}>
                                <CustomDropdown>
                                  <div>ผู้ดูแลระบบ</div>
                                </CustomDropdown>
                              </MenuItem> */}
                              <Button fill minimal>
                                <Row space-between>
                                  <div>โปรไฟด์</div>
                                  <Icon icon="person" />
                                </Row>
                              </Button>
                              <Link href="/admin/staff">
                                <Button fill minimal>
                                  <Row space-between>
                                    <div>ผู้ดูแลระบบ</div>
                                    <Icon icon="people" />
                                  </Row>
                                </Button>
                              </Link>
                              <MenuDivider />
                              <Button
                                onClick={() => {
                                  Cookies.remove('library-token');
                                  Router.push('/admin/login');
                                }}
                                fill
                                minimal
                              >
                                <Row space-between>
                                  <div>ออกจากระบบ</div>
                                  <Icon icon="log-out" />
                                </Row>
                              </Button>
                            </Menu>
                          </DropDownMenu>
                        }
                        minimal={true}
                        position={Position.BOTTOM_RIGHT}
                      >
                        <Button rightIcon="caret-down" minimal large>
                          <Row alignItem="center" space-between>
                            <Column>
                              <Avatar src={getProfile.picture} />
                            </Column>
                            <Column>
                              {getProfile.name}
                            </Column>
                          </Row>
                        </Button>
                        {/* <button class="bp3-button bp3-minimal bp3-icon-user"></button> */}
                      </Popover>
                    </div>
                  </Container>
                </nav>
              )
          }}
        </GetProfileQuery>
        <MainContainer>
          {children}
        </MainContainer>
      </MainWrapper>
    );
  }
}

export default withRouter(MainLayout);
