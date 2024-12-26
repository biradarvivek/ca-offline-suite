import React, { useState } from 'react';
import { LayoutDashboard, Files, Bell, Search, Sun, Moon, BarChart3, User, Settings, LogOut } from 'lucide-react';
import ReportGenerator from "./report";
import ElectronIntro from '../components/ElectronIntro';
import { cn } from "../lib/utils";
import logo from "../data/assets/logo.png";
import { ReportChart } from "../components/Elements/chartComponent";
import { useTheme } from "../components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ScrollArea } from "../components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useToast } from "../hooks/use-toast";

const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [chartViewType, setChartViewType] = useState("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [recentReports, setRecentReports] = useState([
    { id: 1, date: '13-12-2024', caseId: 'ATS_unit_1_00008', reportName: 'Report_ATS_unit_1_00008', status: 'Completed' },
    { id: 2, date: '13-12-2024', caseId: 'ATS_unit_1_00007', reportName: 'Report_ATS_unit_1_00007', status: 'In Progress' },
    { id: 3, date: '12-12-2024', caseId: 'ATS_unit_1_00003', reportName: 'Report_ATS_unit_1_00003', status: 'Completed' },
    { id: 4, date: '12-12-2024', caseId: 'ATS_unit_1_00002', reportName: 'Report_ATS_unit_1_00002', status: 'Under Review' },
    { id: 5, date: '12-12-2024', caseId: 'ATS_unit_1_00001', reportName: 'Report_ATS_unit_1_00001', status: 'Completed' }
  ]);

  const dummyChartData = {
    daily: [
      { label: "Mon", value: 10 },
      { label: "Tue", value: 15 },
      { label: "Wed", value: 8 },
      { label: "Thu", value: 12 },
      { label: "Fri", value: 20 },
    ],
    monthly: [
      { label: "Jan", value: 45 },
      { label: "Feb", value: 52 },
      { label: "Mar", value: 38 },
      { label: "Apr", value: 42 },
      { label: "May", value: 55 },
    ]
  };

  const stats = {
    totalReports: 1234,
    monthlyReports: 156,
    totalStatements: 5678
  };

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'Dashboard' },
    { name: 'Generate Report', icon: Files, id: 'report' }
  ];

  const notifications = [
    { id: 1, title: 'New Message', message: 'You have a new message from the team.', time: '5m ago' },
    { id: 2, title: 'Report Ready', message: 'Your report is ready to download.', time: '10m ago' },
    { id: 3, title: 'Update Available', message: 'A new version is available.', time: '1h ago' },
  ];

  const handleAddReport = (id) => {
    toast({
      title: "Report Viewed",
      description: `Opening report ${id} for viewing.`,
    });
  };

  const handleDeleteReport = (id) => {
    setRecentReports(recentReports.filter(report => report.id !== id));
    toast({
      title: "Report Deleted",
      description: "The report has been removed from your list.",
      variant: "destructive",
    });
  };

  const StatusBadge = ({ status }) => {
    const variants = {
      'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      'Under Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
    };

    return (
      <Badge variant="outline" className={cn("px-2.5 py-0.5 text-xs font-semibold", variants[status])}>
        {status}
      </Badge>
    );
  };

  const StatsCard = ({ title, value, description, icon: Icon }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );

  const DashboardContent = () => (
    <ScrollArea className="h-full">
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Overview of your report analytics and recent activities
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-10 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[380px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                    <div className="flex justify-between w-full">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Reports"
            value={stats.totalReports}
            description="All time reports generated"
            icon={Files}
          />
          <StatsCard
            title="Monthly Reports"
            value={stats.monthlyReports}
            description="Reports generated this month"
            icon={BarChart3}
          />
          <StatsCard
            title="Total Statements"
            value={stats.totalStatements}
            description="Processed statements"
            icon={Files}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              A list of recent reports from all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.caseId}</TableCell>
                    <TableCell>{report.reportName}</TableCell>
                    <TableCell>
                      <StatusBadge status={report.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddReport(report.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Report generation trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ReportChart chartData={dummyChartData} viewType={chartViewType} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );

  return (
    <>
      {showIntro && <ElectronIntro onComplete={() => setShowIntro(false)} />}
      <div className={cn("flex h-screen bg-background")}>
        <div className="w-64 border-r bg-card">
          <div className="h-16 flex items-center px-6 border-b">
            <img src={logo} alt="Logo" className="h-8" />
          </div>

          <ScrollArea className="h-[calc(100vh-4rem)]">
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    activeTab === item.id && "bg-secondary"
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1">
            {activeTab === 'Dashboard' ? <DashboardContent /> : <ReportGenerator />}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;