import React from 'react'

const Button = ({onClick, text, id}) => (
    <button onClick={onClick} id={id}>{text}</button>
)
const Person = ({id, name, phone, handleDeletePerson}) => {
    return (
        <div className="note">
            <li>{name} {phone} <Button text='delete' onClick={handleDeletePerson} id={id} /></li>
        </div>
    )
}

export default Person