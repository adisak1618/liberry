import React from 'react'
import styled from 'styled-components'
import { createForm } from 'rc-form';
import { withApollo } from 'react-apollo';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Row, Column } from 'components/flex'
import { Input, SpanError } from 'components/input'
import findBook from 'apolloComponents/book/findBook'

class FindBook extends React.Component {
  constructor(props) {
    super(props)
    this.validateInput = this.validateInput.bind(this)
  }

  validateInput () {
    const { form, client } = this.props
    const { validateFields } = form
    validateFields(async (error, data) => {
      if(error) {
        return error
      }
      const { data: { findBooks } } = await findBook(client, data)
      console.log('findBook', findBooks)

    })
  }

  render () {
    const { form } = this.props;
    const { getFieldDecorator, getFieldError } = form;
    return (
      <div>
        <h3 className="bp3-heading">1. กรอก ISBN</h3>
        <div className="bp3-input-group bp3-large">
          <span className="bp3-icon bp3-icon-search"></span>
          {getFieldDecorator('isbn', {
            validateTrigger: 'onBlur',
            initialValue: '',
            rules: [
              { required: true, message: 'กรุณากรอก' },
              // { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' },
              // { validator: validatePhoneEmail },
            ],
          })(<input key="isbn" disabled={false} className="bp3-input" id="isbn" type="text" placeholder="Search" />)}
          <button onClick={this.validateInput} className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button>
        </div>
        <SpanError>{getFieldError('isbn')}</SpanError>
      </div>
    )
  }
}

export default createForm()(withApollo(FindBook))