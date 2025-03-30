import React, { useState } from 'react';
import { format } from 'date-fns';
import type { LeaveRequest } from '../../types';

export function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      staffId: '1',
      startDate: '2024-04-15',
      endDate: '2024-04-20',
      reason: 'Family vacation',
      type: 'vacation',
      status: 'pending',
      appliedDate: '2024-03-20',
    },
  ]);

  const handleStatusChange = (requestId: string, newStatus: LeaveRequest['status']) => {
    // TODO: Integrate with backend API
    setLeaveRequests(prev =>
      prev.map(request =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Leave Requests</h2>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {leaveRequests.map(request => (
            <div key={request.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">Staff ID: {request.staffId}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <p>Type: {request.type.charAt(0).toUpperCase() + request.type.slice(1)}</p>
                      <p>Applied: {format(new Date(request.appliedDate), 'MMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p>Start: {format(new Date(request.startDate), 'MMM d, yyyy')}</p>
                      <p>End: {format(new Date(request.endDate), 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Reason: {request.reason}
                  </p>
                </div>
                {request.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(request.id, 'approved')}
                      className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                      className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}