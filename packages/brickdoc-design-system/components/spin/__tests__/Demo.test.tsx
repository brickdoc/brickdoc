import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Spin', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container).toMatchSnapshot()
  })
})