import React from 'react';

import UserList from '../components/UserList';
import Manz from '../components/f6dc43b0-ca40-46bb-be62-1e661ab52db0.JPG'

const Users = () => {
    const USERS = [
        {
        id: 'u1', 
        name: 'Manya Malhotra', 
        image: Manz, 
        places: 3
    }
];

    return <UserList items={USERS}/>;
}

export default Users;
