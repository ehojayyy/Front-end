import React, { useState, Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'

const App = () => {
    // Data
    const usersData = [
        { id: 1, name: 'Tania', username: 'floppy@gmail.com' },
        { id: 2, name: 'Craig', username: 'sili@gmail.com' },
        { id: 3, name: 'Ben', username: 'benisphere@gmail.com' },
    ]

    const initialFormState = { id: null, nome: '', username: '' }

    // Setting state
    const [users, setUsers] = useState(usersData)
    const [currentUser, setCurrentUser] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    // CRUD operations
    const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const deleteUser = id => {
        setEditing(false)

        setUsers(users.filter(user => user.id !== id))
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)

        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = user => {
        setEditing(true)

        setCurrentUser({ id: user.id, name: user.name, username: user.username })
    }

    return (
        <div className="container">
            <h3><font size="12"><font color="black">Perfect Trainer </font></font></h3>
            <h1><font size="6"><font color="black">Encontre o seu personal aqui! </font></font></h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Cadastrar Personal</h2>
                            <AddUserForm addUser={addUser} />
                        </Fragment>
                    )}
                </div>
                <div className="flex-large">
                    <h2>Usuários Cadastrados</h2>
                    <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
                </div>
            </div>
        </div>
    )
}

export default App
