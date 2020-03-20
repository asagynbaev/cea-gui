import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table, Input, Button } from "reactstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { addShift } from '../../../redux/_actions/shifts';
moment.locale('ru');

const mapStateToProps = store => ({
    positions: store.positions,
    hasErrored: store.positionsHasErrored,
    isLoading: store.positionsIsLoading,
    shifts: store.shifts
  });

const mapDispatchToProps = dispatch =>({
    addShift: (url, shift) => dispatch(addShift(url, shift)),
});


class CreateShifts extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      selectedShifts: [],
      selectedItem: null,
      shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE),
      hid: true,
    };
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  };

  uncheck() {
    var inputs = document.querySelectorAll('.switch-input');
    var sss = document.getElementsByName('inps');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
    for(var j = 0; j < sss.length; j++)
    {
      sss[j].value = "1";
      sss[j].hidden = true;
    }
  }

  hideInputs(event) {
    let inp = document.getElementById(event.target.value);
    inp.hidden = !inp.hidden;
  } 

  save() {
    var checkboxes = document.getElementsByName('shifts');
    let vals = [];
    for (var i=0, n=checkboxes.length; i<n; i++) 
    {
        if (checkboxes[i].checked)
        {
          let inp = document.getElementById(checkboxes[i].value);
          vals.push({ 
            id: parseFloat(checkboxes[i].value), 
            amount: parseFloat(inp.value) 
          });
        }
    }
    return vals;
  }
  
  handleSubmit() {
    const vals = this.save();
    if(!Array.isArray(vals) || vals.length === 0)
    {
      NotificationManager.error('Выберите хоть одну смену!', 'Ошибка!');
    }
    else
    {
      const shift = JSON.stringify({
        Amounts: vals,
        ShiftDate: this.state.shiftDate,
        OrganizationId: parseFloat(this.props.myParams.id),
      });
      console.log(shift);
      this.props.addShift(`http://localhost:5000/shifts/`, shift);
      

      this.uncheck();
      NotificationManager.success('Смены успешно созданы', 'Успех!', 2000);
    }
  }

  render() {
    const positionsList = this.props.positions.filter(x => x.organizationId === parseFloat(this.props.myParams.id));
    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <i className="fa fa-briefcase"></i> Создать смены на 
                <Input onChange={this.handleChange} type="date" value={this.state.shiftDate} name="shiftDate" placeholder="date" required />
              </CardHeader>
              <CardBody>
                <Table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Выбрать</th>
                      <th scope="col">Позиция</th>
                      <th scope="col">Кол.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionsList.map((position) => (
                      <tr key={position.id.toString()}>
                        <td style={{width: '20%'}}>
                          <label className="switch switch-xs switch-pill switch-label switch-success" style={{ marginBottom:'0rem'}}>
                            <input type="checkbox" onClick={(event) => this.hideInputs(event)} className="switch-input" name="shifts" value={position.id} />
                            <span className="switch-slider" data-checked="On" data-unchecked="Off"></span>
                          </label>
                        </td>
                        <td style={{width: '45%'}}>{position.name}</td>
                        <td><Input hidden={ !this.state.hid ?  false : true } style={{height:'30px'}} type="number" name="inps" defaultValue="1" id={position.id} required /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="col-xs-1 text-center">
                  <BeatLoader sizeUnit={"px"} size={50} color={'#63c2de'} loading={this.props.isLoading} />
                </div>
                <Button onClick={this.handleSubmit} size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Создать
                </Button>
                &nbsp;
                <Button onClick={this.uncheck} size="sm" color="danger">
                  <i className="fa fa-ban"></i> Сбросить
                </Button>
              </CardBody>
            </Card>
        <NotificationContainer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateShifts)
