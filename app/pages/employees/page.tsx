"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Employee } from "@/app/types/employee";
import { getEmployees } from "@/app/lib/employees";
import EmployeeTable from "@/app/components/EmployeeTable";

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Xodimlar ro‘yxati</h1>
                <Link
                    href="/pages/employees/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Yangi xodim qo‘shish
                </Link>
            </div>

            {loading ? (
                <p>Yuklanmoqda...</p>
            ) : (
                <EmployeeTable
                    employees={employees}
                    onDeleted={(id) => setEmployees((prev) => prev.filter((e) => e.id !== id))}
                />
            )}
        </div>
    );
}
