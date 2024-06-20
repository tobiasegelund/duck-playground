import React from 'react';
import { paginate } from '../utils';
import Content from './Content'
import Pagination from './Pagination'


interface TableProps {
  data: any[];
  currentPage?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  showPagination?: boolean;
  showIndex?: boolean;
  reverse?: boolean;
  showTable?: boolean;
}

export default function Table({ data, currentPage = 1, setCurrentPage = () => { }, showIndex = true, pageSize = 1000, showPagination = true, reverse = false, showTable = true }: TableProps) {
  if (!showTable) {
    return null;
  }
  data = reverse ? data.slice().reverse() : data;

  const dataPage = paginate(data, currentPage, pageSize);
  const startIndex = reverse
    ? Math.max(data.length - pageSize * currentPage, 0)
    : pageSize * (currentPage - 1);

  const numberOfRows = data.length;
  const numberOfColumns = data.length !== 0 ? Object.keys(data[0]).length : 0;


  return (
    <div className="h-full flex flex-col">
      <div className='flex-grow p-2'>
        {<Content rows={dataPage} reverse={reverse} withIndex={showIndex} startIndex={startIndex} />}
      </div>
      {showPagination && (numberOfColumns != 0) && (
        <div className="flex items-center justify-center p-2">
          <div className="mr-auto stat-desc">
            {`${numberOfRows} x ${numberOfColumns}`}
          </div>
          <div className="flex-grow flex justify-center">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} numberOfRows={numberOfRows} />
          </div>
        </div>
      )}
    </div>
  )
}
