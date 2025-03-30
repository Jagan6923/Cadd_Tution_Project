const StudentsList = () => {
  const students = [
    {
      id: 1,
      name: "Jeyaraman",
      email: "jeyaraman@example.com",
      course: "Full Stack Development",
      batch: "Batch A",
    },
    {
      id: 2,
      name: "Anand",
      email: "anand@example.com",
      course: "Mobile App Development",
      batch: "Batch B",
    },
    {
      id: 3,
      name: "Sathish",
      email: "sathish@example.com",
      course: "Full Stack Development",
      batch: "Batch C",
    },
    {
      id: 4,
      name: "John",
      email: "john@example.com",
      course: "UI/UX Design",
      batch: "Batch A",
    },
    {
      id: 5,
      name: "Dinesh",
      email: "dinesh@example.com",
      course: "Full Stack Development",
      batch: "Batch B",
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Course
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Batch
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.course}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.batch}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
