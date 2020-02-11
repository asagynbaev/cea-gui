import React, { Component } from "react";
import moment from "moment";
import "moment/locale/ru";
import "react-big-scheduler/lib/css/style.css";
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from "react-big-scheduler";
import DemoData from "./DemoData";
import withDragDropContext from "./withDnDContext";
import axios from 'axios';

moment.locale("ru");

class Schedul extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
    schedulerData.localeMoment.locale("ru");
    schedulerData.setEvents(DemoData.events);
    schedulerData.config.schedulerWidth = '80%';

    this.state = {
      viewModel: schedulerData,
      positions: [],
      shifts: [],
    };
  }

  getUsersData() {
    axios.all([
      axios.get(`https://ceaapi.herokuapp.com/shifts/${this.props.myParams.id}`),
      axios.get(`https://ceaapi.herokuapp.com/positions/${this.props.myParams.id}`)
    ])
    .then(axios.spread((shifts, positions) => {
      let newPositions = positions.data;
        newPositions.forEach(element => {
          delete element.organizationId;
          element.name = moment(element.defaultTime).format("HH:mm") + ' ' + element.name
          delete element.defaultTime;
          delete element.sortOrder;
        })
      this.setState({ 
        shifts: shifts.data.filter(d => d.employeeId != null).sort(function(a,b){return new Date(b.shiftDate) - new Date(a.shiftDate)}), 
        positions: newPositions,
        loading: false,
      })
      console.log(this.state.shifts);
    }))
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUsersData();
  }

  render() {
    const { viewModel } = this.state;
    viewModel.setResources(this.state.positions);
    return (
      <Scheduler
        schedulerData={viewModel}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        eventItemClick={this.eventClicked}
        viewEventClick={this.ops1}
        viewEventText="Изменить"
        viewEvent2Text="Удалить"
        viewEvent2Click={this.ops2}
        updateEventStart={this.updateEventStart}
        updateEventEnd={this.updateEventEnd}
        moveEvent={this.moveEvent}
        newEvent={this.newEvent}
      />
    );
  }

  prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
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
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let newFreshId = 0;
    schedulerData.events.forEach(item => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: "New event you just created",
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: "purple"
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart);
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);
    this.setState({
      viewModel: schedulerData
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      viewModel: schedulerData
    });
  };
}

export default withDragDropContext(Schedul);
