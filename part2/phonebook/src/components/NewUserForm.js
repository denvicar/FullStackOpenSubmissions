import React from "react";

const NewUserForm = ({handleSubmit,handleChange,handleChangeNumber,newName,newNumber}) => {
    return (<form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} /><br />
          number: <input onChange={handleChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

export default NewUserForm