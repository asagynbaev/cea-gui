import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Input, Button } from "reactstrap";
import axios from "axios";
import { BeatLoader } from 'react-spinners';

function HelperRow(props) {
  const helper = props.helper;
  return (
    <tr key={helper.id.toString()}>
      <td>{helper.helperName}</td>
      <td>Редактировать</td>
    </tr>
  );
}

class Helpers extends Component {
  constructor() {
    super();
    this.state = {
      helperName: '',
      loading: true,
      helpers: []
    };
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  };

  getHelpersData() {
    axios
      .get(`https://ceaapi.herokuapp.com/helpers`, {})
      .then(res => {
        this.setState({ helpers: res.data, loading: false });
        console.log(this.state.helpers);
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getHelpersData();
  }
  render() {
    const helpersList = this.state.helpers;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i>Справочники
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col">Справочник</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {helpersList.map((helper, index) => (
                      <HelperRow key={index} helper={helper} />
                    ))}
                  </tbody>
                  <tbody>
                  <tr>
                    <td><Input onChange={this.handleChange} type="text" value={this.state.helperName} name="helperName" placeholder="Название справочника" /></td>
                    <td>
                      <Button type="submit" size="sm" color="primary">
                        <i className="fa fa-dot-circle-o"></i> Сохранить
                      </Button>
                      &nbsp;
                      <Button onClick={this.redirectToTarget} size="sm" color="danger">
                        <i className="fa fa-ban"></i> Отмена
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <div className="col-xs-1 text-center">
                  <BeatLoader sizeUnit={"px"} size={100} color={'#63c2de'} loading={this.state.loading} />
                </div>
                
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default Helpers;
