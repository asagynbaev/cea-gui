import React, { Component } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import Switch from "react-switch";
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Select from 'react-select';

const genderOptions = [
    { value: 1, label: 'Мужской' },
    { value: 2, label: 'Женский' },
  ];
  const englishOptions = [
    { value: 1, label: 'A1' },
    { value: 2, label: 'A2' },
    { value: 3, label: 'B1' },
    { value: 4, label: 'B2' },
    { value: 5, label: 'C1' },
  ];
  const czechOptions = [
    { value: 1, label: 'A1' },
    { value: 2, label: 'A2' },
    { value: 3, label: 'B1' },
    { value: 4, label: 'B2' },
    { value: 5, label: 'C1' },
  ];
  const insuranceOptions = [
    { value: 1, label: 'Maxima' },
    { value: 2, label: 'Uniqua' },
    { value: 3, label: 'Slavia' },
    { value: 4, label: 'VZP' },
  ];
  const visaOptions = [
    { value: 1, label: 'D-VC-23' },
    { value: 2, label: 'D-VC-24' },
    { value: 3, label: 'D-VC-98' },
    { value: 4, label: 'D-VC-99' },
  ];

class AddUserForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeBuses = this.handleChangeBuses.bind(this);
    this.handleChangeShops = this.handleChangeShops.bind(this);
    this.handleChangeHotels = this.handleChangeHotels.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: 1,
      phone: '',
      workExperience: '',
      buses: false,
      shops: false,
      hotels: false,
      czech: 1,
      english: 1,
      insurance: 1,
      visaType: 1
    };
  }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  };
  handleChangeBuses(buses) {
    this.setState({ buses });
  }
  handleChangeShops(shops) {
    this.setState({ shops });
  }
  handleChangeHotels(hotels) {
    this.setState({ hotels });
  }
  handleChangeGender = gender => {
    this.setState({ gender });
  }
  handleChangeEnglish = english => {
    this.setState({ english });
  }
  handleChangeCzech = czech => {
    this.setState({ czech });
  }
  handleChangeInsurance = insurance => {
    this.setState({ insurance });
  }
  handleChangeVisa = visaType => {
    this.setState({ visaType });
  }
  redirectToTarget = () => {
    this.props.history.push(`/users`)
  }


  handleSubmit(e) {
    const user = JSON.stringify({
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      BirthDate: this.state.birthDate,
      Gender: parseFloat(this.state.gender.value),
      Phone: this.state.phone,
      WorkExperience: this.state.workExperience,
      Buses: this.state.buses,
      Shops: this.state.shops,
      Hotels: this.state.hotels,
      Czech: parseFloat(this.state.czech.value),
      English: parseFloat(this.state.english.value),
      Insurance: parseFloat(this.state.insurance.value),
      VisaType: parseFloat(this.state.visaType.value)
    });
    console.log(user);
    axios.post(`https://ceaapi.herokuapp.com/employees/saveemployer`, user, {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        NotificationManager.success('You have added a new employee!', 'Successful!', 2000);
        console.log(response);
      }, (error) => {
        NotificationManager.error('Error while Creating new employee! ' + error, 'Error!');
        console.log(error);
      });
      e.preventDefault();
      this.setState(
        {
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: 1,
            phone: '',
            workExperience: '',
            buses: false,
            shops: false,
            hotels: false,
            czech: 1,
            english: 1,
            insurance: 1,
            visaType: 1
          }
      );
  }
  render() {
    const { gender } = this.state;
    const {  english } = this.state;
    const { czech } = this.state;
    const { insurance } = this.state;
    const { visaType } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Введите данные</strong> Сотрудника
              </CardHeader>
              <CardBody>
                <Form id="createEmployee" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="password-input">Фамилия <span className="required">*</span></Label>
                      <Input onChange={this.handleChange} type="text" value={this.state.firstName} name="firstName" placeholder="Введите Фамилию" required />
                    </Col>
                    <Col md="6">
                      <Label htmlFor="password-input">Имя <span className="required">*</span></Label>
                      <Input onChange={this.handleChange} type="text" value={this.state.lastName} name="lastName" placeholder="Введите Имя" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="password-input">Дата рождения <span className="required">*</span></Label>
                      <Input onChange={this.handleChange} type="date" value={this.state.birthDate} name="birthDate" placeholder="date" required />
                      <FormText className="help-block">формат даты - "мм/дд/гггг"</FormText>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="password-input">Пол <span className="required">*</span></Label>
                      <Select value={gender} onChange={this.handleChangeGender} options={genderOptions} placeholder="Выберите пол" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="password-input">Телефон <span className="required">*</span></Label>
                      <Input onChange={this.handleChange} type="number" value={this.state.phone} name="phone" placeholder="Введите номер телефона" required />
                      <FormText className="help-block">
                        формат номера телефона - "420ХХХХХХ"
                      </FormText>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="password-input">Опыт работы</Label>
                      <Input onChange={this.handleChange} type="text" value={this.state.workExperience} name="workExperience" placeholder="Опыт работы" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <h4>
                        <Label htmlFor="buses">Автобусы</Label>
                      </h4>
                      <Switch name="buses" onChange={this.handleChangeBuses} value={this.state.buses} checked={this.state.buses} />
                    </Col>
                    <Col md="2">
                      <h4>
                        <Label htmlFor="password-input">Магазины</Label>
                      </h4>
                      <Switch onChange={this.handleChangeShops} value={this.state.shops} checked={this.state.shops} />
                    </Col>
                    <Col md="2">
                      <h4>
                        <Label htmlFor="password-input">Отели</Label>
                      </h4>
                      <Switch onChange={this.handleChangeHotels} value={this.state.hotels} checked={this.state.hotels} />
                    </Col>
                    <Col md="3">
                      <Label htmlFor="password-input">Чешский <span className="required">*</span></Label>
                      <Select value={czech} onChange={this.handleChangeCzech} options={czechOptions} placeholder="Уровень чешского" />
                    </Col>
                    <Col md="3">
                      <Label htmlFor="password-input">Английский <span className="required">*</span></Label>
                      <Select value={english} onChange={this.handleChangeEnglish} options={englishOptions} placeholder="Уровень английского" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="password-input">Страховка <span className="required">*</span></Label>
                      <Select value={insurance} onChange={this.handleChangeInsurance} options={insuranceOptions} placeholder="Выберите страховку" />
                    </Col>
                    <Col md="6">
                      <Label htmlFor="password-input">Тип визы <span className="required">*</span></Label>
                      <Select value={visaType} onChange={this.handleChangeVisa} options={visaOptions} placeholder="Выберите визу" />
                    </Col>
                  </FormGroup>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
                  &nbsp;
                  <Button onClick={this.redirectToTarget} size="sm" color="danger">
                    <i className="fa fa-ban"></i> Отмена
                  </Button>
                </Form>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
        <NotificationContainer/>
      </div>
    );
  }
}

export default AddUserForm;
