interface Props {
  onClick?: () => void
}

export default function ClearButton({ onClick }: Props) {
  return (
    <button
      className="px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-md border border-black select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      onClick={onClick}>
      Clear
    </button>
  )
}
