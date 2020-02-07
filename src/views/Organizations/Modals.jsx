import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactAutocomplete from 'react-autocomplete';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';

class Modals extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggle_save = this.toggle_save.bind(this);
        
        this.state = {
            modal: false,
            value: '',
            userId: null
        };
    }

    setId(id) {
        this.setState({userId: id}, () => {
            this.toggle();
        });
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
      }
    toggle_save(e) {
    if(this.state.userId === null) {
        NotificationManager.error('Вы не выбрали ни одного сотрудника', 'Ошибка!', 2000);
    }
    else {
        const user = JSON.stringify({
        Id: parseFloat(this.props.pars.id),
        EmployeeId: parseFloat(this.state.userId),
        });
        axios.put(`https://ceaapi.herokuapp.com/shifts/${this.state.userId}`, user, {
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            NotificationManager.success('Смена успешно назначена!', 'Успех!', 2000);
        }, (error) => {
            NotificationManager.error('Error while changing an organization! ' + error, 'Error!');
        });
        e.preventDefault();
        this.setState(
            { 
            selectedItem: null, 
            userId: null, 
            value: '', 
            modal: !this.state.modal,
            });
        }
    }

    componentDidMount() {
        this.setState({ modal: true });
    }

    componentWillReceiveProps() {
        this.setState({ modal: true });
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Назначение смены</ModalHeader>
                    <ModalBody>
                        <p>Кликните по текстовому полю, или начните вводить имя или фамилию, и выберите из списка сотрудника.</p>
                        <ReactAutocomplete
                        items={this.props.pars.users}
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
export default Modals;