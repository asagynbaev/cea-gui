import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css'

const localizer = momentLocalizer(moment);

class Shifts extends Component {
  constructor() {
    super();
    const now = new Date();
    const events = [
      {
          id: 13,
          title: 'Multi-day Event',
          start: new Date(2019, 11, 24, 8, 0, 0),
          end: new Date(2019, 11, 24, 2, 0, 0),
      },
      {
          id: 14,
          title: 'Today',
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
      {
          id: 15,
          title: 'Point in Time Event',
          start: now,
          end: now,
      },
      {
        id: 16,
        title: 'Яковлева Мария',
        start: now,
        end: now,
    },
    ]
    this.state = {
      name: 'React',
      events
    };
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
              <div style={{ height: '600pt'}}>
                <Calendar
                  events={this.state.events}
                  startAccessor="start"
                  endAccessor="end"
                  defaultDate={moment().toDate()}
                  localizer={localizer}
                />
              </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Shifts;
