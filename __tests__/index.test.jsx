import { render, screen } from '@testing-library/react'
import Home from '../components/Home'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.findByText('LandingPage', {
      name: /LandingPage/i,
    })

    expect(heading).toContain("LandingPage")
  })
})