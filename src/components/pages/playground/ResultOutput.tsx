import { useEffect, useState } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';

import Table from '../../shared/Table';
import { Query } from '../../shared/types';


interface ResultOutputProps {
  queries: Query[];
  db: duckdb.AsyncDuckDB;
}

export default function ResultOutput({ queries, db }: ResultOutputProps) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const pageSize = 1000;

  useEffect(() => {
    const fetchData = async () => {
      if (queries.length === 0) {
        return;
      }
      setLoading(true);
      const query = queries.slice(-1)[0]["query"];
      const conn = await db.connect();

      try {
        const result = await conn.query(query);
        const dataArray = await result.toArray().map((row) => row.toJSON());
        setData(dataArray);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
        conn.close();
      }
    };
    fetchData();
  }, [queries]);

  if (loading) {
    return <span className="loading loading-bars loading-sm"></span>;
  }

  return (
    <div>
      {errorMessage ? <div className="error-message">{errorMessage}</div> : <Table data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} />}
    </div>
  );
}
