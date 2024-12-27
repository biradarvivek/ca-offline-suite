import React, { useState } from 'react';
import { cn } from "../lib/utils";
import { ScrollArea } from "../components/ui/scroll-area"
import Sidebar from '../components/Sidebar';
import AccountNumNameManager from '../components/CaseDashboardComponents/AccountNumNameManager';
import IndividualTable from '../components/CaseDashboardComponents/IndividualTable';

const CaseDashboard = () => {
    const [activeTab, setActiveTab] = useState('Acc No and Acc Name');


  const navItems = [
    {
      title: "Acc No and Acc Name",
      url: "#",
      icon: null,
      isActive: true,
    },
    {
      title: "Individual Table",
      url: "#",
      icon: null,
    },
  ];

  return (
    <>
      <div className={cn("w-full flex h-screen bg-background")}>
        <Sidebar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <ScrollArea className="w-full">
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1">
              {activeTab === 'Acc No and Acc Name' && <AccountNumNameManager />} 
              {activeTab === 'Individual Table' && <IndividualTable />}
            </main>
          </div>
        </ScrollArea>

      </div>
    </>
  );
};

export default CaseDashboard;