import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, Form } from "reactstrap";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { NotificationContainer, NotificationManager } from 'react-notifications';

function UserRow(props) {
  const user = props.user;
  const positions = `/${props.path}/${user.id}/positions`;
  const editLink = `/${props.path}/${user.id}/editbus`;
  const shiftLink = `/${props.path}/${user.id}/shifts`;

  return (
    <tr key={user.id.toString()}>
      <td>{user.name}</td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
      <td>{user.dressCode}</td>
      <td>
        <Link to={editLink}>
          <Button className="btn btn-ghost-info">Редактировать</Button>
        </Link>
        &nbsp;
        <Link to={positions}>
          <Button className="btn btn-ghost-warning">Позиции</Button>
        </Link>
        &nbsp;
        <Link to={shiftLink}>
          <Button className="btn btn-ghost-success">Смены</Button>
        </Link>
      </td>
    </tr>
  );
}

class Organizations extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      address: '',
      dressCode: '',
      phone: '',
      url: '',
      loading: true,
      users: [],
      render: false
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
      .get(`https://ceaapi.herokuapp.com/organizations/${this.props.myParams.orgId}`, {})
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
      Name: this.state.name,
      CategoryId: parseFloat(this.props.myParams.orgId),
      Address: this.state.address,
      DressCode: this.state.dressCode,
      Phone: this.state.phone,
    });
    console.log(user);
    axios.post(`https://ceaapi.herokuapp.com/organizations/`, user, {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        NotificationManager.success('Вы успешно добавили организацию!', 'Успех!', 3000);
        this.getUsersData();
        console.log(response);
      }, (error) => {
        NotificationManager.error('Ошибка при добавлении организации! ' + error, 'Ошибка!');
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
      this.setState(
        {
          name: '',
          address: '',
          dressCode: '',
          phone: '',
        }
      );
  }

  render() {
    const userList = this.state.users;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-briefcase"></i>Все организации
              </CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <Table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Адрес</th>
                      <th scope="col">Телефон</th>
                      <th scope="col">Форма одежды</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => (
                      <UserRow key={index} user={user} path={this.props.myParams.route} />
                    ))}
                    <tr>
                      <td><Input onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Введите Название" required /></td>
                      <td><Input onChange={this.handleChange} type="text" value={this.state.address} name="address" placeholder="Введите Адрес" required /></td>
                      <td><Input onChange={this.handleChange} type="number" value={this.state.phone} name="phone" placeholder="Введите номер телефона" required /></td>
                      <td><Input onChange={this.handleChange} type="text" value={this.state.dressCode} name="dressCode" placeholder="Форма одежды" /></td>
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

export default Organizations;
