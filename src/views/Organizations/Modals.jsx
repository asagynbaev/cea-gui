import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactAutocomplete from 'react-autocomplete';
import { NotificationContainer, NotificationManager } from 'react-notifications';
// import axios from 'axios';
import { connect } from 'react-redux';
import { modalHasChanged } from '../../redux/_actions/modal';
import { assingShift } from '../../redux/_actions/shifts';

const mapStateToProps = (state) => ({
    autocomplete: state.employeesForAutocomplete,
    modal: state.modalHasChanged
  });
  
  const mapDispatchToProps = dispatch =>({
    changeModal: modalData => dispatch(modalHasChanged(modalData)),
    assingShift: (url, data) => dispatch(assingShift(url, data)),
  });

class Modals extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggle_save = this.toggle_save.bind(this);
        
        this.state = {
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
      }

    toggle_save() {
        if(this.state.userId === null) {
            NotificationManager.error('Вы не выбрали ни одного сотрудника', 'Ошибка!', 2000);
        }
        else {
            const shift = {
                Id: parseFloat(this.props.modal.shiftId),
                EmployeeId: parseFloat(this.state.userId),
            }

            this.props.assingShift(`http://localhost:5000/shifts/${this.props.modal.shiftId}`, shift)
            this.props.changeModal(!this.props.modal);
            NotificationManager.success('Смена успешно назначена!', 'Успех!', 2000);
        }
        this.setState({ userId: null, value: '' })
    }

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