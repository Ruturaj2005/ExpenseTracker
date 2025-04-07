import React from 'react';
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Income Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base mr-1" />
          Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}  
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format('Do MMM YYYY')}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
