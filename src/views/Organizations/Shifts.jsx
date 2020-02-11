import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Input, Button, Form } from "reactstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import 'moment/locale/ru';
import axios from 'axios';
import AssignShift from "./AssignShift";
import AllShifts from "./AllShifts";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Schedul from "./Schedul";
moment.locale('ru');

class Shifts extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      selectedShifts: [],
      selectedItem: null,
      positions: [],
      shifts: [],
      loading: true,
      shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE),
      hid: true,
      resorces: []
    };
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  };


  getUsersData() {
    axios
      .get(`https://ceaapi.herokuapp.com/positions/${this.props.match.params.id}`, {})
      .then(res => {
        this.setState({ 
          positions: res.data,
          loading: false 
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUsersData();
  }

  uncheck() {
    var inputs = document.querySelectorAll('.switch-input');
    var sss = document.getElementsByName('inps');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
    for(var f = 0; f < sss.length; f++)
    {
      sss[f].value = "1";
    }
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
    console.log(vals);
    return vals;
  }

  handleSubmit(e) {
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
        OrganizationId: parseFloat(this.props.match.params.id),
      });
      axios.post(`https://ceaapi.herokuapp.com/shifts/`, shift, {
          headers: { "Content-Type": "application/json" }
        }).then(() => {
          NotificationManager.success('Смены успешно созданы', 'Успех!', 2000);
          this.uncheck();
        }, (error) => {
          NotificationManager.error('Error while Creating new shifts! ' + error, 'Error!');
          console.log(error);
        });
        e.preventDefault();
        this.setState(
          {
            selectedShifts: [],
            loading: false,
            shiftDate: moment().add(1, 'day').format(moment.HTML5_FMT.DATE)
          }
        );
    }
  }

  buildTemplate(event) {
    let inp = document.getElementById(event.target.value);
    inp.hidden = !inp.hidden;
  } 

  render() {
    const positionsList = this.state.positions;    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={3}>
            <Card>
            <Form id="createShift" onSubmit={this.handleSubmit}>
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
                            <input type="checkbox" onClick={(event) => this.buildTemplate(event)} className="switch-input" name="shifts" value={position.id} />
                            <span className="switch-slider" data-checked="On" data-unchecked="Off"></span>
                          </label>
                        </td>
                        <td style={{width: '45%', fontWeight: '300'}}>{moment(position.defaultTime).format("HH:mm")} {position.name}</td>
                        <td><Input hidden={ !this.state.hid ?  false : true } style={{height:'30px'}} type="number" name="inps" defaultValue="1" id={position.id} required /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="col-xs-1 text-center">
                  <BeatLoader sizeUnit={"px"} size={50} color={'#63c2de'} loading={this.state.loading} />
                </div>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Создать
                </Button>
                &nbsp;
                <Button onClick={this.uncheck} size="sm" color="danger">
                  <i className="fa fa-ban"></i> Сбросить
                </Button>
              </CardBody>
              </Form>
            </Card>
          </Col>
          <Col xl={4}><AssignShift myParams={{ id: this.props.match.params.id }}/></Col>
          <Col xl={5}><AllShifts myParams={{ id: this.props.match.params.id }}/></Col>
        </Row>
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
        <NotificationContainer/>
      </div>
    );
  }
}

export default Shifts;
