'use client'
import { useState } from 'react';
import { Patient } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PatientAssessment } from './patient-assessment';

// Sample doctors data
const sampleDoctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", imageUrl: "https://storage.googleapis.com/yugaa-logo-files/user.png" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Neurology", imageUrl: "https://storage.googleapis.com/yugaa-logo-files/user.png" },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Oncology", imageUrl: "https://storage.googleapis.com/yugaa-logo-files/user.png" },
  { id: 4, name: "Dr. David Kim", specialty: "Endocrinology", imageUrl: "https://storage.googleapis.com/yugaa-logo-files/user.png" }
];

export function ClientPatientDashboard({ initialPatients }: { initialPatients: Patient[] }) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState(sampleDoctors[2]); // Default to Dr. Emily (index 2)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">ACO Admin Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!selectedPatient ? (
          <>
            {/* Doctors List */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sampleDoctors.map((doctor) => (
                    <Card 
                      key={doctor.id} 
                      className={`cursor-pointer transition-shadow ${selectedDoctor.id === doctor.id ? 'bg-blue-50 border-blue-300' : 'hover:shadow-md'}`}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={doctor.imageUrl}
                            alt={`${doctor.name}'s photo`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-md font-semibold">{doctor.name}</h3>
                            <p className="text-xs text-gray-500">{doctor.specialty}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Currently selected doctor */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Patients of {selectedDoctor.name}</h2>
              <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
            </div>

            {/* Patients List - Only show for Dr. Emily Rodriguez */}
            {selectedDoctor.id === 3 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {initialPatients.map((patient) => (
                  <Card 
                    key={patient.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {patient.imageUrl && (
                          <img
                            src={patient.imageUrl}
                            alt={`${patient.name}'s photo`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{patient.name}</h3>
                          <p className="text-sm text-gray-500">ID: {patient.id}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-gray-500 text-lg">No patients added yet</p>
                <p className="text-sm text-gray-400 mt-2">This doctor currently has no patients assigned</p>
              </Card>
            )}
          </>
        ) : (
          <>
            <button 
              onClick={() => setSelectedPatient(null)}
              className="mb-4 text-blue-600 hover:text-blue-800"
            >
              ← Back to Patient List
            </button>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Patient Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 pb-8">
                  <div className="col-span-1">
                    {selectedPatient.imageUrl && (
                      <img
                        src={selectedPatient.imageUrl}
                        alt={`${selectedPatient.name}'s photo`}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="mt-1 text-lg font-semibold">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="mt-1 text-lg font-semibold">{selectedPatient.age}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="mt-1 text-lg font-semibold">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Doctor</p>
                    <p className="mt-1 text-lg font-semibold">Dr. Emily Rodriguez</p>
                  </div>
                </div>
                <PatientAssessment patientId={selectedPatient.id} />
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}