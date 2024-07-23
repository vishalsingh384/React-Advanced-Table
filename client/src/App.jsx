import { useEffect, useState } from 'react'
import './App.css'
import Table from './Table';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  const startIndex = currPage * 10 - 10;
  const lastIndex = currPage * 10;

  const totalPages = Math.ceil(totalData.length / 10);

  const handlePageNo = (str) => {
    if (str === '') {
      setCurrPage(1);
    }
    else if (str === "next" && currPage < totalPages) {
      setCurrPage((prev) => prev + 1);
    }
    else if (str === "prev" && currPage > 1) {
      setCurrPage((prev) => prev - 1);
    }
  }

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get(`http://localhost:5001/users?q=${query}`);
      setTotalData(resp.data);
      handlePageNo('');
    }
    getData();
  }, [query])

  useEffect(() => {
    setData(totalData.slice(startIndex, lastIndex));
  }, [currPage, totalPages])


  return (
    <>
      <input type="text" name="search" placeholder='Search'
        onChange={(e) => setQuery(e.target.value.toLowerCase())} />
      {totalPages > 0 &&
        <>
          <div>
            <Table data={data} />
          </div>
          <div>
            <span className="page-link" onClick={() => handlePageNo("prev")}>⬅️</span>
            <span>{currPage}</span>
            <span className="page-link" onClick={() => handlePageNo("next")}>➡️</span>
          </div>
        </>
      }
    </>
  )
}

export default App
