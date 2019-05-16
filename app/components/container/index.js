
import styled from 'styled-components'
import { media } from 'components/style/media-query'


export const ContainerWrapper = styled.div`
  position: relative;
  ${media.sm`
    width: 100% !important;
  `}
  ${media.md`
    max-width: 920px !important;
  `}
  ${media.lg`
    max-width: 1000px !important;
  `}
  ${media.xl`
    max-width: 1250px !important;
    padding: 0 10px;
  `}
  ${media.xxl`
    max-width: 1250px;
    padding: 0 10px;
  `}
  display: block;
  margin-right: auto;
  margin-left: auto;
`;

const FluidContainerWrapper = styled.div`
  position: relative;
  margin: 0 auto !important;
  position: relative !important;
  ${media.lg`
    padding-left: 30px !important;
    padding-right: 30px !important;
  `}
  ${media.xl`
    padding-left: 40px !important;
    padding-right: 40px !important;
  `}
  ${media.xxl`
    padding-left: 80px !important;
    padding-right: 80px !important;
  `}
  padding-left: 0px !important;
  padding-right: 0px !important;
`

export const Container = ({ children }) => (
  <ContainerWrapper>
    {children}
  </ContainerWrapper>
)

export const FluidContainer = ({ children }) => (
  <FluidContainerWrapper>
    {children}
  </FluidContainerWrapper>
)
