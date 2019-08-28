import React from 'react'
import { createForm } from 'rc-form';
import { withApollo } from 'react-apollo';
import { Row, Column } from 'components/flex'
import { SearchSelect } from 'components/searchInput'
import styled from 'styled-components'
import Creatable from 'react-select/creatable';

class CreateBook extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator, getFieldError } = form
    return(
      <Wrapper>
        <h3 className="bp3-heading">2. กรอกรายละเอียด</h3>
        <BookCover>
          <img src="https://images-se-ed.com/ws/Storage/Originals/978616/182/9786161829704L.jpg?h=33ade1dff7d2e720c5cb56671a9be429" />
        </BookCover>
        <label className="bp3-label">
          ชื่อหนังสือ
          {/* <span className="bp3-text-muted">(optional)</span> */}
          {getFieldDecorator('name', {
            validateTrigger: 'onBlur',
            initialValue: '',
            rules: [
              { required: true, message: 'กรุณากรอก' },
              // { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' },
              // { validator: validatePhoneEmail },
            ],
          })(<input key="name" disabled={false} className="bp3-input bp3-fill bp3-large" id="name" type="text" placeholder="Book name" />)}
        </label>
        <label className="bp3-label">
          เนื้อเรื่องโดยสังเขบ
          <textarea className="bp3-input bp3-fill" rows="5"/>
        </label>
        <label className="bp3-label">
          ชื่อหนังสือ
          <Creatable isClearable={true} />
        </label>
        <label className="bp3-label">
          ชื่อหนังสือ
          <SearchSelect
            data={[
              { value: 'value1', label: 'value1' },
              { value: 'value2', label: 'value2' },
              { value: 'value3', label: 'value3' },
            ]}
          />
        </label>
        <Row space-between>
          <Column fill>
            <label className="bp3-label">
              จำนวนหน้า
              {/* <span className="bp3-text-muted">(optional)</span> */}
              {getFieldDecorator('page_count', {
                validateTrigger: 'onBlur',
                initialValue: '',
                rules: [
                  { required: true, message: 'กรุณากรอก' },
                  // { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' },
                  // { validator: validatePhoneEmail },
                ],
              })(<input key="name" disabled={false} className="bp3-input bp3-fill bp3-large" id="page_count" type="text" placeholder="จำนวนหน้า" />)}
            </label>
          </Column>
          <Column fill>
            <label className="bp3-label">
              ราคา
              {/* <span className="bp3-text-muted">(optional)</span> */}
              {getFieldDecorator('price', {
                validateTrigger: 'onBlur',
                initialValue: '',
                rules: [
                  { required: true, message: 'กรุณากรอก' },
                  // { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' },
                  // { validator: validatePhoneEmail },
                ],
              })(<input key="name" disabled={false} className="bp3-input bp3-fill bp3-large" id="price" type="text" placeholder="ราคา" />)}
            </label>
          </Column>
        </Row>
      </Wrapper>
    )
  }
}

export default createForm()(withApollo(CreateBook))

const Wrapper = styled.div`
  ${Row} ${Column}:not(:last-child) {
    margin-right: 5px;
  }
  ${Row} ${Column}:not(:first-child) {
    margin-left: 5px;
  }
`

const BookCover = styled.div`
  height: 300px;
  text-align: center;
  img {
    height: 100%;
    max-width: 200px;
  }
`