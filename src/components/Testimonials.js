import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const Testimonials = ({ testimonials }) => (
  <div>
    {testimonials.map(testimonial => (
      <article key={v4()} className="message">
        <div className="message-body">
          {testimonial.card_name}
          <br />
          {testimonial.bullet_points.map(bullet_point => (
            <div className="message-body">
            {bullet_point}
            </div>
          ))}
          {testimonial.intro_apr}
          <br />
          {testimonial.regular_apr}
          <br />
          {testimonial.annual_fee}
          <br />
          {testimonial.credit_rating}
          <br />
        </div>
      </article>
    ))}
  </div>
)

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      card_name: PropTypes.string,
      bullet_points: PropTypes.array,
      intro_apr: PropTypes.string,
      regular_apr: PropTypes.string,
      annual_fee: PropTypes.string,
      credit_rating: PropTypes.string,
    })
  ),
}

export default Testimonials
