import React from 'react';
import Organizations from '../Organizations';
  
function Buses() {
  return(
    <Organizations myParams={{ orgId: 1, route: 'buses'}} />
  );
}
export default Buses;