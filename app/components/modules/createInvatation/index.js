import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { createForm } from 'rc-form';
import { FormGroup, InputGroup, Label, HTMLSelect, Button, Intent } from "@blueprintjs/core";
import styled from 'styled-components';
import { Input, SpanError } from 'components/input'
import createInvite from "apolloComponents/invite/create"

const Wrapper = styled.div`
  padding: 20px;
  .bp3-form-group {
    margin-bottom: 0px;
  }
`;

class CreateInvite extends Component {

  constructor(props) {
    super(props);
    this.createInvite = this.createInvite.bind(this);
  }

  createInvite() {
    const { form, client } = this.props;
    const { validateFields, resetFields } = form;
    validateFields(async (error, value) => {
      try {
        if (!error) {
          console.log('data', value);
          createInvite(client, value);
          resetFields();
        }
      } catch (err) {
        alert('บางอย่างผิดพลาด โปรดลองใหม่อีกตรั้ง');
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldError } = form;
    return (
      <Wrapper>
        <FormGroup>
          <Label labelFor="name">
            ชื่อ
            {getFieldDecorator('name', {
              validateTrigger: 'onBlur',
              initialValue: '',
              rules: [
                { required: true, message: 'กรุณากรอก' },
                // { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' },
                // { validator: validatePhoneEmail },
              ],
            })(<Input key="name" id="name" type="text" placeholder="ชื่อ" error={getFieldError('name')} />)}
          </Label>
          <Label labelFor="type">
            ตำแหน่ง
            {getFieldDecorator('role', {
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: 'กรุณากรอก' },
                // { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' },
                // { validator: validatePhoneEmail },
              ],
            })(
              <div>
                <HTMLSelect
                  id="type"
                >
                  <option value="" selected>เลือกตำแหน่ง</option>
                  <option value="staff">staff</option>
                  <option value="admin">admin</option>
                </HTMLSelect>
                <SpanError>{getFieldError('role')}</SpanError>
              </div>
            )}
          </Label>
          <br />
          {/* {CreateInviteButton(<div>hihihi</div>)} */}
          <Button
            onClick={this.createInvite}
            fill={true}
            intent={Intent.PRIMARY}
          >
            เพิ่ม
          </Button>
          {/* <CreateInviteButton>
            {(create, { data }) => (
              <Button
                onClick={() => {
                  createInviteMultation(create, data);
                }}
                fill={true}
                intent={Intent.PRIMARY}
              >
                เพิ่ม
              </Button>
            )}
          </CreateInviteButton> */}
        </FormGroup>
      </Wrapper>
    )
  }
}

export default createForm()(withApollo(CreateInvite));