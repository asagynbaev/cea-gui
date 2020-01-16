import React from 'react';
import EditOrganization from '../EditOrganization';
  
  function EditHotel({ match }) {
      console.log(match.params.id)
    return(
      <EditOrganization myParams={{ id: match.params.id, categoryId: 2 }} />
    );
}
export default EditHotel;