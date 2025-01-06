import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Badge } from "../ui/badge";

// Properly structured dummy data
const dummy_data = {
  "Utilization of Credit (10000) received by Gamma from Alpha on 2024-04-03": {
    LIFO: {
      "Value Date": ["2024-04-01"],
      Name: ["Alpha"],
      Description: ["Opening Balance"],
      Debit: [0],
      Credit: [0],
      Entity: ["poojan"],
    },
    FIFO: {
      "Value Date": [
        "2024-04-03",
        "2024-04-04",
        "2024-04-05",
        "2024-04-06",
        "2024-04-06",
        "2024-04-07",
        "2024-04-10",
      ],
      Name: ["Gamma", "Gamma", "Gamma", "Gamma", "Gamma", "Gamma", "Gamma"],
      Description: [
        "Credit from Alpha",
        "Groceries",
        "Travel Expense",
        "Transfer to Delta",
        "Dining",
        "Gift to Beta",
        "Transfer to Delta",
      ],
      Debit: [0, 250, 100, 1500, 150, 200, 1500],
      Credit: [10000, 0, 0, 0, 0, 0, 0],
      Entity: ["Alpha", null, "raj", "Delta", null, "Beta", "Delta"],
      "Utilized Credit": [0, 250, 350, 1850, 2000, 2200, 3700],
      "Remaining Credit": [10000, 9750, 9650, 8150, 8000, 7800, 6300],
    },
  },
  "Utilization of Credit (1000) received by Alpha from Beta on 2024-04-03": {
    LIFO: {
      "Value Date": ["2024-04-01"],
      Name: ["Beta"],
      Description: ["Opening Balance"],
      Debit: [0],
      Credit: [0],
      Entity: [null],
    },
    FIFO: {
      "Value Date": ["2024-04-03", "2024-04-04", "2024-04-05"],
      Name: ["Alpha", "Alpha", "Alpha"],
      Description: ["Credit from Beta", "Groceries", "Electricity Bill"],
      Debit: [0, 200, 150],
      Credit: [1000, 0, 0],
      Entity: ["Beta", "sanjay", "gar"],
      "Utilized Credit": [0, 200, 350],
      "Remaining Credit": [1000, 800, 650],
    },
  },
};

const DataTable = ({ data }) => {
  if (!data || typeof data !== "object") return null;

  const columns = Object.keys(data);
  if (!columns.length) return null;

  const rowCount = data[columns[0]]?.length || 0;
  if (!rowCount) return null;

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className=" text-black p-2 text-sm">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className="p-2 text-sm text-center border-b"
                >
                  {data[column][rowIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const AccordionItem = ({ title, lifoData, fifoData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="my-2">
      <CardHeader className="p-0">
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center p-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <CardTitle className="text-sm mb-2">LIFO Table</CardTitle>
              <DataTable data={lifoData} />
            </div>
            <div>
              <CardTitle className="text-sm mb-2">FIFO Table</CardTitle>
              <DataTable data={fifoData} />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const getUniqueEntities = (data) => {
  if (!data) return [];

  const entities = new Set();
  Object.values(data).forEach(({ FIFO, LIFO }) => {
    if (FIFO?.Entity) {
      FIFO.Entity.forEach((entity) => {
        if (entity) entities.add(entity);
      });
    }
    if (LIFO?.Entity) {
      LIFO.Entity.forEach((entity) => {
        if (entity) entities.add(entity);
      });
    }
  });
  return Array.from(entities).sort();
};

export default function LIFOFIFO() {
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [filteredData, setFilteredData] = useState(dummy_data);
  const entities = getUniqueEntities(dummy_data);
  const [currentValue, setCurrentValue] = useState("");

  const handleFilter = (entities) => {
    if (!entities.length) {
      setFilteredData(dummy_data);
      return;
    }

    const filtered = Object.entries(dummy_data).reduce((acc, [key, value]) => {
      const hasFIFOMatch = value.FIFO.Entity.some((entity) =>
        entities.includes(entity)
      );
      const hasLIFOMatch = value.LIFO.Entity.some((entity) =>
        entities.includes(entity)
      );

      if (hasFIFOMatch || hasLIFOMatch) {
        acc[key] = value;
      }
      return acc;
    }, {});

    setFilteredData(filtered);
  };

  const handleEntitySelect = (value) => {
    setCurrentValue(value);
    if (!selectedEntities.includes(value)) {
      const newSelectedEntities = [...selectedEntities, value];
      setSelectedEntities(newSelectedEntities);
      handleFilter(newSelectedEntities);
    }
  };

  const handleRemoveEntity = (entityToRemove) => {
    const newSelectedEntities = selectedEntities.filter(
      (entity) => entity !== entityToRemove
    );
    setSelectedEntities(newSelectedEntities);
    handleFilter(newSelectedEntities);
  };

  const handleReset = () => {
    setSelectedEntities([]);
    setCurrentValue("");
    setFilteredData(dummy_data);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Select value={currentValue} onValueChange={handleEntitySelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select entities..." />
              </SelectTrigger>
              <SelectContent>
                {entities
                  .filter((entity) => !selectedEntities.includes(entity))
                  .map((entity) => (
                    <SelectItem key={entity} value={entity}>
                      {entity}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleReset}
              className="whitespace-nowrap"
            >
              Reset Filters
            </Button>
          </div>

          {selectedEntities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedEntities.map((entity) => (
                <Badge
                  key={entity}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {entity}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveEntity(entity)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="h-[600px] rounded-md border p-4">
        {Object.entries(filteredData).map(([key, value], index) => (
          <AccordionItem
            key={index}
            title={key}
            lifoData={value.LIFO}
            fifoData={value.FIFO}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
