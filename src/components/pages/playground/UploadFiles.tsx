import React, { useState } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';

import Content from '../../shared/Table/Content';
import SubmitButton from '../../shared/SubmitButton';
import { FileInfo } from '../../shared/types';
import { extractExtension, formatBytes } from '../../shared/utils';
import Table from '../../shared/Table';


interface UploadFilesProps {
  files: FileInfo[];
  setFiles: React.Dispatch<FileInfo[]>;
  db: duckdb.AsyncDuckDB;
}


export default function UploadFiles({ files, setFiles, db }: UploadFilesProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = (_) => {
    const uploadFile = async () => {
      try {
        if (!file) {
          return;
        }
        await db.registerFileHandle(file.name, file, duckdb.DuckDBDataProtocol.BROWSER_FILEREADER, true);
      } catch (error) {
        setFile(null);
        console.log(error)
      }
    }
    uploadFile();

    if (file) {
      const size = formatBytes(file.size);
      console.log(file.type)
      const type = file.type === undefined ? extractExtension(file.name) : file.type;

      setFiles((prev) => [...prev, { "filename": file.name, "type": type, "size": size }])
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} className="file-input w-full max-w-xs m-4" />
        <SubmitButton text="Upload" onClick={handleUpload} />
      </form>
      <div className='m-4'>
        <Table data={files} showPagination={false} />
      </div>
    </div>
  )
}
