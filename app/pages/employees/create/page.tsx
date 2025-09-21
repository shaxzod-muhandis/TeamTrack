"use client";

import { useRouter } from "next/navigation";
import { addEmployee } from "@/app/lib/employees";
import EmployeeForm from "@/app/components/EmployeeForm";
import { Employee } from "@/app/types/employee";

export default function CreateEmployeePage() {
    const router = useRouter();

    const handleSubmit = async (data: Omit<Employee, "id" | "created_at">) => {
        try {
            await addEmployee(data);
            router.push("/pages/employees");
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Xodim qo‘shishda xatolik bo‘ldi!");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Yangi xodim qo‘shish</h1>
            <EmployeeForm onSubmit={handleSubmit} />
        </div>
    );
}
