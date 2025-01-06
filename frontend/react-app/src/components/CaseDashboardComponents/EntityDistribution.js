import React from 'react'
import PieCharts from '../charts/PieCharts'
import EntityTable from './EntityTable'
import DataTable from '../IndividualDashboardComponents/TableData'

const Data = [
    { entity: "Entity A", frequency: 10 },
    { entity: "Entity B", frequency: 30 },
    { entity: "Entity C", frequency: 5 },
    { entity: "Entity D", frequency: 20 },
    { entity: "Entity E", frequency: 35 },
]



function EntityDistribution() {
  return (
    <div className="space-y-6 m-8">
        <PieCharts 
        title='Entity Distribution'
        data={Data}
        nameKey="entity"
        valueKey="frequency"
        />
        
        <EntityTable/>
    </div>
  )
}

export default EntityDistribution
