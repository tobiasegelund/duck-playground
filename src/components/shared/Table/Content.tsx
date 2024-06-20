import React, { useState } from 'react';
import './Content.css';


type RowType = { [key: string]: any };

interface ContentProps {
  rows: RowType[];
  reverse?: boolean;
  withIndex?: boolean;
  startIndex?: number;
}

const Content: React.FC<ContentProps> = ({ rows, reverse = false, withIndex = false, startIndex = 0 }) => {
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
            <Row key={idx} idx={reverse ? rows.length - idx + startIndex : idx + startIndex + 1} values={row} withIndex={withIndex} />
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
