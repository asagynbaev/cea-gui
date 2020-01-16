import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table, Button, Form } from "reactstrap";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import axios from 'axios';
import './style.css'

function UserRow(props) {
  const user = props.user;

  return (
    <tr key={user.id.toString()}>
      <td>{moment(user.shiftDate).format("DD-MM-YYYY")}</td>
      <td>{user.positionName}</td>
      <td>{moment(user.defaultTime).format("LT")}</td>
    </tr>
  );
}

class AssignShift extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
        selectedShifts: [],
        users: [],
        loading: true,
        shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE)
    };
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  };

  getUsersData() {
    axios
    .get(`http://localhost:5000/shifts/${this.props.myParams.id}`, {})
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
            <Card>
            <Form id="assignShift" onSubmit={this.handleSubmit}>
              <CardHeader>
                <i className="fa fa-briefcase"></i> Все смены
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col">Дата</th>
                      <th scope="col">Позиция</th>
                      <th scope="col">Время</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => (
                      <UserRow key={index} user={user} />
                    ))}
                  </tbody>
                </Table>
                <div className="col-xs-1 text-center">
                  <BeatLoader sizeUnit={"px"} size={100} color={'#63c2de'} loading={this.state.loading} />
                </div>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Сохранить
                </Button>
                &nbsp;
                <Button onClick={this.uncheck} size="sm" color="danger">
                  <i className="fa fa-ban"></i> Отмена
                </Button>
              </CardBody>
              </Form>
            </Card>
      </div>
    );
  }
}

export default AssignShift;
