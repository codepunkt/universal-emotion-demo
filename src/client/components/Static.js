import React from 'react'
import styled from 'emotion/react'

const StaticWrapper = styled('p')`background: linen;`

export default () =>
  <div>
    <h3>Static</h3>
    <StaticWrapper>
      This page has static styles that define a "<i>linen</i>" background and
      are only used at the Home page. The styles are extracted to Home.css which
      is loaded together with the Home.js bundle
    </StaticWrapper>
  </div>
