import React, { useState } from 'react';
import './Content.css';


// eslint-disable-next-line
type RowType = { [key: string]: any };

interface ContentProps {
  rows: RowType[];
  withIndex?: boolean;
  startIndex?: number;
}

/*
  * Content component that renders a table
  * @param {RowType[]} rows - Rows to be rendered in the table
  * @param {boolean} withIndex - Whether to show the index of the row
  * @param {number} startIndex - Index to start from
  * @returns {ReactElement} - Returns a table
*/
const Content: React.FC<ContentProps> = ({ rows, withIndex = false, startIndex = 0 }) => {
  if (rows.length === 0) return null;

  const columns = Object.keys(rows[0]);

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[460px]">
      <table className={`table table-auto`}>
        <thead>
          <tr>
            {withIndex && <th>#</th>}
            {columns.map((column, idx) => (
              <th key={idx}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <Row key={idx} idx={idx + startIndex + 1} values={row} withIndex={withIndex} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface RowProps {
  idx: number;
  values: RowType;
  withIndex?: boolean;
}

/*
  * Row component that renders a row in the table
  * @param {number} idx - Index of the row
  * @param {RowType} values - Values of the row
  * @param {boolean} withIndex - Whether to show the index of the row
  * @returns {ReactElement} - Returns a row in the table
*/
const Row: React.FC<RowProps> = ({ idx, values, withIndex = false }) => {
  const [expandedCell, setExpandedCell] = useState<string | null>(null);

  const handleCellClick = (key: string) => {
    setExpandedCell(expandedCell === key ? null : key);
  };

  return (
    <tr className="hover">
      {withIndex && <th>{idx}</th>}
      {Object.keys(values).map((key) => (
        <td
          key={key}
          onClick={() => handleCellClick(key)}
          className='table-cell'
        >
          {expandedCell === key ? (
            <div className="expanded-cell">
              {values[key]}
            </div>
          ) : (
            values[key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default Content;
