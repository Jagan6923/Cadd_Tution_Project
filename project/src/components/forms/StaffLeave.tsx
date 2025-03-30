import React, { useState } from 'react';
import { format } from 'date-fns';
import type { LeaveRequest } from '../../types';

export function StaffLeave() {
  const [formData, setFormData] = useState<Omit<LeaveRequest, 'id' | 'status' | 'staffId' | 'appliedDate'>>({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'casual',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - integrate with backend API
    console.log('Leave request submitted:', {
      ...formData,
      appliedDate: new Date().toISOString(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Leave Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              min={format(new Date(), 'yyyy-MM-dd')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              min={formData.startDate || format(new Date(), 'yyyy-MM-dd')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Leave Type</label>
          <select
            id="type"
            name="type"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="casual">Casual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation</option>
          </select>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            id="reason"
            name="reason"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Please provide a detailed reason for your leave request..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}