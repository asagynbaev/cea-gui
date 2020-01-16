import React from 'react';
import EditOrganization from '../EditOrganization';
  
  function EditShop({ match }) {
      console.log(match.params.id)
    return(
      <EditOrganization myParams={{ id: match.params.id, categoryId: 3 }} />
    );
}
export default EditShop;