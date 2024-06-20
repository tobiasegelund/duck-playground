import React from 'react'

import Table from '../../shared/Table';
import { Query } from '../../shared/types';

export default function History({ queries }: { queries: Query[] }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;

  return (
    <div>
      <Table data={queries} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} reverse={true} />
    </div>
  )
}
