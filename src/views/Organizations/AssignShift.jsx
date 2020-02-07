import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table, Button, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Modals from "./Modals";

class AssignShift extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 8;

    this.state = {
        users: [],
        shifts: [],
        userId: null,
        loading: true,
        showMessage: false,
        pagesCount: 0,
        currentPage: 0,
        shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE)
    };
  }

  handleClick(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }

  _showMessage = (bool, int) => {
    this.setState({
      showMessage: bool,
      userId: int
    });
  };

  getUsersData() {
    axios.all([
      axios.get(`https://ceaapi.herokuapp.com/shifts/${this.props.myParams.id}`),
      axios.get(`https://ceaapi.herokuapp.com/employees/autocomplete`)
    ])
    .then(axios.spread((shifts, users) => {
      this.setState({ 
        shifts: shifts.data.filter(d => d.employeeId === null).sort(function(a,b){return new Date(a.shiftDate) - new Date(b.shiftDate)}), 
        users: users.data, 
        loading: false,
        pagesCount: Math.ceil(shifts.data.filter(d => d.employeeId === null).length / this.pageSize)
      });
    }));
  }
  
  handleDelete = (itemId) => {
    axios.delete(`https://ceaapi.herokuapp.com/shifts/${itemId}`)
    .then(response => {
      NotificationManager.success('Смена успешно удалена!', 'Успех!', 2000);
    }, (error) => {
      NotificationManager.error('Error while deleting shift! ' + error, 'Error!');
      console.log(error);
    });
  }

  componentDidMount() {
    this.getUsersData();
  }

  render() {
    const shiftList = this.state.shifts;
    const currentPage = this.state.currentPage;
    return (
      <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <i className="fa fa-briefcase"></i> Открытые смены
            </CardHeader>
            <CardBody>
              <Table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Дата</th>
                    <th scope="col">Позиция</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                {shiftList.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize).map((user) => (
                    <tr key={user.id.toString()}>
                    <td>{moment(user.shiftDate).format("DD-MM-YYYY")}</td>
                    <td>{moment(user.defaultTime).format("HH:mm")} {user.positionName}</td>
                    <td>
                      <Button onClick={this._showMessage.bind(null, true, user.id)}  color="primary" title="Назначить">
                        <i className="fa fa-arrow-right"></i>
                      </Button> &nbsp;
                      <Button onClick={this.handleDelete.bind(this, user.id)} color="danger" title="Удалить">
                        <i className="fa fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination-wrapper">
                  <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled={currentPage <= 0}>
                      <PaginationLink onClick={e => this.handleClick(e, currentPage - 1)} previous href="#" />
                    </PaginationItem>
                    {[...Array(this.state.pagesCount)].map((page, i) => 
                      <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={currentPage >= this.state.pagesCount - 1}>
                      <PaginationLink onClick={e => this.handleClick(e, currentPage + 1)} next href="#" />
                    </PaginationItem>
                  </Pagination>
                </div>
              <div className="col-xs-1 text-center">
                <BeatLoader sizeUnit={"px"} size={50} color={'#63c2de'} loading={this.state.loading} />
              </div>
            </CardBody>
          </Card>
          <NotificationContainer/>
          {this.state.showMessage && <Modals pars={{ users: this.state.users, id: this.state.userId }} />}
      </div>
    );
  }
}

export default AssignShift;
