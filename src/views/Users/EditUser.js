import React, { Component } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import Switch from "react-switch";
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Select from 'react-select';
import Moment from 'moment'

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
  const advertOptions = [
    { value: 1, label: 'От друзей' },
    { value: 2, label: 'Facebook' },
    { value: 3, label: 'Instagram' },
    { value: 4, label: 'VK' },
  ];
  const cityzenshipOptions = [
    { value: 1, label: 'CZE - Чехия' },
    { value: 2, label: 'UKR - Украина' },
    { value: 3, label: 'KAZ - Казахстан' },
    { value: 4, label: 'RUS - Россия' },
    { value: 5, label: 'KGZ - Кыргызстан' },
    { value: 6, label: 'UZB - Узбекистан' },
    { value: 7, label: 'TAJ - Таджикистан' },
    { value: 8, label: 'BLR- Беларусь' },
    { value: 9, label: 'MDA - Молдова' },
    { value: 10, label: 'IND - Индия' },
  ];

class EditUser extends Component {
  constructor() {
    super();
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeBuses = this.handleChangeBuses.bind(this);
    this.handleChangeShops = this.handleChangeShops.bind(this);
    this.handleChangeHotels = this.handleChangeHotels.bind(this);
    this.handleChangeBusesTrain = this.handleChangeBusesTrain.bind(this);
    this.handleChangeShopsTrain = this.handleChangeShopsTrain.bind(this);
    this.handleChangeHotelsTrain = this.handleChangeHotelsTrain.bind(this);

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
      busesTrain: false,
      shopsTrain: false,
      hotelsTrain: false,
      czech: 1,
      english: 1,
      insurance: 1,
      visaType: 1,
      cityzenship: 1,
      advert: 1
    };
  }

  getUsersData() {
    axios.get(`https://ceaapi.herokuapp.com/employees/`, {})
        .then(res => { 
          this.setState({users: res.data}) 
          const userDet = this.state.users.find( user => user.id.toString() === this.props.match.params.id)
          this.setState(
            {
                firstName: userDet.firstName,
                lastName: userDet.lastName,
                birthDate: userDet.birthDate,
                gender: genderOptions.find(v => v.value === userDet.gender),
                phone: userDet.phone,
                workExperience: userDet.workExperience,
                buses: userDet.buses,
                shops: userDet.shops,
                hotels: userDet.hotels,
                busesTrain: userDet.busesTrain,
                shopsTrain: userDet.shopsTrain,
                hotelsTrain: userDet.hotelsTrain,
                czech: czechOptions.find(v => v.value === userDet.czech),
                english: englishOptions.find(v => v.value === userDet.english),
                insurance: insuranceOptions.find(v => v.value === userDet.insurance),
                visaType: visaOptions.find(v => v.value === userDet.visaType),
                cityzenship: cityzenshipOptions.find(v => v.value === userDet.cityzenship),
                advert: advertOptions.find(v => v.value === userDet.advert),
              }
          )
        })
        .catch((error) => { console.log(error) })
  }
  componentDidMount(){
    this.getUsersData()
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
  handleChangeBusesTrain(busesTrain) {
    this.setState({ busesTrain });
  }
  handleChangeShopsTrain(shopsTrain) {
    this.setState({ shopsTrain });
  }
  handleChangeHotelsTrain(hotelsTrain) {
    this.setState({ hotelsTrain });
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
  handleChangeCityzenship = cityzenship => {
    this.setState({ cityzenship });
  }
  handleChangeAdvert = advert => {
    this.setState({ advert });
  }
  redirectToTarget = () => {
    this.props.history.push(`/users`)
  }


  handleSubmit(e) {
    const user = JSON.stringify({
      Id: parseFloat(this.props.match.params.id),
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      BirthDate: this.state.birthDate,
      Gender: parseFloat(this.state.gender.value),
      Phone: this.state.phone,
      WorkExperience: this.state.workExperience,
      Buses: this.state.buses,
      Shops: this.state.shops,
      Hotels: this.state.hotels,
      BusesTrain: this.state.busesTrain,
      ShopsTrain: this.state.shopsTrain,
      HotelsTrain: this.state.hotelsTrain,
      Czech: parseFloat(this.state.czech.value),
      English: parseFloat(this.state.english.value),
      Insurance: parseFloat(this.state.insurance.value),
      VisaType: parseFloat(this.state.visaType.value),
      Cityzenship: parseFloat(this.state.cityzenship.value),
      Advert: parseFloat(this.state.advert.value),
    });
    console.log(user);
    axios.put(`https://ceaapi.herokuapp.com/employees/${this.props.match.params.id}`, user, {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        NotificationManager.success('You have added a new employee!', 'Successful!', 2000);
        console.log(response);
      }, (error) => {
        NotificationManager.error('Error while Creating new employee! ' + error, 'Error!');
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error);
      });
      e.preventDefault();
  }
  render() {
    const { gender } = this.state;
    const {  english } = this.state;
    const { czech } = this.state;
    const { insurance } = this.state;
    const { visaType } = this.state;
    const { advert } = this.state;
    const { cityzenship } = this.state;
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
                      <Input onChange={this.handleChange} type="date" value={Moment(this.state.birthDate).format("YYYY-MM-DD")} name="birthDate" placeholder="date" required />
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
                      <h5>
                        <Label htmlFor="buses">Автобусы</Label>
                      </h5>
                      <Switch name="buses" onChange={this.handleChangeBuses} value={this.state.buses} checked={this.state.buses} />
                    </Col>
                    <Col md="2">
                      <h5>
                        <Label htmlFor="password-input">Отели</Label>
                      </h5>
                      <Switch onChange={this.handleChangeHotels} value={this.state.hotels} checked={this.state.hotels} />
                    </Col>
                    <Col md="2">
                      <h5>
                        <Label htmlFor="password-input">Магазины</Label>
                      </h5>
                      <Switch onChange={this.handleChangeShops} value={this.state.shops} checked={this.state.shops} />
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
                    <Col md="2">
                      <h5>
                        <Label htmlFor="buses">Обучение</Label>
                      </h5>
                      <Switch name="buses" onChange={this.handleChangeBusesTrain} value={this.state.busesTrain} checked={this.state.busesTrain} />
                    </Col>
                    <Col md="2">
                      <h5>
                        <Label htmlFor="password-input">Обучение</Label>
                      </h5>
                      <Switch onChange={this.handleChangeHotelsTrain} value={this.state.hotelsTrain} checked={this.state.hotelsTrain} />
                    </Col>
                    <Col md="2">
                      <h5>
                        <Label htmlFor="password-input">Обучение</Label>
                      </h5>
                      <Switch onChange={this.handleChangeShopsTrain} value={this.state.shopsTrain} checked={this.state.shopsTrain} />
                    </Col>
                    <Col md="3">
                      <Label htmlFor="password-input">Откуда Вы узнали об Агентуре <span className="required">*</span></Label>
                      <Select value={advert} onChange={this.handleChangeAdvert} options={advertOptions} placeholder="Выберите источник" />
                    </Col>
                    <Col md="3">
                      <Label htmlFor="password-input">Гражданство <span className="required">*</span></Label>
                      <Select value={cityzenship} onChange={this.handleChangeCityzenship} options={cityzenshipOptions} placeholder="Выберите страну" />
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

export default EditUser;
