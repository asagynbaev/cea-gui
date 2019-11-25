import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import './details.css';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], user: [], english: [], czech: [], insurance: [], visa: [], fl: ''
        };
      }
      getUsersData() {
        axios.get(`https://ceaapi.herokuapp.com/employees/get/`, {})
            .then(res => { 
              this.setState({users: res.data}) 
              const userDet = this.state.users.find( user => user.id.toString() === this.props.match.params.id)
              this.setState({ 
                  user: userDet,
                  fl: userDet.firstName.charAt(0) + userDet.lastName.charAt(0),
                 })
            })
            .catch((error) => { console.log(error) })
      }
      componentDidMount(){
        this.getUsersData()
      }
  render() {
    const editLink = `/users/${this.props.match.params.id}/edituser`;
    const { user } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
              <div className="container bootstrap snippets">
                <div className="row" id="user-profile">
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="main-box clearfix">
                            <h2> {user.firstName} {user.lastName} </h2>
                            <p data-letters={this.state.fl}></p>

                            <div className="profile-since">Знание английского</div>
                            <div className="profile-stars">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                            </div>
                            <div className="profile-since">Знание чешского</div>
                            <div className="profile-stars">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>
                            </div>
                            <div className="profile-details">
                                <ul className="fa-ul">
                                    <li><i className="fa-li fa fa-bus"></i>Смен: <span>456</span></li>
                                    <li><i className="fa-li fa fa-hotel"></i>Смен: <span>828</span></li>
                                    <li><i className="fa-li fa fa-shopping-cart"></i>Смен: <span>1024</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-8 col-sm-8">
                        <div className="main-box clearfix">
                            <div className="profile-header">
                                <h3><span>Информация о сотруднике</span></h3>
                                <Link to={editLink} className="btn btn-primary edit-profile">
                                    <i className="fa fa-pencil-square fa-lg"></i> Редактировать
                                </Link>
                            </div>
                            <div className="row profile-user-info">
                                <div className="col-sm-8">
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">Фамилия </div>
                                        <div className="profile-user-details-value">{user.firstName}</div>
                                    </div>
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">Имя</div>
                                        <div className="profile-user-details-value">{user.lastName}</div>
                                    </div>
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">Телефон</div>
                                        <div className="profile-user-details-value">{user.phone}</div>
                                    </div>
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">Тип визы</div>
                                        <div className="profile-user-details-value">{user.visaType}</div>
                                    </div>
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">Страховка</div>
                                        <div className="profile-user-details-value">{user.insurance}</div>
                                    </div>
                                </div>
                                <div className="col-sm-4 profile-social">
                                    <ul className="fa-ul">
                                        <li><i className="fa-li fa fa-twitter-square"></i><a href="/#">@scjohansson</a></li>
                                        <li><i className="fa-li fa fa-linkedin-square"></i><a href="/#">John Doe </a></li>
                                        <li><i className="fa-li fa fa-facebook-square"></i><a href="/#">John Doe </a></li>
                                        <li><i className="fa-li fa fa-skype"></i><a href="/#">Black_widow</a></li>
                                        <li><i className="fa-li fa fa-instagram"></i><a href="/#">Avenger_Scarlett</a></li>
                                    </ul>
                                </div>
                            </div>
                            <br/>
                            <div className="profile-header">
                                <h3><span>Последние смены</span></h3>
                            </div>
                            <div className="table-responsive">
                              <table className="table">
                                  <tbody>
                                      <tr>
                                          <td className="text-center"><i className="fa fa-bus"></i></td>
                                          <td>Hopon-Hopoff  <a href="/#">Линия 8:30</a></td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                      <tr><td className="text-center"><i className="fa fa-hotel"></i></td>
                                          <td>John Doe  changed order status from <span className="label label-primary">Pending</span> to <span className="label label-success">Completed</span></td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                      <tr>
                                          <td className="text-center"><i className="fa fa-bus"></i></td>
                                          <td>Hopon-Hopoff  <a href="/#">Линия 9:30</a> </td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                      <tr>
                                          <td className="text-center"><i className="fa fa-bus"></i></td>
                                          <td>Hopon-Hopoff  <a href="/#">Линия 9:15</a></td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                      <tr>
                                          <td className="text-center"><i className="fa fa-hotel"></i></td>
                                          <td>John Doe  changed order status from <span className="label label-warning">On Hold</span> to <span className="label label-danger">Disabled</span></td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                      <tr>
                                          <td className="text-center"><i className="fa fa-bus"></i></td>
                                          <td>Hopon-Hopoff  <a href="/#">Lost in Translation opening scene</a> discussion.</td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                      <tr>
                                          <td className="text-center"><i className="fa fa-hotel"></i></td>
                                          <td>John Doe  changed order status from <span className="label label-primary">Pending</span> to <span className="label label-success">Completed</span></td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                      <tr>
                                          <td className="text-center"><i className="fa fa-bus"></i></td>
                                          <td>Hopon-Hopoff  <a href="/#">Avengers Initiative</a> project.</td>
                                          <td>2014/08/08 12:08</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
