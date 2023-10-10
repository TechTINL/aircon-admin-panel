export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 px-2 bg-indigo-800">
      <div className="w-full sm:max-w-5xl bg-white shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
