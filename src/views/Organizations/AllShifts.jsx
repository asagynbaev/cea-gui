import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import axios from 'axios';
import Modals from "./Modals";


class AllShifts extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 8;

    this.state = {
        users: [],
        shifts: [],
        loading: true,
        currentPage: 0,
        shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE),
        pagesCount: 0
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
  }

  getUsersData() {
    axios.all([
      axios.get(`https://ceaapi.herokuapp.com/shifts/${this.props.myParams.id}`),
      axios.get(`https://ceaapi.herokuapp.com/employees/autocomplete`)
    ])
    .then(axios.spread((shifts, users) => {
      this.setState({ 
        shifts: shifts.data.filter(d => d.employeeId != null).sort(function(a,b){return new Date(b.shiftDate) - new Date(a.shiftDate)}), 
        users: users.data, 
        loading: false,
        pagesCount: Math.ceil(shifts.data.filter(d => d.employeeId != null).length / this.pageSize)
      });
    }));
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
              <CardHeader><i className="fa fa-briefcase"></i> Все смены</CardHeader>
              <CardBody>
                <Table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Дата смены</th>
                      <th scope="col">Позиция</th>
                      <th scope="col">Ответственный</th>
                      <th scope="col">Изменить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shiftList.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize).map((user) => (
                      <tr key={user.id.toString()}>
                      <td>{moment(user.shiftDate).format("DD-MM-YYYY")}</td>
                      <td>{moment(user.defaultTime).format("HH:mm")} {user.positionName}</td>
                      <td>{this.state.users.find(x => x.id === user.employeeId).fullName}</td>
                      <td>
                        {new Date(user.shiftDate) >= new Date() ? 
                        <Button onClick={this._showMessage.bind(null, true, user.id)}  color="primary" title="Изменить"> <i className="fa fa-pencil"></i></Button> : 
                        <Button disabled color="info" title="Невозможно изменить, смена в процессе или закончена"> 
                            <i className="fa fa-pencil"></i>
                        </Button>}
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
            {this.state.showMessage && <Modals pars={{ users: this.state.users, id: this.state.userId, update: this.updateState }} />}
      </div>
    );
  }
}

export default AllShifts;
