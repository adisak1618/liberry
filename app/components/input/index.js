import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import { Icon } from "@blueprintjs/core";

export const InputWrapper = styled.div`

`;

const InputItem = styled.input`
  display: block;
`;

export const SpanError = styled.span`
  padding: 5px 0;
  display: inline-block;
  font-size: 0.750em;
  color: red;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  width: 30px;
  text-align: center;
  height: 36px;
  line-height: 36px;
  color: red;
`;

export class Input extends React.PureComponent {
  render() {
    const { error, type, className } = this.props;
    return (
      <InputWrapper type={type} className={className}>
        <InputItem className="bp3-input" {...this.props} />
        {/* { error ? <IconWrapper><span class="bp3-icon-standard bp3-icon-projects" /> </IconWrapper>: '' } */}
        {
          error
            ? (
              <SpanError>
                {/* <Icon icon="warning-sign" iconSize={10} /> */}
                {/* <span class="bp3-icon-standard bp3-icon-warning-sign" /> */}
                {error.map((value, index) => {
                  if (index === 0) return `${value}`;
                  return `, ${value}`;
                })}
              </SpanError>
            )
            : ''
        }
        {console.log('error', error)}
      </InputWrapper>
    );
  }
}