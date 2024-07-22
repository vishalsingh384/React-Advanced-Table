import { useEffect, useState } from 'react'
import './App.css'
import Table from './Table';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get(`http://localhost:5001/users?q=${query}`);
      setData(resp.data);
    }
    getData();
  }, [query])

  return (
    <>
      <input type="text" name="search" placeholder='Search'
        onChange={(e) => setQuery(e.target.value.toLowerCase())} />
      <div>
        <Table data={data} />
      </div>
    </>
  )
}

export default App
