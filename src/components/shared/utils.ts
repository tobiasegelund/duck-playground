import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: mvp_worker,
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: eh_worker,
  },
};


/*
  Goal: Create a function that slices an array based on the current page and page size.

  The paginate function will take in three parameters:
    1. data: an array of any type
    2. currentPage: a number representing the current page
    3. pageSize: a number representing the number of items per page

  The function should return a new array that is a subset of the data array based on the currentPage and pageSize.

*/
export function paginate<T>(data: T[], currentPage: number, pageSize: number): T[] {
  return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}

export async function initializeDuckDBInstance(): Promise<duckdb.AsyncDuckDB> {
  const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
  const logger = new duckdb.ConsoleLogger();
  const worker = new Worker(bundle.mainWorker!);
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule);
  return db;
}

export function formatBytes(bytes: number) {
  if (bytes === 0) return '0 bytes';
  const k = 1024;
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${size} ${sizes[i]}`;
}

export function extractExtension(filename: string): string {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}