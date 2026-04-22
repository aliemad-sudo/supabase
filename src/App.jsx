import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';


function SearchTask() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('users_data')
      .select('*')
      // 'phone_number' هو اسم العمود اللي بنسيرش فيه
      // '%' بتخلي السيرش مرن (يجيب أي رقم يحتوي على اللي كتبته)
      .ilike('phone_number', `%${searchTerm}%`);

    if (error) {
      console.error('Error fetching:', error);
    } else {
      setResults(data);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>search by num</h2>
      
      <input
        type="text"
        placeholder="writ num here.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>

      {loading ? <p>loading...</p> : (
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              {item.name} - {item.phone_number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchTask;








function searchTask (){
  const  [searchTerm,setSearchTerm ] = useState ("")
}