import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactAutocomplete from 'react-autocomplete';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { connect } from 'react-redux';
import { modalHasChanged } from '../../redux/_actions/modal';

const mapStateToProps = (store, state) => ({
    autocomplete: store.employeesForAutocomplete,
    modal: store.modalHasChanged
  });
  
  const mapDispatchToProps = dispatch =>({
    changeModal: bool => dispatch(modalHasChanged(bool))
  });

class Modals extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggle_save = this.toggle_save.bind(this);
        
        this.state = {
            //modal: false,
            value: '',
            userId: null,
        };
    }

    setId(id) {
        this.setState({userId: id}, () => {
            this.toggle();
        });
    }

    toggle() {
        this.props.changeModal(!this.props.modal);
        //this.setState({ modal: !this.state.modal });
      }

    toggle_save(e) {
        var myDate = new Date(this.props.pars.shiftDate);
        myDate.setDate(myDate.getDate() + 1);
    if(this.state.userId === null) {
        NotificationManager.error('Вы не выбрали ни одного сотрудника', 'Ошибка!', 2000);
    }
    else {
        const user = JSON.stringify({
            EmployeeId: parseFloat(this.state.userId),
            positionId: parseFloat(this.props.pars.positionId),
            OrganizationId: parseFloat(this.props.pars.organizationId),
            Amount: parseFloat(this.props.pars.amount),
            ShiftDate: new Date(myDate)
        });
        const user1 = JSON.stringify({
            Id: parseFloat(this.props.pars.shiftId),
            EmployeeId: parseFloat(this.state.userId),
        });
        if(this.props.pars.up === 2) {
            axios.post(`https://ceaapi.herokuapp.com/shifts/`, user, {
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            NotificationManager.success('Смена успешно назначена!', 'Успех!', 2000);
        }, (error) => {
            NotificationManager.error('Ошибка при сохранении позиции! ' + error, 'Ошибка!');
          })
          .catch(error => {
            console.log(error);
          });
        }
        if(this.props.pars.up === 5) {
            axios.put(`https://ceaapi.herokuapp.com/shifts/${this.props.pars.shiftId}`, user1, {
            headers: { "Content-Type": "application/json" }
            }).then((response) => {
                NotificationManager.success('Смена успешно назначена!', 'Успех!', 2000);
            }, (error) => {
                NotificationManager.error('Ошибка при сохранении позиции! ' + error, 'Ошибка!');
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
              })
              .catch(error => {
                console.log(error);
              });
        }
        e.preventDefault();
        this.setState(
            { 
            selectedItem: null, 
            userId: null, 
            value: '', 
            modal: !this.state.modal,
            //employees: []
            });
        }
    }

    // componentDidMount() {
    //     this.setState({ modal: true });
    // }

    // componentWillReceiveProps() {
    //     this.setState({ modal: true });
    // }

    render() {
        return(
            <div>
                <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Назначение смены</ModalHeader>
                    <ModalBody>
                        <p>Кликните по текстовому полю, или начните вводить имя или фамилию, и выберите из списка сотрудника.</p>
                        <ReactAutocomplete
                        items={this.props.autocomplete}
                        shouldItemRender={(item, value) => item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.fullName}
                        renderItem={(item, highlighted) =>
                            <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>
                            {item.fullName}
                            </div>
                        }
                        value={this.state.value}
                        onChange={e => this.setState({ value: e.target.value })}
                        onSelect={(value, item) => this.setState({ value, userId: item.id })}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle_save}>Сохранить</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Отмена</Button>
                    </ModalFooter>
                </Modal>
                <NotificationContainer/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modals)