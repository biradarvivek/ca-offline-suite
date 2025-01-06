import { useState, useEffect } from 'react';
import { Calendar, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const FundTracking = ({ data = [], onFilterChange = () => {} }) => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique names and categories from data
  const uniqueNames = [...new Set(data.map(item => item.Name))];
  const uniqueCategories = [...new Set(data.map(item => item.Category))];

  useEffect(() => {
    // Apply filters
    let filtered = data;
    if (selectedName) {
      filtered = filtered.filter(item => item.Name === selectedName);
    }
    if (selectedCategory) {
      filtered = filtered.filter(item => item.Category === selectedCategory);
    }
    if (selectedDate) {
      filtered = filtered.filter(item => item.Value_Date === selectedDate);
    }
    if (searchQuery) {
      filtered = filtered.filter(item => 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setFilteredData(filtered);
    onFilterChange(filtered);
  }, [selectedName, selectedCategory, selectedDate, searchQuery, data]);

  const resetFilters = () => {
    setSelectedName('');
    setSelectedCategory('');
    setSelectedDate('');
    setSearchQuery('');
  };

  return (
    <div className='p-5'>
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-semibold">Fund Tracking</CardTitle>
        {/* <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div> */}
      </CardHeader>
      <CardContent>
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
            />
          </div>

          <Select
            value={selectedName}
            onValueChange={setSelectedName}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select name" />
            </SelectTrigger>
            <SelectContent>
              {uniqueNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button 
              onClick={() => onFilterChange(filteredData)}
              className="flex-1 hover:bg-blue-600"
            >
              Apply Filters
            </Button>
            <Button 
              onClick={resetFilters}
              variant="ghost"
              className="flex-1 border-2"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Value Date</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold text-right">Debit</TableHead>
                <TableHead className="font-semibold text-right">Credit</TableHead>
                <TableHead className="font-semibold text-right">Balance</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Entity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, index) => (
                  <TableRow 
                    key={index}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <TableCell>{item.Name}</TableCell>
                    <TableCell>{item.Value_Date}</TableCell>
                    <TableCell>{item.Description}</TableCell>
                    <TableCell className="text-right">{item.Debit}</TableCell>
                    <TableCell className="text-right">{item.Credit}</TableCell>
                    <TableCell className="text-right">{item.Balance}</TableCell>
                    <TableCell>{item.Category}</TableCell>
                    <TableCell>{item.Entity}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default FundTracking;