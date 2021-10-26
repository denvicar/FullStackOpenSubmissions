import React from 'react'

const Contact = ({name, number}) => {
    return <p>{name} {number}</p>
}

const ContactList = ({persons}) => {
    return (
        <>
            {persons.map(p=><Contact key={p.name} name={p.name} number={p.number} />)}
        </>
    )
}

export default ContactList