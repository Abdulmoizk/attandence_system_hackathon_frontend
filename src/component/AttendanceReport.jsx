import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import QRScanner from "./QrModal";

const AttendanceReport = () => {
    const [allData, setAllData] = useState([]);

  const gettingAllData = async () => {
    const response = await axios.get('http://localhost:5000/api/allData')
    setAllData(response?.data)
  } 

const gettingStudents = async () => {
  const respose = await axios.get("http://localhost:5000/api/students")
  console.log(respose)
}

  console.log(allData, "daataa")

  useEffect(() => {
    gettingStudents()
    gettingAllData()
  }, [])

  console.log(allData, "dsadsa")
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Portal</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search here..."
            className="px-2 py-1 rounded mr-2"
          />
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/30"
              alt="Admin"
              className="rounded-full"
            />
            <span className="ml-2">Admin</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <nav className="bg-blue-600 text-white w-full md:w-64 p-4">
          <ul className="text-start">
            <li className="font-bold mb-4">SMIT</li>
            <li className="mb-2">Dashboard</li>
            <li className="mb-2">Admission Portal</li>
            <li className="mb-2">Attendance Portal</li>
            <li className="mb-2">Fee Portal</li>
            <li className="mb-2">Quiz Portal</li>
            <li className="mb-2">Generate Certificate</li>
            <li className="mb-2">Student / Teacher Feedback</li>
            <li className="mb-2">Assignment Submission</li>
          </ul>
        </nav>
        <main className="flex-1 p-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Attendance</h2>
            <div className="flex flex-wrap mb-4">
            <QRScanner
                button="Scan Attendance"
                message={"Attendance marked"}
              />
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Select Campus</option>
                {allData?.length > 0 && allData?.filter((filItem) => filItem == "campuses")?.map((item) => (
                  <option key={item?._id}>{item?.name}</option>
                ))}
                
              </select>
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Select Course</option>
                {allData?.length > 0 && allData?.filter((filItem) => filItem == "course")?.map((item) => (
                  <option key={item?._id}>{item?.name}</option>
                ))}

              </select>
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Select Batch</option>
                {allData?.length > 0 && allData?.filter((filItem) => filItem == "batches")?.map((item) => (
                  <option key={item?._id}>{item?.name}</option>
                ))}
              </select>
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Instructor Name</option>
                {allData?.length > 0 && allData?.filter((filItem) => filItem == "teachers")?.map((item) => (
                  <option key={item?._id}>{item?.name}</option>
                ))}
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Search
              </button>
            </div>
            <div className="overflow-auto h-[55vh]">
              <table className="table-auto w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="border px-4 py-2">Students</th>
                    {Array.from({ length: 14 }, (_, i) => (
                      <th key={i} className="border px-4 py-2">
                        {i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map((employee, idx) => (
                    <tr key={idx}>
                      <td className="border bg-white px-4 py-2 flex items-center">
                        <img
                          src="https://via.placeholder.com/30"
                          alt={`Student ${idx + 1}`}
                          className="rounded-full mr-2"
                        />
                        Student {idx + 1}
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5].map((day, dayIdx) => (
                        <td key={dayIdx} className="border px-4 py-2 text-center">
                          {day !== 8 && day !== 3 ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaTimesCircle className="text-red-500" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceReport;
