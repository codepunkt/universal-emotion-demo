import React from 'react'
import { css } from 'emotion'
import styled from 'emotion/react'
import mapProps from 'recompose/mapProps'
import { NavLink } from 'redux-first-router-link'
import { ROUTE } from '../actions'

const Link = styled(
  mapProps(({ params: payload, route: type, ...props }) => ({
    activeClassName: css`border-bottom: 2px solid #3a81cd;`,
    to: payload ? { type, payload } : { type },
    ...props,
  }))(NavLink)
)`
  text-decoration: none;
  color: #2e6ab3;
  padding-bottom: 2px;
`

const Menu = styled('ul')`
  list-style-type: none;
  margin: 16px;
  padding: 0;
`

const MenuItem = styled('li')`
  display: inline-block;
  &:not(:last-child) {
    margin-right: 16px;
  }
`

export default () =>
  <Menu>
    <MenuItem>
      <Link route={ROUTE.HOME} exact>
        Home
      </Link>
    </MenuItem>
    <MenuItem>
      <Link route={ROUTE.STATIC} params={{ id: 4711 }}>
        Static
      </Link>
    </MenuItem>
    <MenuItem>
      <Link route={ROUTE.DYNAMIC}>Dynamic</Link>
    </MenuItem>
    <MenuItem>
      <Link route={ROUTE.BOTH}>Both</Link>
    </MenuItem>
  </Menu>
