import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Button, Card, Menu, MenuItem, Popover, Position, PopoverInteractionKind } from "@blueprintjs/core";
import { Row, Column } from 'components/flex';
import { Container } from 'components/container';
import { withRouter } from 'next/router';
import { media } from 'components/style/media-query';

const MainWrapper = styled.div`
  height: 100%;
`;

const MainContainer = styled.div`
  min-height: 70vh;
  min-height: -webkit-calc(100vh - 350px);
  min-height: -moz-calc(100vh - 350px);
  min-height: calc(100vh - 350px);
`;

class MainLayout extends React.PureComponent {
  render() {
    const { children, theme, statusCode, router, title = 'Tc Library' } = this.props;
    const { route } = router;
    // if (statusCode) {
    //   return <ErrorPage statusCode={statusCode} message="error!" />;
    // }
    return (
      <MainWrapper>
        <Head>
          <title>{title}</title>
        </Head>
        <nav class="bp3-navbar bp3-dark">
          <Container>
            <div class="bp3-navbar-group bp3-align-left">
              <div class="bp3-navbar-heading">TC Library</div>
            </div>
            <div class="bp3-navbar-group bp3-align-right">
              <button class="bp3-button bp3-minimal bp3-icon-home">Home</button>
              <span class="bp3-navbar-divider"></span>
              <Popover
                content={
                  <div className="mainmenudropdown">
                    <Menu>
                      <MenuItem text="Submenu" />
                    </Menu>
                  </div>
                }
                minimal={true}
                position={Position.BOTTOM_RIGHT}
              >
                <Button icon="user" rightIcon="caret-down" text="โปรไฟด์" />
                {/* <button class="bp3-button bp3-minimal bp3-icon-user"></button> */}
              </Popover>
            </div>
          </Container>
        </nav>
        <MainContainer>
          {children}
        </MainContainer>
      </MainWrapper>
    );
  }
}

export default withRouter(MainLayout);
