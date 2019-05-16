import Link from 'next/link'
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { AnchorButton, Card, Elevation } from "@blueprintjs/core";
import { Container } from 'components/container'
import { Row, Column } from 'components/flex'
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 200px;
  padding: 50px;
  width: 500px;
  text-align: center;
`;

const Admin = ({ router }) => {
  const random = Math.floor(Math.random()*10000)
    const { query } = router;
    const { invite_code } = query;
  return (
    <Container>
      <Row space-center>
        <Column>
          <Wrapper>
            <Card elevation={Elevation.ONE}>
                <h1 className="bp3-heading">ผู้ดูแลระบบ</h1>
                <p>เข้าสู่ระบบ</p>
                <center>
                  <AnchorButton
                    large text="เข้าสู่ระบบด้วย 'line'"
                    href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1574531203&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Floginsuccess%3Finvite_code%3D${invite_code}&scope=openid%20profile&bot_prompt=normal&state=${random}&prompt=consent&nonce=5b7acdaae5ec3570e48e5fd0d786a6c5813db22f`}
                  />
                  <br />
                  <Link href="/admin/staff"><AnchorButton>staff</AnchorButton></Link>
                </center>
            </Card>

          </Wrapper>
        </Column>
      </Row>
    </Container>
  )
}


export default withRouter(Admin);