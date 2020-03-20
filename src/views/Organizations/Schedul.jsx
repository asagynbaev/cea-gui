import React, { Component } from "react";
import moment from "moment";
import "moment/locale/ru";
import "react-big-scheduler/lib/css/style.css";
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from "react-big-scheduler";
import withDragDropContext from "./withDnDContext";
import { connect } from 'react-redux';
import { addShift, deleteShift } from '../../redux/_actions/shifts';
import { modalHasChanged } from "../../redux/_actions/modal";
import { NotificationContainer, NotificationManager } from 'react-notifications';

moment.locale("ru");

const mapStateToProps = state => ({
  positions: state.positions,
  shifts: state.shifts
});

const mapDispatchToProps = dispatch =>({
  changeModal: bool => dispatch(modalHasChanged(bool)),
  addShift: (url, shift) => dispatch(addShift(url, shift)),
  delete: (shiftId) => dispatch(deleteShift(shiftId))
});

class Schedul extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week, false, false,
    {
      views: [
          {viewName: 'Week', viewType: ViewTypes.Week},
          {viewName: 'Month', viewType: ViewTypes.Month},
      ]
  });
    schedulerData.localeMoment.locale("ru");
    schedulerData.config.schedulerWidth = '80%';
    //schedulerData.config.agendaResourceTableWidth = 10;

    this.state = {
      viewModel: schedulerData,
    };
  }

  render() {
    const { viewModel } = this.state;
    const positionsList = this.props.positions.filter(x => x.organizationId === parseFloat(this.props.myParams.id));

    const shiftList = this.props.shifts
      .filter(y => y.organizationId === parseFloat(this.props.myParams.id))
      .filter(d => d.isCanceled === false);

    viewModel.setResources(positionsList);
    viewModel.setEvents(shiftList);

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
          viewEvent2Text="Удалить"
          viewEvent2Click={this.ops2}
          updateEventStart={this.updateEventStart}
          updateEventEnd={this.updateEventEnd}
          moveEvent={this.moveEvent}
          newEvent={this.newEvent}
          onScrollLeft={this.onScrollLeft}
          onScrollRight={this.onScrollRight}
          onScrollTop={this.onScrollTop}
          onScrollBottom={this.onScrollBottom}
          toggleExpandFunc={this.toggleExpandFunc}
        />
        <NotificationContainer/>
      </div>
    );
  }

  prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(this.props.shifts);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(this.props.shifts);
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
    schedulerData.setEvents(this.props.shifts);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.props.shifts);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };

  ops1 = (schedulerData, event) => {
    this.props.changeModal({modal: true, shiftId: event.id});
  };

  ops2 = (schedulerData, event) => {
    this.props.delete(event.id);
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let vals = [{ id: slotId, amount: 1 }]
    const shift = JSON.stringify({
      Amounts: vals,
      ShiftDate: new Date(start),
      OrganizationId: parseFloat(this.props.myParams.id),
    });
    var answer = window.confirm("Создать смену?")
    if (answer) {
      this.props.addShift(`http://localhost:5000/shifts/`, shift);
      NotificationManager.success('Смены успешно созданы', 'Успех!', 2000);
    }
    else {
        //some code
    }
}

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

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if(schedulerData.ViewTypes === ViewTypes.Day) {
        schedulerData.next();
        schedulerData.setEvents(this.state.shifts);
        this.setState({
            viewModel: schedulerData
        });

        schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
}

onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if(schedulerData.ViewTypes === ViewTypes.Day) {
        schedulerData.prev();
        schedulerData.setEvents(this.state.shifts);
        this.setState({
            viewModel: schedulerData
        });

        schedulerContent.scrollLeft = 10;
    }
}

onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollTop');
}

onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollBottom');
}

toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
        viewModel: schedulerData
    });
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withDragDropContext(Schedul))