"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EmployeeForm from "@/app/components/EmployeeForm";
import { Employee } from "@/app/types/employee";
import { getEmployeeById, updateEmployee } from "@/app/lib/employees";

export default function EditEmployeePage() {
    const params = useParams();
    const rawId = params?.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        getEmployeeById(id)
            .then(setEmployee)
            .catch(() => setEmployee(null))
            .finally(() => setLoading(false));
    }, [id]);


    const handleUpdate = async (formData: Omit<Employee, "id" | "created_at">) => {
        if (!id) return;

        try {
            await updateEmployee(id, formData);
            router.push("/pages/employees");
        } catch (err) {
            console.error(err);
            alert("Yangilashda xatolik");
        }
    };


    if (loading) return <p className="p-6">Yuklanmoqda...</p>;
    if (!employee) return <p className="p-6">Xodim topilmadi</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Xodimni tahrirlash</h1>
            <EmployeeForm defaultValues={employee} onSubmit={handleUpdate} />
        </div>
    );
}
