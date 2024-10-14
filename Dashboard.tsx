import React, { useState } from 'react';
import { parseCsvData } from './utils/parseCsvData';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
import './Dashboard.css'; // Importing the CSS file for styles

const Dashboard: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        const parsedData = parseCsvData(data);
        if (parsedData && parsedData.length > 0) {
          setCsvData(parsedData);
          setFilteredData(parsedData);
        } else {
          console.warn('Parsed CSV data is empty or invalid.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDateChange = () => {
    if (!csvData || csvData.length === 0) {
      console.warn("CSV data is empty");
      return;
    }

    const filtered = csvData.filter(item => {
      const date = new Date(`${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`);
      return (!startDate || new Date(startDate) <= date) && (!endDate || new Date(endDate) >= date);
    });
    setFilteredData(filtered);
  };

  return (
    <div className="dashboard-container">
      {/* <h1>Hotel Booking Dashboard</h1> */}
      <div className="upload-section">
        <input type="file" accept=".csv" onChange={handleCsvUpload} className="file-input" />
        <div className="date-picker">
          <label>
            Start Date: <input type="date" onChange={e => { setStartDate(e.target.value); handleDateChange(); }} />
          </label>
          <label>
            End Date: <input type="date" onChange={e => { setEndDate(e.target.value); handleDateChange(); }} />
          </label>
        </div>
      </div>

      <div className="charts-section">
        {filteredData.length > 0 ? (
          <>
            <h2>Time Series: Number of Visitors Per Day</h2>
            <TimeSeriesChart data={filteredData} />

            <h2>Column Chart: Number of Visitors Per Country</h2>
            <ColumnChart data={filteredData} />

            <h2>Sparkline Chart: Total Adult Visitors</h2>
            <SparklineChart data={filteredData} visitorType="adults" />

            <h2>Sparkline Chart: Total Children Visitors</h2>
            <SparklineChart data={filteredData} visitorType="children" />
          </>
        ) : (
          <div className="no-data">No data available to display</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
