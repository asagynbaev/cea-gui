import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, Form } from "reactstrap";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import Moment from "moment";
import { NotificationContainer, NotificationManager } from 'react-notifications';

function UserRow(props) {
  const user = props.user;

  return (
    <tr key={user.id.toString()}>
      <td>{user.name}</td>
      <td>{Moment(user.defaultTime).format("LT")}</td>
      <td><Button color="primary" title="Редактировать"><i className="fa fa-pencil"></i></Button></td>
    </tr>
  );
}

class Positions extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      posTime: '',
      posName: '',
      loading: true,
      users: []
    };
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
    console.log(e.target.value);
  };

  getUsersData() {
    axios
      .get(`https://ceaapi.herokuapp.com/positions/${this.props.match.params.id}`, {})
      .then(res => {
        this.setState({ users: res.data, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUsersData();
  }

  handleSubmit(e) {
    const user = JSON.stringify({
      Name: this.state.posName,
      OrganizationId: parseFloat(this.props.match.params.id),
      DefaultTime: this.state.posTime,
    });
    console.log(user);
    axios.post(`https://ceaapi.herokuapp.com/positions/`, user, {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        NotificationManager.success('Вы успешно добавили позицию!', 'Успех!', 3000);
        this.getUsersData();
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
    const userList = this.state.users;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={5}>
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
                      <th scope="col">Время по умолчанию</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => (
                      <UserRow key={index} user={user} />
                    ))}
                      <tr>
                        <td><Input onChange={this.handleChange} value={this.state.posName} type="text" name="posName" placeholder="Введите Название" required /></td>
                        <td><Input onChange={this.handleChange} value={this.state.posTime} type="time" name="posTime" placeholder="Выберите время" /></td>
                        <td><Button color="success">Добавить</Button></td>
                      </tr>
                    </tbody>
                  </Table>
                </Form>
                <div className="col-xs-1 text-center">
                  <BeatLoader sizeUnit={"px"} size={100} color={"#63c2de"} loading={this.state.loading} />
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

export default Positions;
