import { useState, useEffect } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';

import ResultOutput from './ResultOutput';
import QueryArea from './QueryArea';
import Footer from '../../shared/Footer';
import UploadFiles from './UploadFiles';
import History from './History';
import Help from './Help';
import { initializeDuckDBInstance } from '../../shared/utils';
import { Query, FileInfo } from '../../shared/types';
import { LoadingScreen } from '../../shared/LoadingScreen';
import githubLogo from '../../../assets/github-mark.svg'

export default function Playground() {
  const [duckDB, setDuckDB] = useState<duckdb.AsyncDuckDB>();
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    document.title = 'Duck Playground';

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

  if (loading || !duckDB) {
    return <LoadingScreen />
  }

  return (
    <>
      <div className='flex flex-col justify-between h-screen'>
        <div className="flex justify-end items-center mt-4 px-4 p-3">
          <a href="https://github.com/tobiasegelund/duck-playground" target="_blank">
            <img src={githubLogo} alt="Github Logo" className="h-8 w-8" />
          </a>
        </div>
        <div className="flex h-full">
          <div className="flex-1 h-full">
            <QueryArea setQueries={setQueries} />
          </div>
          <div className="flex-1 h-full max-h-max overflow-x-auto">
            <TabsArea queries={queries} db={duckDB} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

const TabsArea = ({ queries, db }: { queries: Query[], db: duckdb.AsyncDuckDB }) => {
  const [activeTab, setActiveTab] = useState("help");
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    if (queries.length > 0) {
      setActiveTab("results");
    }
  }, [queries]);

  const tabs = ["results", "history", "upload", "help"];

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
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {activeTab === 'results' && <ResultOutput queries={queries} db={db} />}
        {activeTab === 'upload' && <UploadFiles files={files} setFiles={setFiles} db={db} />}
        {activeTab === 'history' && <History queries={queries} />}
        {activeTab === 'help' && <Help />}
      </div>
    </div>
  );
};

