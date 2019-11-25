import React from 'react';

const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const AddUserForm = React.lazy(() => import('./views/Users/AddUserForm'));
const EditUser = React.lazy(() => import('./views/Users/EditUser'));
const Shifts = React.lazy(() => import('./views/Shifts/Shifts'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Главная' },
  { path: '/dashboard', name: 'Панель', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Сотрудники', component: Users },
  { path: '/users/adduserform', name: 'Добавить сотрудника', component:  AddUserForm},
  { path: '/users/:id/edituser', name: 'Редактировать данные сотрудника', component:  EditUser},
  { path: '/users/:id', name: 'О сотруднике', component:  User},
  { path: '/shifts', exact: true, name: 'Смены', component:  Shifts},
];

export default routes;
