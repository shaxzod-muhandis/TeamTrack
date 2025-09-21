"use client";

import Link from "next/link";
import { Employee } from "@/app/types/employee";
import { deleteEmployee } from "@/app/lib/employees";

type Props = {
    employees: Employee[];
    onDeleted?: (id: string) => void;
};

export default function EmployeeTable({ employees, onDeleted }: Props) {
    const handleDelete = async (id: string) => {
        if (!confirm("Haqiqatan ham o‘chirmoqchimisiz?")) return;

        try {
            await deleteEmployee(id);
            onDeleted?.(id);
        } catch (err) {
            console.error("Delete error:", err);
            alert("O‘chirishda xatolik yuz berdi!");
        }
    };

    if (!employees.length) {
        return <p className="text-gray-500">Xodimlar hali qo‘shilmagan.</p>;
    }

    return (
        <div className="overflow-x-auto rounded-lg shadow mt-4">
            <table className="min-w-full border border-gray-200 bg-white">
                <thead>
                <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                    <th className="px-4 py-2 border">Ism</th>
                    <th className="px-4 py-2 border">Lavozim</th>
                    <th className="px-4 py-2 border">Ish vaqti</th>
                    <th className="px-4 py-2 border">Maosh turi</th>
                    <th className="px-4 py-2 border">Maosh</th>
                    <th className="px-4 py-2 border">Amallar</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((emp) => (
                    <tr key={emp.id} className="text-sm border-t">
                        <td className="px-4 py-2 border">{`${emp.first_name} ${emp.last_name}`}</td>
                        <td className="px-4 py-2 border">{emp.position}</td>
                        <td className="px-4 py-2 border">{emp.work_type}</td>
                        <td className="px-4 py-2 border">{emp.salary_type}</td>
                        <td className="px-4 py-2 border">{emp.salary}</td>
                        <td className="px-4 py-2 border space-x-2">
                            <Link
                                href={`/pages/employees/${emp.id}`}
                                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(emp.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
