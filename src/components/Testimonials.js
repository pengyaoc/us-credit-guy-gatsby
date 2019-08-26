import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const Testimonials = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_cards: props.testimonials,
    };
  }
  
  onSelectorChange(e) {
    var current_cards = [];
    if (e.target.value != "Select Filter...") {
      for (let card of this.props.testimonials) {
        if (card['card_name'].includes(e.target.value)) {
          current_cards.push(card);
        }
      } 
    } else {
      current_cards = this.props.testimonials;
    }
    this.setState({current_cards: current_cards})
  }

  render() {
    return (
      <div className="column is-10 is-offset-1">
        <select className="form-control mb-3 shadow-sm" onChange={this.onSelectorChange.bind(this)}>
          <option>Select Filter...</option>
          <option>Business</option>
          <option>Travel</option>
        </select>
        {this.state.current_cards.map(testimonial => (
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
  }
}


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
