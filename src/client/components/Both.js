import React, { Component } from 'react'
import styled from 'emotion/react'
import { actions } from '../reducers/index'

const colors = ['pink', 'lightcyan', 'lightgray']

const DynamicWrapper = styled('p')`
  background: ${props => colors[props.index]};
`

const StaticWrapper = styled('p')`
  background: lightblue;
`

class Both extends Component {
  state = {
    index: 0,
  }

  increment = () => {
    this.setState(({ index }) => ({
      index: index === 2 ? 0 : index + 1,
    }))
  }

  render() {
    return (
      <div>
        <h3>Both</h3>
        <StaticWrapper>
          This page has static styles that define a "<i>light blue</i>"
          background and are only used at the Both page. The styles are
          extracted to Both.css which is loaded together with the Both.js bundle
        </StaticWrapper>
        <DynamicWrapper index={this.state.index} onClick={this.increment}>
          This part has dynamic styles that change the background color when
          clicked. Because these styles can't be extracted to external css files
          at compile time, they are either inlined by the server and rehydrated
          by emotion on server render or injected by emotion on the client side
        </DynamicWrapper>
      </div>
    )
  }
}

export default Both
