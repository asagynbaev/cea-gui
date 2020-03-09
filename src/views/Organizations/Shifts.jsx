import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import AssignShift from "./AssignShift";
import Schedul from "./Schedul";
import { connect } from 'react-redux';
import CreateShifts from "./CreateShifts";
import { shiftsFetchData } from '../../redux/_actions/shifts';
import Modals from "./Modals";

const mapStateToProps = state => {
  return { 
    modal: state.modalHasChanged
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(shiftsFetchData(url)),
  };
};

class Shifts extends Component {

  componentWillMount() {
    this.props.fetchData(`http://localhost:5000/shifts/${this.props.match.params.id}`);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
              <div>
                <Schedul myParams={{ id: this.props.match.params.id }}/>
              </div>
              </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={5}>
            <CreateShifts myParams={{ id: this.props.match.params.id }} />
          </Col>
          <Col xl={7}>
            <AssignShift myParams={{ id: this.props.match.params.id }}/>
            </Col>
        </Row>
        {this.props.modal && <Modals />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
