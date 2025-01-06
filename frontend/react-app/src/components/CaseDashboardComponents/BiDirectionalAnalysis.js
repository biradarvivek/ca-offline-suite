import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import DataTable from "../IndividualDashboardComponents/TableData";

const Bidirectional = () => {
  // Dummy data - Replace this with API call when ready
  const dummyData = {
    bidirectional_analysis: [
      {
        "Entity One": "Company A",
        "Entity Two": "Company B",
        "Number of Transactions": 15,
        "Total Amount Exchanged": 150000,
        "Average Amount Exchanged": 10000,
      },
      {
        "Entity One": "Company B",
        "Entity Two": "Company C",
        "Number of Transactions": 8,
        "Total Amount Exchanged": 80000,
        "Average Amount Exchanged": 10000,
      },
      {
        "Entity One": "Company C",
        "Entity Two": "Company A",
        "Number of Transactions": 12,
        "Total Amount Exchanged": 120000,
        "Average Amount Exchanged": 10000,
      },
    ],
    entity_df: {
      Entity: ["Company A", "Company B", "Company C", "Company D"],
    },
  };

  const [selectedEntities, setSelectedEntities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentValue, setCurrentValue] = useState("");
  const rowsPerPage = 10;

  // Get unique entities for the dropdown
  const entities = useMemo(() => {
    return [...new Set(dummyData.entity_df.Entity)].sort();
  }, []);

  // Filter data based on selected entities
  const filteredData = useMemo(() => {
    if (selectedEntities.length === 0) {
      return dummyData.bidirectional_analysis;
    }

    return dummyData.bidirectional_analysis.filter(
      (row) =>
        selectedEntities.includes(row["Entity One"]) ||
        selectedEntities.includes(row["Entity Two"])
    );
  }, [selectedEntities]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleEntitySelect = (value) => {
    setCurrentValue(value);
    setSelectedEntities((prev) => {
      if (prev.includes(value)) {
        return prev.filter((e) => e !== value);
      }
      return [...prev, value];
    });
  };

  const resetFilters = () => {
    setSelectedEntities([]);
    setCurrentValue("");
    setCurrentPage(1);
  };

  return (
    <Card className="m-8">
      <CardHeader>
        <CardTitle>Bidirectional Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters Section */}
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Interest Entities
              </label>
              <Select value={currentValue} onValueChange={handleEntitySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an entity" />
                </SelectTrigger>
                <SelectContent>
                  {entities.map((entity) => (
                    <SelectItem
                      key={entity}
                      value={entity}
                      className={
                        selectedEntities.includes(entity) ? "bg-accent" : ""
                      }
                    >
                      {entity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Selected Entities Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedEntities.map((entity) => (
                  <div
                    key={entity}
                    className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm flex items-center gap-2"
                  >
                    {entity}
                    <button
                      onClick={() => handleEntitySelect(entity)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={resetFilters} variant="outline">
              Reset Filters
            </Button>
          </div>

          {/* Table Section */}
          <div className="border rounded-lg">
            <DataTable data={filteredData} />
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Bidirectional;
