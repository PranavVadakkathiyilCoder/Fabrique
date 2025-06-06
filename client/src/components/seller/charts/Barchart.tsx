import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {shortMonths} from '../../../constents/Date'
export default function ChartsOverviewDemo() {
  return (
    <BarChart
      series={[
        { data: [35, 44, 24, 34, 6, 49, 30,15, 25, 30, 50,12] },
       
      ]}
      height={290}
      xAxis={[{ data: shortMonths }]}
    />
  );
}
