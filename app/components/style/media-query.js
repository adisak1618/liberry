// these sizes are arbitrary and you can set them to whatever you wish
import { css } from 'styled-components'

const max_xs = (...args) => css`
  @media screen and (max-width: 20em) {
    ${css(...args)}
  }
`
const xs = (...args) => css`
  @media screen and (max-width: 47.938em) {
    ${css(...args)}
  }
`
const sm = (...args) => css`
  @media screen and (max-width: 35.5em) {
    ${css(...args)}
  }
`
const min_sm = (...args) => css`
@media screen and (min-width: 48em) {
  ${css(...args)}
}
`

const max_sm = (...args) => css`
  @media screen and (max-width: 48em)  {
    ${css(...args)}
  }
`
const md = (...args) => css`
  @media screen and (min-width: 48em) and (max-width: 64em) {
    ${css(...args)}
  }
`

const max_md = (...args) => css`
  @media screen and (max-width: 64em)  {
    ${css(...args)}
  }
`

const lg = (...args) => css`
  @media screen and (min-width: 64em) and (max-width: 80em)  {
    ${css(...args)}
  }
`
const max_lg = (...args) => css`
  @media screen and (max-width: 80em)  {
    ${css(...args)}
  }
`

const xl = (...args) => css`
  @media screen and (min-width: 80em)  {
    ${css(...args)}
  }
`
const max_xl = (...args) => css`
@media screen and (max-width: 100em)  {
  ${css(...args)}
}
`

const xxl = (...args) => css`
  @media screen and (min-width: 100em) {
    ${css(...args)}
  }
`

export const media = {
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  max_md,
  max_lg,
  max_xl,
  min_sm,
  max_sm,
  max_xs,
}