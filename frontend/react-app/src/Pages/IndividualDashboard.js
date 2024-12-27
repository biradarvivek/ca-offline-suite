import React, { useState } from 'react';
import { cn } from "../lib/utils";
import { ScrollArea } from "../components/ui/scroll-area"
import Sidebar from '../components/Sidebar';
import AccountNumNameManager from '../components/CaseDashboardComponents/AccountNumNameManager';
import IndividualTable from '../components/CaseDashboardComponents/IndividualTable';
import Summary from '../components/IndividualDashboardComponents/Summary';
import Transactions from '../components/IndividualDashboardComponents/Transactions';

const IndividualDashboard = () => {
    const [activeTab, setActiveTab] = useState('Acc No and Acc Name');


  const navItems = [
    {
      title: "Summary",
      url: "#",
      icon: null,
      isActive: true,
    },
    {
      title: "Transactions",
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
              {activeTab === 'Summary' && <Summary />} 
              {activeTab === 'Transactions' && <Transactions />}
            </main>
          </div>
        </ScrollArea>

      </div>
    </>
  );
};

export default IndividualDashboard;