import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Schedul from "./Schedul";
import CreateShifts from "./ShiftsFolder/CreateShifts";
import Modals from "./Modals";
import MaterialTable from "material-table";
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { connect } from 'react-redux';
import { shiftsFetchData, deleteShift, cancelShift } from '../../redux/_actions/shifts';
import { modalHasChanged } from "../../redux/_actions/modal";

const mapStateToProps = state => {
  return { 
    modal: state.modalHasChanged,
    shifts: state.shifts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      changeModal: data => dispatch(modalHasChanged(data)),
      fetchData: (url) => dispatch(shiftsFetchData(url)),
      delete: (shiftId) => dispatch(deleteShift(shiftId)),
      cancel: (url, shift) => dispatch(cancelShift(url, shift)),
  };
};

class Shifts extends Component {

  componentWillMount() {
    this.props.fetchData(`http://localhost:5000/shifts/${this.props.match.params.id}`);
  }

  _showMessage = (bool, int) => {
    this.props.changeModal({modal: bool, shiftId: int});
  }

  _cancelShift = (itemId) => {
    const shift = {
      Id: parseFloat(itemId),
      IsCanceled: true,
    }
    this.props.cancel(`http://localhost:5000/shifts/${itemId}`, shift);
    NotificationManager.success('Смена успешно отменена!', 'Успех!', 2000);
  }

  _deleteShift = (itemId) => {
    this.props.delete(itemId);
    NotificationManager.success('Смена успешно удалена!', 'Успех!', 2000);
  }

  render() {
    console.log(this.props.shifts);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
              <div>
                <Schedul myParams={{ id: this.props.match.params.id }}/>
              </div>
              </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={4}>
            <CreateShifts myParams={{ id: this.props.match.params.id }} />
          </Col>
          <Col xl={8}>
            <MaterialTable
              title="Все смены"
              columns={[
                { title: 'Дата', field: 'shiftDate', type: 'date' },
                { title: 'Позиция', field: 'positionName' },
                { title: 'Исполнитель', field: 'title' },
                {
                  title: 'Отменена',
                  field: 'isCanceled',
                  lookup: { true: 'Да', false: 'Нет' },
                },
              ]}
              data={this.props.shifts}
              options={{
                filtering: true,
                actionsColumnIndex: -1
              }}      
              actions={[
                rowData => ({
                  icon: 'edit',
                  tooltip: 'Изменить смену',
                  onClick: (event, rowData) => this._showMessage(true, rowData.id),
                  disabled: rowData.employeeId !== null
                }),
                rowData => ({
                  icon: 'cancel',
                  tooltip: 'Отменить смену',
                  onClick: (event, rowData) =>this._cancelShift(rowData.id),
                  disabled: rowData.isCanceled === true
                }),
                rowData => ({
                  icon: 'delete',
                  tooltip: 'Удалить смену',
                  onClick: (event, rowData) => this._deleteShift(rowData.id),
                  disabled: rowData.shiftDate < 2000
                }),
              ]}
            />
          </Col>
          <NotificationContainer/>
        </Row>
        {this.props.modal && <Modals />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
