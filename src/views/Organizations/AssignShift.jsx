import React, { Component } from "react";
import { 
  Card, CardBody, CardHeader, Table, Button, //Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Modals from "./Modals";
import { connect } from 'react-redux';
import { shiftsFetchData } from '../../redux/_actions/shifts';
import { modalHasChanged } from "../../redux/_actions/modal";


const mapStateToProps = state => {
  return {
      shifts: state.shifts,
      hasErrored: state.shiftsHasErrored,
      isLoading: state.shiftsIsLoading,
      modal: state.modalHasChanged
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(shiftsFetchData(url)),
      changeModal: bool => dispatch(modalHasChanged(bool))
  };
};

class AssignShift extends Component {

  // constructor(props) {
  //   super(props);
  //   this.pageSize = 8;

  //   this.state = {
  //       shiftId: null,
  //       pagesCount: 0,
  //       currentPage: 0,
  //       shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE)
  //   };
  // }

  handleClick(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }

  _showMessage = (bool, int) => {
    this.props.changeModal(bool);
    this.setState({
      //showMessage: bool,
      shiftId: int
    });
  };
  
  handleDelete = (itemId) => {
    axios.delete(`https://ceaapi.herokuapp.com/shifts/${itemId}`)
    .then(response => {
      NotificationManager.success('Смена успешно удалена!', 'Успех!', 2000);
    }, (error) => {
      NotificationManager.error('Error while deleting shift! ' + error, 'Error!');
      console.log(error);
    });
  }

  cancelShift = (itemId) => {
    const user = JSON.stringify({
      Id: parseFloat(itemId),
      IsCanceled: true,
      });
      axios.put(`https://ceaapi.herokuapp.com/shifts/${itemId}`, user, {
          headers: { "Content-Type": "application/json" }
      }).then((response) => {
          NotificationManager.success('Смена успешно отменена!', 'Успех!', 2000);
      }, (error) => {
          NotificationManager.error('Error while cancelling shift! ' + error, 'Error!');
      });
      this.setState(
          { 
          selectedItem: null, 
          shiftId: null, 
          value: '', 
          modal: !this.state.modal,
          });
  }

  componentDidMount() {
    this.props.fetchData(`https://ceaapi.herokuapp.com/shifts/${this.props.myParams.id}`);
  }

  render() {
    const shiftList = this.props.shifts.filter(y => y.organizationId === parseFloat(this.props.myParams.id))
      .filter(d => d.isCanceled === false)
      .filter(x => x.employeeId === null)
      .sort(function(a,b){ return new Date(a.shiftDate) - new Date(b.shiftDate)});
    // const currentPage = this.state.currentPage;
    console.log('id from assignShift is: ', this.props.myParams.id);
    
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
                {shiftList//.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize).
                .map((shift) => (
                    <tr key={shift.id.toString()}>
                    <td>{moment(shift.shiftDate).format("DD-MM-YYYY")}</td>
                    <td>{moment(shift.defaultTime).format("HH:mm")} {shift.positionName}</td>
                    <td>
                      <Button onClick={this._showMessage.bind(null, true, shift.id)}  color="primary" title="Назначить смену">
                        <i className="fa fa-arrow-right"></i>
                      </Button> &nbsp;
                      <Button onClick={this.cancelShift.bind(this, shift.id)} color="warning" title="Отменить смену">
                        <i className="fa fa-ban"></i>
                      </Button> &nbsp;
                      <Button onClick={this.handleDelete.bind(this, shift.id)} color="danger" title="Удалить смену">
                        <i className="fa fa-trash"></i>
                      </Button> 
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination-wrapper">
                  {/* <Pagination aria-label="Page navigation example">
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
                  </Pagination> */}
                </div>
              <div className="col-xs-1 text-center">
                <BeatLoader sizeUnit={"px"} size={50} color={'#63c2de'} loading={this.props.isLoading} />
              </div>
            </CardBody>
          </Card>
          <NotificationContainer/>
          {this.props.modal && <Modals pars={{ up: 5, shiftId: this.state.shiftId }} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignShift)
