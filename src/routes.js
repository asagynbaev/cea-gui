import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const AddUserForm = React.lazy(() => import('./views/Users/AddUserForm'));
const EditUser = React.lazy(() => import('./views/Users/EditUser'));
const Buses = React.lazy(() => import('./views/Organizations/Buses/Buses'));
const EditBus = React.lazy(() => import('./views/Organizations/Buses/EditBus'));
const Hotels = React.lazy(() => import('./views/Organizations/Hotels/Hotels'));
const EditHotel = React.lazy(() => import('./views/Organizations/Hotels/EditHotel'));
const Shops = React.lazy(() => import('./views/Organizations/Shops/Shops'));
const EditShop = React.lazy(() => import('./views/Organizations/Shops/EditShop'));
const Catering = React.lazy(() => import('./views/Organizations/Catering/Catering'));
const EditCatering = React.lazy(() => import('./views/Organizations/Catering/EditCatering'));
const Positions = React.lazy(() => import('./views/Organizations/Positions'));
const Shifts = React.lazy(() => import('./views/Organizations/Shifts'));

const routes = [
  { path: '/', exact: true, name: 'Главная' },
  { path: '/dashboard', name: 'Панель', component: Dashboard },

  { path: '/users', exact: true,  name: 'Сотрудники', component: Users },
  { path: '/users/adduserform', name: 'Добавить сотрудника', component:  AddUserForm},
  { path: '/users/:id/edituser', name: 'Редактировать данные сотрудника', component:  EditUser},
  { path: '/users/:id', name: 'О сотруднике', component:  User},

  { path: '/buses', exact: true, name: 'Автобусы', component:  Buses},
  { path: '/buses/:id/editbus', name: 'Редактировать организацию', component:  EditBus},
  { path: '/buses/:id/positions', name: 'Позиции', component:  Positions},
  { path: '/buses/:id/shifts', name: 'Смены', component:  Shifts},

  { path: '/hotels', exact: true, name: 'Отели', component:  Hotels},
  { path: '/hotels/:id/edithotel', name: 'Редактировать организацию', component:  EditHotel},
  { path: '/hotels/:id/positions', name: 'Позиции', component:  Positions},
  { path: '/hotels/:id/shifts', name: 'Смены', component:  Shifts},

  { path: '/shops', exact: true, name: 'Магазины', component:  Shops},
  { path: '/shops/:id/editshop', name: 'Редактировать организацию', component:  EditShop},
  { path: '/shops/:id/positions', name: 'Позиции', component:  Positions},
  { path: '/shops/:id/shifts', name: 'Смены', component:  Shifts},

  { path: '/catering', exact: true, name: 'Кейтеринг', component:  Catering},
  { path: '/catering/:id/editcatering', name: 'Редактировать организацию', component:  EditCatering},
  { path: '/catering/:id/positions', name: 'Позиции', component:  Positions},
  { path: '/catering/:id/shifts', name: 'Смены', component:  Shifts},
];

export default routes;