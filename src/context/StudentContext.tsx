import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../services/api";

type Student = {
   id: string;
   name: string;
   surname: string;
   phoneNumber: string;
   email: string;
};

type CreateStudentRequest = Omit<Student, "id">;

type StudentHistoryItem = {
   assignmentHistoryId: string;
   bookId: string;
   bookTitle: string;
   bookAuthor: string;
   assignedDate: string;
   returnedDate: string | null;
};

type StudentDetail = {
   id: string;
   name: string;
   surname: string;
   phoneNumber: string;
   email: string;
   history: StudentHistoryItem[];
};

type UpdateStudentRequest = Student

type StudentContextType = {
   students: Student[];
   detailedStudent: StudentDetail | null;
   loading: boolean;
   error: string;
   getStudents: () => Promise<void>;
   addStudent: (student: Omit<Student, "id">) => Promise<void>;
   deleteStudent: (id: string) => Promise<void>;
   updateStudent: (student: UpdateStudentRequest) => Promise<void>;
   getStudentDetail: (id: string) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
   const [students, setStudents] = useState<Student[]>([]);

   const [detailedStudent, setDetailedStudent] = useState<StudentDetail | null>(null);

   const [loading, setLoading] = useState<boolean>(false);

   const [error, setError] = useState<string>("");

   const getStudents = async () => {
      setLoading(true);

      const response = await api.get<Student[]>("/student");

      if (response.status === 200) {
         setError("");
         setStudents(response.data);
      } else {
         setError("Öğrenciler alınamadı");
         setStudents([]);
      }

      setLoading(false);
   };

   const addStudent = async (student: CreateStudentRequest) => {
      setLoading(true);

      try {
         const response = await api.post<Student>("/student", student);

         if (response.status === 201 || response.status === 200) {
            setStudents((prevStudents) => [...prevStudents, response.data]);
            setError("");
         } else {
            setError("Öğrenci eklenemedi");
         }
      } catch (error: any) {
         setError(error.response?.data || "Öğrenci eklenemedi");
         throw error;
      } finally {
         setLoading(false);
      }
   };

   const deleteStudent = async (id: string) => {
      setLoading(true);
      const response = await api.delete(`/student/${id}`);

      if (response.status === 200 || response.status === 204) {
         setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
         setError("");
      } else {
         setError("Öğrenci silinemedi");
      }
      setLoading(false);
   }

   const updateStudent = async (student: UpdateStudentRequest) => {
      setLoading(true);
      const response = await api.put<Student>(`/student`, student);


      if (response.status === 200) {
         setStudents((prevStudents) =>
            prevStudents.map((s) => (s.id === student.id ? response.data : s))
         );
         setError("");
      } else {
         setError("Öğrenci güncellenemedi");
      }
      setLoading(false);
   }

   const getStudentDetail = async (id: string) => {
      setLoading(true);
      const response = await api.get<StudentDetail>(`/student/${id}`);

      if (response.status === 200) {
         setDetailedStudent(response.data);
         setError("");
      } else {
         setError("Öğrenci detayları alınamadı");
         setDetailedStudent(null);
      }
      setLoading(false);
   }

   const values: StudentContextType = {
      students,
      detailedStudent,
      loading,
      error,
      getStudents,
      addStudent,
      deleteStudent,
      updateStudent,
      getStudentDetail
   };

   useEffect(() => {
      const fetchInitialStudents = async () => {
         await getStudents();
      };

      fetchInitialStudents();

   }, []);

   return (
      <StudentContext.Provider value={values}>
         {children}
      </StudentContext.Provider>
   );


}

// eslint-disable-next-line react-refresh/only-export-components
export const useStudents = () => {
   const context = useContext(StudentContext);

   if (context === undefined) {
      throw new Error("useStudents must be used within a StudentProvider");
   }

   return context;
}