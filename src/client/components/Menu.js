import React from 'react'
import { mapProps } from 'recompose'
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
      <Link route={ROUTE.FOO} params={{ id: 4711 }}>
        Foo
      </Link>
    </li>
    <li>
      <Link route={ROUTE.BAR}>Bar</Link>
    </li>
    <li>
      <Link route={ROUTE.BAZ}>Baz</Link>
    </li>
  </ul>

export default Menu
