import React from 'react'
import styled from 'emotion/react'
import { connect } from 'react-redux'
import Menu from './Menu'
import PageSwitcher from './PageSwitcher'

const AppWrapper = styled('div')`
  max-width: 328px;
`

const App = ({ jwToken }) =>
  <AppWrapper>
    {jwToken && <Menu />}
    <PageSwitcher />
  </AppWrapper>

const mapState = ({ jwToken }) => ({ jwToken })

export default connect(mapState)(App)
