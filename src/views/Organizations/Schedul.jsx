import React, { Component } from "react";
import moment from "moment";
import "moment/locale/ru";
import "react-big-scheduler/lib/css/style.css";
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from "react-big-scheduler";
//import withDragDropContext from "./withDnDContext";
import axios from 'axios';
import { connect } from 'react-redux';
import Modals from "./Modals";
import { modalHasChanged } from "../../redux/_actions/modal";

const mapStateToProps = state => ({
  positions: state.positions,
  hasErrored: state.positionsHasErrored,
  isLoading: state.positionsIsLoading,
  modal: state.modalHasChanged
});

const mapDispatchToProps = dispatch =>({
  changeModal: bool => dispatch(modalHasChanged(bool))
});

moment.locale("ru");

class Schedul extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
    schedulerData.localeMoment.locale("ru");
    schedulerData.config.schedulerWidth = '80%';

    this.state = {
      viewModel: schedulerData,
      //positions: [],
      shifts: [],
      //showMessage: false,
      positionId: null, 
      organizationId: null,
      shiftDate: null,
      amount: 1
    };
  }

  getUsersData() {
    axios.all([
      axios.get(`https://ceaapi.herokuapp.com/shifts/scheduler/${this.props.myParams.id}`),
      axios.get(`https://ceaapi.herokuapp.com/positions/${this.props.myParams.id}`)
    ])
    .then(axios.spread((sh, positions) => {
      let newPositions = positions.data;
        newPositions.forEach(element => {
          delete element.organizationId;
          element.name = moment(element.defaultTime).format("HH:mm") + ' ' + element.name
          delete element.defaultTime;
          delete element.sortOrder;
        })
      this.setState({ 
        shifts: sh.data,
        //positions: newPositions,
        loading: false,
      })
    }))
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    //this.getUsersData();
  }

  render() {
    const { viewModel } = this.state;
    console.log('id from scheduler is: ', this.props.myParams.id);

    let newPositions = this.props.positions.filter(x => x.organizationId === parseFloat(this.props.myParams.id));
        newPositions.forEach(element => {
          delete element.organizationId;
          element.name = moment(element.defaultTime).format("HH:mm") + ' ' + element.name
          delete element.defaultTime;
          delete element.sortOrder;
        });

    viewModel.setResources(newPositions);
    viewModel.setEvents(this.state.shifts);

    return (
      <div>
        <Scheduler
          schedulerData={viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
          eventItemClick={this.eventClicked}
          viewEventClick={this.ops1}
          viewEventText="Изменить"
          viewEvent2Click={this.ops2}
          viewEvent2Text="Удалить"
          moveEvent={this.moveEvent}
          newEvent={this.newEvent}
        />
        {this.props.modal && <Modals pars={{ 
          shiftId: this.state.shiftId,
          positionId: this.state.positionId, 
          organizationId: this.state.organizationId,
          shiftDate: this.state.shiftDate,
          amount: 1,
          up: 2
        }} />}
      </div>
      
    );
  }

  prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(this.state.shifts);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(this.state.shifts);
    this.setState({
      viewModel: schedulerData
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(this.state.shifts);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.state.shifts);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };

  ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    this.setState({
      organizationId: this.props.myParams.id,
      positionId: slotId,
      amount: 1,
      shiftDate: start,
      //showMessage: true,
    });
    this.props.changeModal(true);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedul)
