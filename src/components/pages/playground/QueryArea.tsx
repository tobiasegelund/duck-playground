import React, { useState, useRef, useEffect } from 'react';
import SubmitButton from '../../shared/SubmitButton';
import ClearButton from '../../shared/ClearButton';

interface QueryAreaProps {
  setQueries: React.Dispatch<[]>;
}

export default function QueryArea({ setQueries }: QueryAreaProps) {
  const [query, setQuery] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<{ triggerClick: () => void }>(null);

  function runOnClick() {
    if (query !== '') {
      // const queryJSON = JSON.stringify(query);
      setQueries((prev) => [...prev, { query }]);
    }

    // TODO: Run DuckDB query
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'e') {
        event.preventDefault();
        if (submitButtonRef.current) {
          submitButtonRef.current.triggerClick();
        }
      }
    }

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [query]);

  return (
    <div className="relative w-[46rem] p-4">
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          rows={18}
          className="peer h-full min-h-[500px] w-full !resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
        <label
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        >
          Query Editor
        </label>
      </div>
      <div className="flex w-full justify-between py-1.5">
        <div className="flex gap-2">
          <ClearButton onClick={() => setQuery('')} />
          <SubmitButton text="Run" ref={submitButtonRef} onClick={runOnClick} />
        </div>
      </div>
    </div>
  );
}
