import React from 'react';
import EditOrganization from '../EditOrganization';
  
  function EditBus({ match }) {
      console.log(match.params.id)
    return(
      <EditOrganization myParams={{ id: match.params.id, categoryId: 1 }} />
    );
}
export default EditBus;