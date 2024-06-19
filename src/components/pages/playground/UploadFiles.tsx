import React, { useState } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';

import Table from '../../shared/Table';
import SubmitButton from '../../shared/SubmitButton';
import { FileInfo } from '../../shared/types';
import { formatBytes } from '../../shared/utils';


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

      setFiles((prev) => [...prev, { "filename": file.name, "type": file.type, "size": size }])
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
      <form onClick={handleUpload}>
        <input type="file" onChange={handleFileChange} className="file-input w-full max-w-xs m-4" />
        <SubmitButton text="Upload" />
      </form>
      <div className='m-4 min-h-[250px]'>
        <Table rows={files} withIndex={true} />
      </div>
    </div>
  )
}
