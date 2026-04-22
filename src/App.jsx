import { useState } from 'react';
import { supabase } from './supabase';

function AddUser() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [showData, setShowData] = useState(false);

  const handleInsert = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('users_data')
      .insert([{ name: name, phone_number: phone }]);

    if (error) {
      console.error('Error inserting data:', error.message);
      alert('error');
    } else {
      console.log('Data inserted successfully:', data);
      alert('success');
      setName('');
      setPhone('');
    }
  };

  const handleShowData = async () => {
    const { data, error } = await supabase.from('users_data').select('*');

    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setUsers(data);
      setShowData(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleInsert}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ backgroundColor: 'yellow', color: 'black' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ backgroundColor: 'yellow', color: 'black' }}
        />
        <button  type="submit">رفع البيانات</button>
      </form>

      <button onClick={handleShowData}>عرض البيانات</button>

      {showData && (
        <table border="1" cellPadding="8" style={{ marginTop: '16px', borderCollapse: 'collapse', backgroundColor: 'yellow', color: 'black' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'yellow', color: 'black' }}>ID</th>
              <th style={{ backgroundColor: 'yellow', color: 'black' }}>Name</th>
              <th style={{ backgroundColor: 'yellow', color: 'black' }}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ backgroundColor: 'yellow', color: 'black' }}>{user.id}</td>
                <td style={{ backgroundColor: 'yellow', color: 'black' }}>{user.name}</td>
                <td style={{ backgroundColor: 'yellow', color: 'black' }}>{user.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddUser;
