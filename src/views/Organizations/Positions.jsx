import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, Form } from "reactstrap";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import Moment from "moment";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  positions: store.positions,
  hasErrored: store.positionsHasErrored,
  isLoading: store.positionsIsLoading
});

const mapDispatchToProps = dispatch =>({
  //we'll fill this in and explain it later!
});

function UserRow(props) {
  const user = props.user;

  return (
    <tr key={user.id.toString()}>
      <td>{user.name}</td>
      <td>{Moment(user.defaultTime).format("LT")}</td>
      <td>{Moment(user.defaultTime2).format("LT")}</td>
      <td><Button color="primary" title="Редактировать"><i className="fa fa-pencil"></i></Button></td>
    </tr>
  );
}

class Positions extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      posTimeFrom: '',
      posTimeTo: '',
      posName: '',
      loading: true,
      //users: []
    };
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
    console.log(e.target.value);
  };

  handleSubmit(e) {
    const user = JSON.stringify({
      Name: this.state.posName,
      OrganizationId: parseFloat(this.props.match.params.id),
      DefaultTime: this.state.posTimeFrom,
      DefaultTime2: this.state.posTimeTo,
    });
    console.log(user);
    axios.post(`https://ceaapi.herokuapp.com/positions/`, user, {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        NotificationManager.success('Вы успешно добавили позицию!', 'Успех!', 3000);
        //this.getUsersData();
        console.log(response);
      }, (error) => {
        NotificationManager.error('Ошибка при сохранении позиции! ' + error, 'Ошибка!');
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error);
      });
      e.preventDefault();
      this.setState({ posName: '', posTime: '', });
  }

  render() {

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the positions.</p>;
    }
    
    const positionsList = this.props.positions.filter(x => x.organizationId === parseFloat(this.props.match.params.id));
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={7}>
            <Card>
              <CardHeader>
                <i className="fa fa-briefcase"></i>Все позиции
              </CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Время c:</th>
                      <th scope="col">Время по:</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionsList.map((user, index) => (
                      <UserRow key={index} user={user} />
                    ))}
                      <tr>
                        <td><Input onChange={this.handleChange} value={this.state.posName} type="text" name="posName" placeholder="Введите Название" required /></td>
                        <td><Input onChange={this.handleChange} value={this.state.posTime} type="time" name="posTimeFrom" placeholder="Выберите время от" /></td>
                        <td><Input onChange={this.handleChange} value={this.state.posTime} type="time" name="posTimeTo" placeholder="Выберите время до" /></td>
                        <td><Button color="success">Добавить</Button></td>
                      </tr>
                    </tbody>
                  </Table>
                </Form>
                <div className="col-xs-1 text-center">
                  <BeatLoader sizeUnit={"px"} size={100} color={"#63c2de"} loading={this.props.isLoading} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <NotificationContainer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Positions)
