import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table, Button, // Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { modalHasChanged } from "../../../redux/_actions/modal";
import { deleteShift, cancelShift } from '../../../redux/_actions/shifts';



const mapStateToProps = state => {
  return {
      shifts: state.shifts,
      positions: state.positions,
      hasErrored: state.shiftsHasErrored,
      isLoading: state.shiftsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      changeModal: data => dispatch(modalHasChanged(data)),
      delete: (shiftId) => dispatch(deleteShift(shiftId)),
      cancel: (url, shift) => dispatch(cancelShift(url, shift)),
  };
};

class AssignShift extends Component {
  // constructor(props) {
  //   super(props);
  //   this.pageSize = 8;
  //   this.state = {
  //       pagesCount: 0,
  //       currentPage: 0,
  //   };
  // }

  // handleClick(e, index) {
  //   e.preventDefault();
  //   this.setState({
  //     currentPage: index
  //   });
  // }

  _showMessage = (bool, int) => {
    this.props.changeModal({modal: bool, shiftId: int});
  };
  
  handleDelete = (itemId) => {
    this.props.delete(itemId);
    NotificationManager.success('Смена успешно удалена!', 'Успех!', 2000);
  }

  cancelShift = (itemId) => {
    const shift = {
      Id: parseFloat(itemId),
      IsCanceled: true,
    }

      this.props.cancel(`http://localhost:5000/shifts/${itemId}`, shift);
      NotificationManager.success('Смена успешно отменена!', 'Успех!', 2000);
  }

  render() {
    const shiftList = this.props.shifts.filter(y => y.organizationId === parseFloat(this.props.myParams.id))
      .filter(d => d.isCanceled === false)
      .filter(x => x.employeeId === null)
      .sort(function(a,b){ return new Date(a.shiftDate) - new Date(b.shiftDate)});

    // const currentPage = this.state.currentPage;
    
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
                {shiftList// .slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                .map((shift) => (
                  <tr key={shift.id.toString()}>
                    <td>{moment(shift.shiftDate).format("DD-MM-YYYY")}</td>
                    <td>{shift.positionName}</td>
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
              {/* <div className="pagination-wrapper">
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
                </div> */}
              <div className="col-xs-1 text-center">
                <BeatLoader sizeUnit={"px"} size={50} color={'#63c2de'} loading={this.props.isLoading} />
              </div>
            </CardBody>
          </Card>
          <NotificationContainer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignShift)
