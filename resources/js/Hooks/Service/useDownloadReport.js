function useDownloadReport() {
  const handleDownloadReport = serviceNumber => {
    window.location.href = `/report/download?service_number=${serviceNumber}`;
  };

  return {
    handleDownloadReport,
  };
}

export default useDownloadReport;
