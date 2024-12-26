import React, { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

const GenerateReport = () => {
  const [unit, setUnit] = useState("Unit 1");
  const [units, setUnits] = useState(["Unit 1", "Unit 2"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState("00009");
  const [caseId, setCaseId] = useState("ATS_Unit_1_00009");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  const filteredUnits = units.filter((u) =>
    u.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUnit = () => {
    if (searchTerm.trim() && !units.includes(searchTerm.trim())) {
      setUnits([...units, searchTerm.trim()]);
      setUnit(searchTerm.trim());
      setSearchTerm("");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("Selected File:", e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (selectedFile) {
        console.log({
          unit,
          serialNumber,
          caseId,
          selectedFile: {
            name: selectedFile.name,
            size: selectedFile.size,
            type: selectedFile.type,
          },
        });
      } else {
        console.log({
          unit,
          serialNumber,
          caseId,
          selectedFile: "No file selected",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCaseId(`ATS_${unit.replace(/\s+/g, "_")}_${serialNumber}`);
  }, [unit, serialNumber]);

  return (
    <div className="container w-full mx-2 px-6 md:px-12 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">Generate Report</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Unit Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="mt-2 w-full px-4 py-3 text-left border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 bg-gray-50 dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100"
              disabled={isLoading}
            >
              {unit}
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 
                            border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                <div className="p-3 border-b dark:border-gray-600 flex">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search or add new unit..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 
                             rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-blue-500 bg-white dark:bg-gray-700
                             text-gray-900 dark:text-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddUnit}
                    className="px-3 py-2 bg-blue-600 text-white rounded-r-lg 
                             hover:bg-blue-700 focus:outline-none"
                  >
                    Add
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredUnits.map((u, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setUnit(u);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 
                               dark:hover:bg-gray-700 focus:outline-none
                               text-gray-900 dark:text-gray-100"
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Serial Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Serial Number</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="00009"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 
                       dark:border-gray-600 rounded-lg focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled={isLoading}
            />
          </div>

          {/* Case ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Case ID</label>
            <input
              type="text"
              value={caseId}
              disabled
              className="mt-2 block w-full px-4 py-3 border border-gray-300 
                       dark:border-gray-600 rounded-lg bg-gray-200 
                       dark:bg-gray-600 text-gray-500 dark:text-gray-400 
                       cursor-not-allowed"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bank Statements</label>
          <div className="mt-2 flex items-center">
            <input
              type="text"
              value={selectedFile?.name || ""}
              placeholder="Select PDF or Excel files..."
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:outline-none bg-white dark:bg-gray-700
                       text-gray-900 dark:text-gray-100"
            />
            <label
              htmlFor="file-upload"
              className={`ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg 
                        cursor-pointer hover:bg-blue-700 focus:outline-none 
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Browse
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white px-8 py-3 rounded-lg 
                      hover:bg-blue-700 focus:outline-none flex items-center 
                      space-x-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateReport;