import React from 'react';
import Organizations from '../Organizations';
  
function Shops() {
  return(
    <Organizations myParams={{ orgId: 3, route: 'shops'}} />
  );
}
export default Shops;