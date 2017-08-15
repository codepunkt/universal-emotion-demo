import React from 'react'
import mapProps from 'recompose/mapProps'
import { NavLink } from 'redux-first-router-link'
import { ROUTE } from '../actions'

const Link = mapProps(({ params: payload, route: type, ...props }) => ({
  activeClassName: 'active',
  to: payload ? { type, payload } : { type },
  ...props,
}))(NavLink)

const Menu = () =>
  <ul>
    <li>
      <Link route={ROUTE.HOME} exact>
        Home
      </Link>
    </li>
    <li>
      <Link route={ROUTE.STATIC} params={{ id: 4711 }}>
        Static
      </Link>
    </li>
    <li>
      <Link route={ROUTE.DYNAMIC}>Dynamic</Link>
    </li>
    <li>
      <Link route={ROUTE.BOTH}>Both</Link>
    </li>
  </ul>

export default Menu
