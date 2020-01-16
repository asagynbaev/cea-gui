import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Input, Button, Form } from "reactstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import axios from 'axios';
import './style.css'
import AssignShift from "./AssignShift";

function UserRow(props) {
  const user = props.user;

  return (
    <tr key={user.id.toString()}>
      <td>
        <input className="check1" type="checkbox" name="shifts" value={user.id} /> &nbsp; &nbsp;
        <span className="checkboxtext">{user.positionName}</span>
      </td>
      <td>{moment(user.defaultTime).format("LT")}</td>
    </tr>
  );
}

class Shifts extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
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

  uncheck()
  {
    var inputs = document.querySelectorAll('.check1');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  }

  save() {
    var checkboxes = document.getElementsByName('shifts');
    let vals = [];
    for (var i=0, n=checkboxes.length;i<n;i++) 
    {
        if (checkboxes[i].checked)
            vals.push(checkboxes[i].value);
    }
    return vals;
  }

  handleSubmit(e) {
    const vals = this.save();
    if(!Array.isArray(vals) || vals.length === 0)
    {
      NotificationManager.error('Выберите хоть одну смену!', 'Ошибка!');
    }
    else
    {
      const user = JSON.stringify({
        positionId: vals,
        ShiftDate: this.state.shiftDate,
        OrganizationId: parseFloat(this.props.match.params.id),
      });
      axios.post(`https://ceaapi.herokuapp.com/shifts/`, user, {
          headers: { "Content-Type": "application/json" }
        }).then((response) => {
          NotificationManager.success('Смены успешно созданы', 'Успех!', 2000);
          this.uncheck();
        }, (error) => {
          NotificationManager.error('Error while Creating new shifts! ' + error, 'Error!');
          console.log(error);
        });
        e.preventDefault();
        this.setState(
          {
            selectedShifts: [],
            loading: false,
            shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE)
          }
        );
    }
  }

  render() {
    const userList = this.state.users;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={3}>
            <Card>
            <Form id="createShift" onSubmit={this.handleSubmit}>
              <CardHeader>
                <i className="fa fa-briefcase"></i> Создать смены на 
                <Input onChange={this.handleChange} type="date" value={this.state.shiftDate} name="shiftDate" placeholder="date" required />
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
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
          </Col>
          <Col xl={6}><AssignShift myParams={{ id: this.props.match.params.id }}/></Col>
        </Row>
        <NotificationContainer/>
      </div>
    );
  }
}

export default Shifts;
