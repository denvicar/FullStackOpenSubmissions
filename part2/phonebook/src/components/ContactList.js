import React from 'react'

const Contact = ({name, number, handler}) => {
    return <p>{name} {number} <button onClick={handler}>delete</button></p>
}

const ContactList = ({persons, onDelete}) => {
    return (
        <>
            {persons.map((p,i)=><Contact key={p.id} name={p.name} number={p.number} handler={()=>onDelete(i)} />)}
        </>
    )
}

export default ContactList