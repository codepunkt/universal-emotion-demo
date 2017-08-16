import { zipObj } from 'ramda'
import styled from 'emotion/react'
import React, { Component } from 'react'

zipObj(['a', 'b', 'c'], [1, 2, 3])

const colors = ['normal', 'italic', 'oblique']

const DynamicWrapper = styled('p')`
  font-style: ${props => colors[props.index]};
`

export default class Dynamic extends Component {
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
        <h3>Dynamic</h3>
        <DynamicWrapper index={this.state.index} onClick={this.increment}>
          This paragraph has dynamic styles that change the font style when
          clicked. Because these styles can't be extracted to external css files
          at compile time, they are either inlined by the server and rehydrated
          by emotion on server render or injected by emotion on the client side
        </DynamicWrapper>
      </div>
    )
  }
}
