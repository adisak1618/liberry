import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { Icon, I } from './../icon'
import { Icon, Intent } from "@blueprintjs/core";
import { Row, Column } from './../flex'
import { InputGroup, Dialog } from "@blueprintjs/core";


export class SearchSelect extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      value: '',
    }
    this.onClear = this.onClear.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  componentDidMount() {
    console.log('hi', this.SelectInput)
  }

  _renderResult() {
    console.log('_renderResult', this.props)
    const { data } = this.props
    const { focused } = this.state
    // if(focused) {
    //   return (
    //     <ResultWrapper>
    //       <ListWrapper>
    //         <MatchBox>ไม่พบ</MatchBox>
    //         {
    //           data.map( (item, index) => (
    //             <Item key={index} onClick={() => this.onSellect(item)}>{item.label}</Item>
    //           ))
    //         }
    //       </ListWrapper>
    //     </ResultWrapper>
    //   )
    // }
    return (
      <Dialog
        isOpen={focused}
        title="test2"
        onClose={() => this.setState({ focused: false })}
      >
        <ListWrapper>
          {/* <MatchBox>ไม่พบ</MatchBox> */}
          {
            data.map( (item, index) => (
              <Item key={index} onClick={() => this.onSellect(item)}>{item.label}</Item>
            ))
          }
        </ListWrapper>
      </Dialog>
    )
  }

  onFocus() {
    this.setState({ focused: true }, () => {
      console.log('this.state', this.state)
    })
  }

  onClear() {
    setTimeout(() => this.setState({ value: "" }), 10)
  }

  onBlur() {
    // this.setState({ focused: false })
  }

  onSellect(item) {
    this.setState({ value: item.value })
  }

  render () {
    const { onChange, data, disabled, ...otherProps } = this.props
    const { focused, value } = this.state
    return(
      <Zindex>
        <SelectWrapper>
          {/* <InputGroup
            large={true}
            inputRef={el => this.SelectInput = el}
            disabled={disabled}
            value={value}
            onFocus={onFocus}
            onBlur={() => setTimeout(() => onBlur(), 300)}
          /> */}
          <div class="bp3-input-group bp3-large">
            <span class="bp3-icon bp3-icon-search"></span>
            <input
              ref={el => this.SelectInput = el}
              type="text"
              onBlur={() => setTimeout(() => this.onBlur(), 300)}
              onFocus={this.onFocus}
              value={value}
              class="bp3-input"
              placeholder="Search"
            />
            {value ? <button onClick={this.onClear} class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button>: ''}
          </div>
          {/* <IconWrapper>
            {
              (focused || value) ? 
                <CloseIcon
                  onClick={() => {
                    onClear()
                  }}
                >
                  <Icon icon="selection" />
                </CloseIcon>
                : <div onClick={onFocus}><Icon i="flaticon-arrow-down" /></div>
            }
          </IconWrapper> */}
          {this._renderResult()}
        </SelectWrapper>
      </Zindex>
    )
  }
}

const ResultWrapper = styled.div`
  background: #ddd;
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  transform: translate3d(0,0,0) !important;
`

const Zindex = styled.div`
  position: relative;
  z-index: ${props => props.active ? '99 !important': '0 !important'};
`
const IconWrapper = styled.div`
  position: absolute;
  top: 0px;
  line-height: 45px;
  width: 34px;
  text-align: center;
  right: 0px;
`
const CloseIcon = styled.div`
  cursor: pointer;
`
export const SelectWrapper = styled.div`
  position: relative;
`
const ListWrapper = styled.div`
  // position: absolute;
  // background: #FFF;
  // margin-top: -1px;
  // border: 1px solid #ccc;
  // width: 100%;
  // max-height: 400px;
  // overflow-y: scroll;
  // box-sizing: border-box;
  // padding: 0px;
  // z-index: 10;
  // outline: none !important;
  // border-color: #DBDBDB;
  // box-shadow: 0 0 10px #DBDBDB;
  width: 700px;
  margin: 20px auto;
  background: #FFF;
`
const Item = styled.div`
  padding: 10px 15px;
  font-size: 1.1em;
  cursor: pointer;
  &:hover {
    background: #488bf8;
    color: #FFF;
  }
`

const MatchBox = styled.div`
  text-align: center;
  padding: 10px;
  ${Label} {
    background: #f7f7f7;
    width: 100%;
    display: block;
    padding: 5px 10px !important;
    border-radius: 2px;
    box-sizing: border-box;
  }
`
const NotMatchBox = styled.div`
  ${Label} {
    width: 100%;
    text-align: left;
    padding: 5px 10px 5px 15px!important;
    box-sizing: border-box;
    color: #ffcc60;
  }
  ${Hr} {
    padding: 0 !important;
    margin: 0 !important;
  }
`

const Label = styled.span`
  display: ${props => props.hasOwnProperty('full-width') ? 'block' : 'inline-block'};
  font-weight: 500;
  font-size: 0.8em;
  text-overflow: ellipsis !important;
  text-transform: uppercase !important;
  // white-space: nowrap !important;
  margin-bottom: 2px !important;
`

const Hr = styled.hr`
  border: none;
  border-bottom: 1px solid #ECEEF0 !important;
`