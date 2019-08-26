import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const Testimonials = ({ testimonials }) => (
  <div>
    {testimonials.map(testimonial => (
      <Container className="border mb-3 shadow-sm">
        <Row className="p-4">
          <Col md={4} className="mb-2">
            <Row>
              <Image src={testimonial.image_url} fluid rounded />
            </Row>
          </Col>
          <Col md={8}>
            <Row>
              <h2>{testimonial.card_name}</h2>
            </Row>
            <Row>
              <ul>
                {testimonial.bullet_points.map(bullet_point => (
                  <li>{bullet_point}</li>
                ))}
              </ul>
            </Row>
          </Col>
        </Row>
        <Row className="bg-light p-4">
          <Col md>
            <h5>Intro APR</h5>
            <div>{testimonial.intro_apr}</div>
          </Col>
          <Col md>
            <h5>Regular APR</h5>
            <div>{testimonial.regular_apr}</div>
          </Col>
          <Col md>
            <h5>Annual Fee</h5>
            <div>{testimonial.annual_fee}</div>
          </Col>
          <Col md>
            <h5>Recommended Credit Score</h5>
            <div>{testimonial.credit_rating}</div>
          </Col>
        </Row>
      </Container>
    ))}
  </div>
)

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      card_name: PropTypes.string,
      image_url: PropTypes.string,
      bullet_points: PropTypes.array,
      intro_apr: PropTypes.string,
      regular_apr: PropTypes.string,
      annual_fee: PropTypes.string,
      credit_rating: PropTypes.string,
    })
  ),
}

export default Testimonials
