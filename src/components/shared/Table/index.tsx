import { paginate } from '../utils';
import Content from './Content'
import Pagination from './Pagination'


interface TableProps {
  data: any[];
  currentPage?: number;
  setCurrentPage?: () => void;
  pageSize?: number;
  showPagination?: boolean;
  showIndex?: boolean;
  showTable?: boolean;
}

export default function Table({ data, currentPage = 1, setCurrentPage = () => { }, showIndex = true, pageSize = 1000, showPagination = true, showTable = true }: TableProps) {
  if (!showTable) {
    return null;
  }

  const dataPage = paginate(data, currentPage, pageSize);
  const startIndex = pageSize * (currentPage - 1)
  const numberOfRows = data.length;
  // const numberOfColumns = Object.keys(data[0]).length;

  return (
    <div className="h-full flex flex-col">
      <div className='flex-grow p-2'>
        {<Content rows={dataPage} withIndex={showIndex} startIndex={startIndex} />}
      </div>
      {showPagination && (
        <div className="flex items-end justify-center">
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} numberOfRows={numberOfRows} />
        </div>
      )}
    </div>
  )
}