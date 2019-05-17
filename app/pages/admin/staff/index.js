import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, Card, Elevation, Popover, Position, IconName } from "@blueprintjs/core";
import { Container } from 'components/container';
import { Row, Column } from 'components/flex';
import { Avatar } from 'components/avatar';
import styled from 'styled-components';
import { AdminLayout } from 'layouts';
import CreateInvite from 'components/modules/createInvatation';
import QueryInvite from "../../../apolloComponents/invite/query"
import QueryStaff from "../../../apolloComponents/staff/query"

const Wrapper = styled.div`
  margin-top: 200px;
  padding: 50px;
  width: 500px;
  text-align: center;
`;

const StaffWrapper = styled.div`
  margin-top: 100px;
  .member {
    margin-top: 20px;
  }
  .card {
    margin: 10px;
  }
  ${Avatar} {
    margin-right: 10px;
  }
  .type {
    border-left: solid 1px #ccc;
    padding-left: 10px;
    margin-left: 10px;
  }
`;

const Admin = (props) => {
  return (
    <AdminLayout>
      <Container>
        <StaffWrapper>
          <h2 class="bp3-heading">ผู้ดูแลระบบ</h2>
          <div className="member">
            <QueryStaff>
              {({ loading, error, data, fetchMore }) => {
                if (error) return <div>Error loading.</div>
                if (loading) return <div>Loading</div>
                const { findStaffs } = data;
                return (
                  <div class="pure-g">
                    <div class="pure-u-1-3">
                      <Card className="card " interactive={false} elevation={Elevation.TWO}>
                        <Row alignItem="center">
                          <Column>
                            <Avatar src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/250px-Iron_Man_bleeding_edge.jpg" />
                          </Column>
                          <Column fill>
                            <div class="bp3-text-small">
                              <b>ชื่อ</b>
                            </div>
                            OTTO
                          </Column>
                          <Column className="type" alignself="space-end">
                            <div class="bp3-text-small">
                              <b>ตำแหน่ง</b>
                            </div>
                            ADMIN
                          </Column>
                        </Row>
                      </Card>
                    </div>
                    {findStaffs.map(({ name, role, profile_url }) => {
                      return(
                        <div class="pure-u-1-3">
                          <Card className="card " interactive={false} elevation={Elevation.TWO}>
                            <Row alignItem="center">
                              <Column>
                                <Avatar src={profile_url} />
                              </Column>
                              <Column fill>
                                <div class="bp3-text-small">
                                  <b>ชื่อ</b>
                                </div>
                                {name}
                              </Column>
                              <Column className="type" alignself="space-end">
                                <div class="bp3-text-small">
                                  <b>ตำแหน่ง</b>
                                </div>
                                {role}
                              </Column>
                            </Row>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                );
              }}
            </QueryStaff>
          </div>
        </StaffWrapper>
        <StaffWrapper>
          <Row space-between>
            <Column>
              <h2 class="bp3-heading">คำเชิญ</h2>
            </Column>
            <Column>
              <Popover
                content={<CreateInvite />}
                position={Position.BOTTOM_RIGHT}
              >
                <Button intent="primary" rightIcon="following" large={true}>สร้างคำเชิญ</Button>
              </Popover>
            </Column>
          </Row>
          <div className="member">
            <QueryInvite>
              {({ loading, error, data, fetchMore }) => {
                if (error) return <div>Error loading.</div>
                if (loading) return <div>Loading</div>
                const { findInvites } = data;
                return (
                  <div class="pure-g">
                    {findInvites.map(({ name, role, code }, index) => (
                      <div class="pure-u-1-3">
                        <Card className="card " interactive={false} elevation={Elevation.TWO}>
                          <Row alignItem="center">
                            <Column fill>
                              <div class="bp3-text-small">
                                <b>ชื่อ</b>
                              </div>
                              {name}
                            </Column>
                            <Column className="type" alignself="space-end">
                              <div class="bp3-text-small">
                                <b>ตำแหน่ง</b>
                              </div>
                              {role.toUpperCase()}
                            </Column>
                            <Column className="type" alignself="space-end">
                              <Popover
                                content={
                                  <div className="share-invite">
                                    <input type="text" class="bp3-input" readonly value={`https://line.me/R/app/1574531203-XZRbjwMj?code=${code}`} />
                                  </div>
                                }
                                position={Position.TOP}
                              >
                                <Button large={true} rightIcon='share'>แชร์</Button>
                              </Popover>
                            </Column>
                          </Row>
                        </Card>
                      </div>
                    ))}
                  </div>
                )
              }}
            </QueryInvite>
          </div>
        </StaffWrapper>
      </Container>
    </AdminLayout>
  )
}


export default Admin;