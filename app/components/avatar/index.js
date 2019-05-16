import styled from 'styled-components';

export const Avatar = styled.div`
  background: url('${props => props.src}');
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;
