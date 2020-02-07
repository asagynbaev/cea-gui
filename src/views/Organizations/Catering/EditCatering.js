import React from 'react';
import EditOrganization from '../EditOrganization';
  
  function EditCatering({ match }) {
    return(
      <EditOrganization myParams={{ id: match.params.id, categoryId: 4 }} />
    );
}
export default EditCatering;