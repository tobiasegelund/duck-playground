import React from 'react'

import Table from '../../shared/Table'
import Pagination from '../../shared/Pagination';
import { paginate } from '../../shared/utils';
import { Query } from '../../shared/types';

export default function History({ queries }: { queries: Query[] }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const emptyScreen = queries.length === 0;
  const pageSize = 50;

  const queriesPage = paginate(queries, currentPage, pageSize);

  return (
    <div>
      <div className='min-h-[470px]'>
        {emptyScreen ? <table></table> : <Table rows={queriesPage} withIndex={true} startIndex={pageSize * (currentPage - 1)} />}
      </div>
      {emptyScreen ? null : <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} numberOfRows={queries.length} />}
    </div>
  )
}
