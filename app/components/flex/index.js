import { media } from 'components/style/media-query'
import styled from 'styled-components';

const speceCal = (props) => {
  switch (true) {
    case props.hasOwnProperty('space-between'):
      return 'space-between';
      break;
    case props.hasOwnProperty('space-center'):
      return 'center';
      break;
    case props.hasOwnProperty('space-end'):
      return 'flex-end';
      break;
    case props.hasOwnProperty('space-around'):
      return 'space-around';
      break;
    case props.hasOwnProperty('space-evenly'):
      return 'space-evenly';
      break;
    default:
      return 'flex-start';
  }
}

const fullWidth = (props) => {
  return  props.hasOwnProperty('full-width') ? 'flex: 1 100%;' : '';
}

export const Row = styled.div`
  display: flex;
  justify-content: ${props => speceCal(props)};
  ${props => props.hasOwnProperty('alignItem')? `align-items: ${props.alignItem};`:''};
  flex-wrap: ${props => props.hasOwnProperty('nowrap')? 'nowrap' : 'wrap'};
`
export const Column = styled.div`
  padding: 0px 0;
  max-width: 100%;
  ${props => props.hasOwnProperty('alignself') ? `align-self: ${props.alignself}`:''}
  ${props => props.hasOwnProperty('fill') ? 'flex: 1 !important; min-width: 0;':''}
  ${props => props.hasOwnProperty('flexGrow') ? `flex-grow: ${props.flexGrow}`:''}
  ${props => props.hasOwnProperty('basis') ? `flex-basis: ${props.basis}` : ''};
  ${media.sm`
    ${props => props.hasOwnProperty('mobileBasis') ? `flex-basis: ${props.mobileBasis}` : ''};
  `};
  ${fullWidth};
  ${media.sm`
    ${props => props.hasOwnProperty('hide-on-mobile') ? 'display:none !important' : ''}
  `}
`
