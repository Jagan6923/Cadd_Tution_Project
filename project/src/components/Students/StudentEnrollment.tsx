import React, { useState } from 'react';
import { format } from 'date-fns';

interface EnrollmentFormData {
  name: string;
  email: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  dateOfBirth: string;
  courseId: string;
  batchId: string;
}

const mockCourses = [
  { id: '1', name: 'Full Stack Development', fees: 999, technologies: ['React', 'Node.js', 'MongoDB'] },
  { id: '2', name: 'Mobile App Development', fees: 899, technologies: ['React Native', 'Firebase'] },
];

const mockBatches = [
  {
    id: '1',
    name: 'Batch A',
    courseId: '1',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '09:00',
      endTime: '11:00',
    },
    startDate: '2024-04-01',
  },
  {
    id: '2',
    name: 'Batch B',
    courseId: '1',
    schedule: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      startTime: '14:00',
      endTime: '16:00',
    },
    startDate: '2024-04-15',
  },
];

export function StudentEnrollment() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [formData, setFormData] = useState<EnrollmentFormData>({
    name: '',
    email: '',
    phone: '',
    guardianName: '',
    guardianPhone: '',
    address: '',
    dateOfBirth: '',
    courseId: '',
    batchId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - integrate with backend API
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'courseId') {
      setSelectedCourse(value);
      setFormData(prev => ({ ...prev, batchId: '' }));
    }
  };

  const availableBatches = mockBatches.filter(batch => batch.courseId === selectedCourse);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Enrollment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">Guardian Name</label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.guardianName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="guardianPhone" className="block text-sm font-medium text-gray-700">Guardian Phone</label>
            <input
              type="tel"
              id="guardianPhone"
              name="guardianPhone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.guardianPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Select Course</label>
            <select
              id="courseId"
              name="courseId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.courseId}
              onChange={handleInputChange}
            >
              <option value="">Select a course</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name} - ${course.fees}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div>
              <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">Select Batch</label>
              <select
                id="batchId"
                name="batchId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.batchId}
                onChange={handleInputChange}
              >
                <option value="">Select a batch</option>
                {availableBatches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name} - {batch.schedule.days.join(', ')} ({batch.schedule.startTime}-{batch.schedule.endTime})
                    - Starting {format(new Date(batch.startDate), 'MMM d, yyyy')}
                  </option>
                ))}
              </select>
            </div>
          )}
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
            Submit Enrollment
          </button>
        </div>
      </form>
    </div>
  );
}