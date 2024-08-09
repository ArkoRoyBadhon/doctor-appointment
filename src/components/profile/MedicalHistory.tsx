"use client";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import { useGetBillingBypatientQuery } from "@/redux/features/medicalHistory/medicalHistoryApi";

const MedicalHistory: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sort, setSort] = useState("-createdAt");

  const {
    data: billingData,
    isLoading,
    isSuccess,
  } = useGetBillingBypatientQuery({ page, limit, sort });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return (
      <div className="center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg border h-[400px] overflow-auto">
      <div className="flex justify-between items-center mb-4 bg-primaryBg py-[16px] px-[10px] rounded-md sticky top-0 z-30">
        <h3 className="text-xl font-semibold text-white">Billing History</h3>
        <div>
          <select
            value={sort}
            onChange={handleSortChange}
            className="p-2 rounded"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="amount">Amount Ascending</option>
            <option value="-amount">Amount Descending</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-between">
      {isSuccess && billingData?.billingRecords?.length > 0 ? (
        <div>
          <ul className="px-[20px] pb-[20px]">
            {billingData.billingRecords.map((entry: any, index: number) => (
              <li
                key={index}
                className="mb-2 text-[14px] text-gray-800 border-b-2"
              >
                <p className="font-semibold">Doctor: {entry.doctor.name}</p>
                <p className="font-semibold">Amount: {entry.amount}</p>
                <p className="font-semibold">
                  Payment Date:{" "}
                  {new Date(entry.paymentDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-borderDark px-[20px]">
          No billing records available.
        </p>
      )}
      <div className="flex justify-between px-4 py-2">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-gray-300 text-gray-600 py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={billingData.billingRecords.length < limit}
          className="bg-green-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
