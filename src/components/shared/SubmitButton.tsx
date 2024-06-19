import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface Props {
  text: string;
  onClick?: () => void;
}

const SubmitButton = forwardRef(({ text, onClick }: Props, ref) => {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    triggerClick() {
      handleClick();
    }
  }));

  const handleClick = () => {
    if (onClick) {
      setLoading(true);
      onClick();
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <button
      className="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? <span className="loading loading-spinner loading-xs"></span> : text}
    </button>
  );
});

export default SubmitButton;
