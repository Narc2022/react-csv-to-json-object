import React, { useState } from "react";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";

const CsvToArray = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true, // Skip empty lines
      complete: function (result) {
        setData(result.data);
        console.log(result.data); // Array of objects
      },
      error: function (error) {
        console.error("Error parsing CSV file:", error);
      },
    });
  };

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
              />
            </svg>

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Select</span> Or drag and drop
              file here
            </p>
            <b className="text-xs text-gray-500 dark:text-gray-400">
              (Supported Format : CSV)
            </b>
          </div>
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
};

export default CsvToArray;
