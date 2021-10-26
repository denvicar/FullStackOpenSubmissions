import React from 'react';

const Filter = ({term,handler}) => {
    return (
        <>
        filter shown with <input value={term} onChange={handler} />
        </>)
}
export default Filter