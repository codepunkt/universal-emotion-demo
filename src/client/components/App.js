import React from 'react'
import { connect } from 'react-redux'
import Menu from './Menu'
import PageSwitcher from './PageSwitcher'

const App = ({ jwToken }) =>
  <div>
    {jwToken && <Menu />}
    <PageSwitcher />
  </div>

const mapState = ({ jwToken }) => ({ jwToken })

export default connect(mapState)(App)
