import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './userinfo.css'
import Layout from '../../Layout/Layout';
const columns: GridColDef[] = [

  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'role',
    headerName: 'Role',
    width: 130,
  },

];


// const rows = [
//   { id: 1, email: 'Snow@test', name: 'Jon', role: 'user' },
//   { id: 2, email: 'Lannister@test', name: 'Cersei', role: 'user' },
//   { id: 3, email: 'Lannister@test', name: 'Jaime', role: 'user' },
//   { id: 4, email: 'Stark@test', name: 'Arya', role: 'user' },
//   { id: 5, email: 'Targaryen@test', name: 'Daenerys', role: 'user' },
//   { id: 6, email: 'Melisandre@test', name: null, role: 'user' },
//   { id: 7, email: 'Clifford@test', name: 'Ferrara', role: 'user' },
//   { id: 8, email: 'Frances@test', name: 'Rossini', role: 'user' },
//   { id: 9, email: 'Roxie@test', name: 'Harvey', role: 'user' },
// ];

export default function UserInfo({users}:any) {

  return (
    <Layout>
  <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-column=" Name">{users.name}</td>
      <td data-column="Email">{users.email}</td>
      <td data-column="Role">{users.role}</td>
    </tr>
  
  
  
  </tbody>
</table>
    </Layout>
  );
}