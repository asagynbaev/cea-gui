import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import axios from 'axios';
import ReactAutocomplete from 'react-autocomplete';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class AssignShift extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle_save = this.toggle_save.bind(this);
    
    this.state = {
        modal: false,
        selectedShifts: [],
        users: [],
        shifts: [],
        loading: true,
        value: '',
        userId: null,
        selectedItem: null,
        shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE)
    };
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  setId(id) {
    this.setState({selectedItem: id}, () => {
      this.toggle();
  });
  }

  toggle_save(e) {
    if(this.state.userId === null) {
      NotificationManager.error('Вы не выбрали ни одного сотрудника', 'Ошибка!', 2000);
    }
    else {
      const user = JSON.stringify({
        Id: parseFloat(this.state.selectedItem),
        EmployeeId: parseFloat(this.state.userId),
      });
      axios.put(`https://ceaapi.herokuapp.com/shifts/${this.state.selectedItem}`, user, {
          headers: { "Content-Type": "application/json" }
        }).then((response) => {
          NotificationManager.success('Смена успешно назначена!', 'Успех!', 2000);
          this.getUsersData();
          console.log(response);
        }, (error) => {
          NotificationManager.error('Error while changing an organization! ' + error, 'Error!');
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
        this.setState({ selectedItem: null, userId: null, value: '', modal: !this.state.modal });
    }
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  };

  getUsersData() {
    axios.all([
      axios.get(`https://ceaapi.herokuapp.com/shifts/${this.props.myParams.id}`),
      axios.get(`https://ceaapi.herokuapp.com/employees/autocomplete`)
    ])
    .then(axios.spread((shifts, users) => {
      this.setState({ shifts: shifts.data, users: users.data, loading: false });
    }));
  }

  // componentDidMount() {
  //   this.getUsersData();
  // }

  componentWillReceiveProps() {
    this.getUsersData();
  }


  render() {
    console.log(this.state.users);
    const shiftList = this.state.shifts;
    return (
      <div className="animated fadeIn">
            <Card>
            <Form id="assignShift" onSubmit={this.handleSubmit}>
              <CardHeader>
                <i className="fa fa-briefcase"></i> Все смены
              </CardHeader>
              <CardBody>
                <Table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Дата</th>
                      <th scope="col">Позиция</th>
                      <th scope="col">Время</th>
                      <th scope="col">Исполнитель</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shiftList.map((user, index) => (
                      <tr key={user.id.toString()}>
                      <td>{moment(user.shiftDate).format("DD-MM-YYYY")}</td>
                      <td>{user.positionName}</td>
                      <td>{moment(user.defaultTime).format("LT")}</td>
                      <td>
                        {user.employeeId == null ? <Button onClick={this.setId.bind(this, user.id)} className="btn btn-ghost-primary">Назначить</Button> : this.state.users.find(x => x.id === user.employeeId).fullName}
                      </td>
                      <td><Button disabled className="btn btn-ghost-danger">Удалить</Button></td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="col-xs-1 text-center">
                  <BeatLoader sizeUnit={"px"} size={100} color={'#63c2de'} loading={this.state.loading} />
                </div>
              </CardBody>
              </Form>
            </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Назначение смены</ModalHeader>
                  <ModalBody>
                    <ReactAutocomplete
                      items={this.state.users}
                      shouldItemRender={(item, value) => item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.fullName}
                      renderItem={(item, highlighted) =>
                        <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>
                          {item.fullName}
                        </div>
                      }
                      value={this.state.value}
                      onChange={e => this.setState({ value: e.target.value })}
                      onSelect={(value, item) => this.setState({ value, userId: item.id })}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle_save}>Сохранить</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Отмена</Button>
                  </ModalFooter>
                </Modal>
                <NotificationContainer/>
      </div>
    );
  }
}

export default AssignShift;
