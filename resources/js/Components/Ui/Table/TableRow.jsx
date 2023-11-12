function TableRow({ index: i = 1, children }) {
  return (
    <tr
      className={`text-[#455361] ${i % 2 === 1 && 'bg-white rounded-full'}`}
      key={i}
    >
      {children}
    </tr>
  );
}

export default TableRow;
