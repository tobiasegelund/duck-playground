import { useState, useEffect } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';

import ResultOutput from './ResultOutput';
import QueryArea from './QueryArea';
import Footer from '../../shared/Footer';
import UploadFiles from './UploadFiles';
import History from './History';
import SubmitButton from '../../shared/SubmitButton';
import { initializeDuckDBInstance } from '../../shared/utils';
import { Query, FileInfo } from '../../shared/types';
import { LoadingScreen } from '../../shared/LoadingScreen';

export default function Playground() {
  const [duckDB, setDuckDB] = useState<duckdb.AsyncDuckDB>();
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    document.title = 'Playground';

    const initializeDB = async () => {
      try {
        const db = await initializeDuckDBInstance();
        setDuckDB(db);
      } catch (error) {
        console.error('Failed to initialize DuckDB:', error);
      } finally {
        setLoading(false); // Set loading to false after initialization
      }
    };

    initializeDB();

    return () => {
      if (duckDB) {
        duckDB.terminate();
      }
    };
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <div className='flex flex-col justify-between h-screen'>
        <div className="flex justify-end items-center mt-4 px-4 p-3">
          <SubmitButton text="Log out" />
        </div>
        <div className="flex h-full">
          <div className="flex-1">
            <QueryArea setQueries={setQueries} />
          </div>
          <div className="flex-1">
            <TabsArea queries={queries} db={duckDB} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

const TabsArea = ({ queries, db }: { queries: Query[], db: duckdb.AsyncDuckDB }) => {
  const [activeTab, setActiveTab] = useState("files");
  const [files, setFiles] = useState<FileInfo[]>([]);

  const tabs = ["result", "history", "files"];

  return (
    <div>
      <div role="tablist" className="tabs tabs-lifted w-16">
        {tabs.map((tab) => (
          <a
            key={tab}
            role="tab"
            className={`tab ${activeTab === tab ? 'tab-active' : ''} text-[12px] font-normal`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </a>
        ))}
      </div>
      <div className='m-4'>
        {activeTab === 'result' && <ResultOutput queries={queries} db={db} />}
        {activeTab === 'files' && <UploadFiles files={files} setFiles={setFiles} db={db} />}
        {activeTab === 'history' && <History queries={queries} />}
      </div>
    </div>
  );
};

