import React, { Component } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';

class EditOrganization extends Component {
  constructor() {
    super();
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      address: '',
      dressCode: '',
      phone: '',
    };
  }

  goBack(){
    this.props.history.goBack();
  }

  // getUsersData() {
  //   axios.get(`https://ceaapi.herokuapp.com/organizations/`, {})
  //       .then(res => { 
  //         this.setState({users: res.data}) 
  //         const userDet = this.state.users.find( user => user.id.toString() === this.props.myParams.id)
  //         this.setState(
  //           {
  //               name: userDet.name,
  //               address: userDet.address,
  //               dressCode: userDet.dressCode,
  //               phone: userDet.phone,
  //             }
  //         )
  //       })
  //       .catch((error) => { console.log(error) })
  // }
  // componentDidMount(){
  //   this.getUsersData()
  // }

  handleChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  };

  redirectToTarget = () => {
    this.props.history.push(`/organizations`)
  }


  handleSubmit(e) {
    const user = JSON.stringify({
      Id: parseFloat(this.props.myParams.id),
      Name: this.state.name,
      Address: this.state.address,
      DressCode: this.state.dressCode,
      Phone: this.state.phone,
    });
    console.log(user);
    axios.put(`https://ceaapi.herokuapp.com/organizations/${this.props.myParams.id}`, user, {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        NotificationManager.success('You have changed an oraganization!', 'Successful!', 2000);
        console.log(response);
      }, (error) => {
        NotificationManager.error('Error while changing an organization! ' + error, 'Error!');
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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Введите данные</strong> Организации
              </CardHeader>
              <CardBody>
                <Form id="createEmployee" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="password-input">Название Организации <span className="required">*</span></Label>
                      <Input onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Введите Название" required />
                    </Col>
                    <Col md="6">
                      <Label htmlFor="password-input">Адрес <span className="required">*</span></Label>
                      <Input onChange={this.handleChange} type="text" value={this.state.address} name="address" placeholder="Введите Адрес" required />
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
                      <Label htmlFor="password-input">Форма одежды</Label>
                      <Input onChange={this.handleChange} type="text" value={this.state.dressCode} name="dressCode" placeholder="Форма одежды" />
                    </Col>
                  </FormGroup>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
                  &nbsp;
                  <Button disabled onClick={this.goBack} size="sm" color="danger">
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

export default EditOrganization;
