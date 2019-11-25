import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import axios from "axios";
import Moment from "moment";
import { BeatLoader } from 'react-spinners';

function UserRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;
  const editLink = `/users/${user.id}/edituser`;
  

  const busBadge = buses => {
    return buses === true ? "success" : "secondary";
  };
  const hotelBadge = hotels => {
    return hotels === true ? "success" : "secondary";
  };
  const shopBadge = shops => {
    return shops === true ? "success" : "secondary";
  };
  

  return (
    <tr key={user.id.toString()}>
      <td>
        <Link to={userLink}>
          {user.firstName} {user.lastName}
        </Link>
      </td>
      <td>{Moment(user.birthDate).format("YYYY-MM-DD")}</td>
      <td>
        <Badge style={{ marginRight: "5px" }} color={busBadge(user.buses)}>
          Автобусы
        </Badge>
        <Badge style={{ marginRight: "5px" }} color={hotelBadge(user.hotels)}>
          Отели
        </Badge>
        <Badge color={shopBadge(user.shops)}>Магазины</Badge>
      </td>
      <td>{user.phone}</td>
      <td>
      <Link to={editLink}>Редактировать</Link>
      </td>
    </tr>
  );
}

class Users extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      users: []
    };
  }
  getUsersData() {
    axios
      .get(`https://ceaapi.herokuapp.com/employees/get/`, {})
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
  render() {
    const userList = this.state.users;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i>
                <Link to="/users/adduserform">Добавить сотрудника</Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col">ФИО</th>
                      <th scope="col">Дата рождения</th>
                      <th scope="col">Типы смен</th>
                      <th scope="col">Телефон</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => (
                      <UserRow key={index} user={user} />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
            <BeatLoader sizeUnit={"px"} size={100} color={'#63c2de'} loading={this.state.loading} />
          </div>
        </Row>
      </div>
    );
  }
}

export default Users;
