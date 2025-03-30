import React, { useState, useEffect } from "react";
import {  CheckCircle, XCircle } from "lucide-react";
import type { Student } from "../../types";

type AttendanceRecord = {
  date: string;
  students: { id: string; name: string; present: boolean }[];
};

export function TakeAttendance() {
  const [students, setStudents] = useState<Student[]>([
    {
        id: "1", name: "Jeyaraman",
        present: undefined,
        email: "",
        phone: "",
        guardianName: "",
        guardianPhone: "",
        enrolledCourses: [],
        address: "",
        dateOfBirth: "",
        enrollmentDate: "",
        status: "active"
    },
    {
        id: "2", name: "Anand",
        present: undefined,
        email: "",
        phone: "",
        guardianName: "",
        guardianPhone: "",
        enrolledCourses: [],
        address: "",
        dateOfBirth: "",
        enrollmentDate: "",
        status: "active"
    },
    {
        id: "3", name: "Sathish",
        present: undefined,
        email: "",
        phone: "",
        guardianName: "",
        guardianPhone: "",
        enrolledCourses: [],
        address: "",
        dateOfBirth: "",
        enrollmentDate: "",
        status: "active"
    },
  ]);

  const [attendanceDate, setAttendanceDate] = useState<string>("");
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  useEffect(() => {
    const storedRecords = localStorage.getItem("attendanceRecords");
    if (storedRecords) {
      setAttendanceRecords(JSON.parse(storedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(attendanceRecords)
    );
  }, [attendanceRecords]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttendanceDate(e.target.value);
  };

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, present } : student
      )
    );
  };

  const handleSaveAttendance = () => {
    const newRecord: AttendanceRecord = {
      date: attendanceDate,
      students: students.map((student) => ({
        id: student.id,
        name: student.name,
        present: student.present,
      })),
    };

    setAttendanceRecords((prev) => [newRecord, ...prev]);
    setAttendanceDate("");
    setStudents((prev) =>
      prev.map((student) => ({ ...student, present: false }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Take Attendance</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attendance Date
            </label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={attendanceDate}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Students
            </label>
            <ul className="mt-2 space-y-2">
              {students.map((student) => (
                <li
                  key={student.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium">{student.name}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, true)}
                      className={`p-2 rounded-full ${
                        student.present
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, false)}
                      className={`p-2 rounded-full ${
                        !student.present
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveAttendance}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Attendance
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {attendanceRecords.map((record, index) => (
            <div key={index} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {record.date}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {record.students.map((student) => (
                      <span
                        key={student.id}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.present
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {student.name} ({student.present ? "Present" : "Absent"}
                        )
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TakeAttendance;