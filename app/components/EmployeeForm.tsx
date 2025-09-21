"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import {Employee, Option} from "@/app/types/employee";

const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });

type EmployeeFormProps = {
    defaultValues?: Partial<Employee>;
    onSubmit: (data: Omit<Employee, "id">) => void;
};

const branches = [
    { value: "Toshkent", label: "Toshkent" },
    { value: "Samarqand", label: "Samarqand" },
    { value: "Buxoro", label: "Buxoro" },
];

const positions = [
    { value: "Developer", label: "Developer" },
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "DevOps", label: "DevOps" },
    { value: "Designer", label: "Designer" },
];

const workTypes = ["ODATIY", "MAXSUS", "ERKIN"];
const salaryTypes = ["Soatlik", "Kunlik", "Oylik"];
const weekDays = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

export default function EmployeeForm({ defaultValues, onSubmit }: EmployeeFormProps) {
    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<Omit<Employee, "id">>({
        defaultValues: {
            first_name: "",
            last_name: "",
            phone_primary: "",
            phone_secondary: "",
            branch: "",
            position: "",
            work_type: "ODATIY",
            salary_type: "Oylik",
            salary: 0,
            bonus: 0,
            penalty: 0,
            schedule: weekDays.reduce((acc, day) => ({ ...acc, [day]: { from: "08:00", to: "18:00" } }), {}),
            ...defaultValues,
        },
    });

    const workType = watch("work_type");

    useEffect(() => {
        if (workType === "ERKIN") setValue("salary_type", "Soatlik");
        else if (watch("salary_type") === "Soatlik") setValue("salary_type", "Oylik");
    }, [workType, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center">Xodim ma’lumotlari</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Ism</label>
                    <input {...register("first_name", { required: "Ism kiritish shart" })} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Masalan: Ali" />
                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Familiya</label>
                    <input {...register("last_name", { required: "Familiya kiritish shart" })} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Masalan: Valiyev" />
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Telefon</label>
                    <input {...register("phone_primary", { required: "Telefon kiritish shart" })} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="+998901234567" />
                    {errors.phone_primary && <p className="text-red-500 text-xs mt-1">{errors.phone_primary.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Qo‘shimcha telefon</label>
                    <input {...register("phone_secondary")} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="+998901234567" />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Filial</label>
                <Controller
                    control={control}
                    name="branch"
                    rules={{ required: "Filial tanlash shart" }}
                    render={({ field }) => (
                        <CreatableSelect<Option, false>
                            {...field}
                            options={branches}
                            onChange={(val) => field.onChange(val ? val.value : "")}
                            value={field.value ? { value: field.value, label: field.value } : null}
                        />
                    )}
                />
                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Lavozim</label>
                <Controller
                    control={control}
                    name="position"
                    rules={{ required: "Lavozim tanlash shart" }}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            options={positions}
                            onChange={(val) => field.onChange(val?.value)}
                            value={field.value ? { value: field.value, label: field.value } : null}
                        />
                    )}
                />
                {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Ish vaqti turi</label>
                <div className="flex gap-4 mt-1">
                    {workTypes.map(type => (
                        <label key={type} className="flex items-center gap-1">
                            <input type="radio" value={type} {...register("work_type")} />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Maosh turi</label>
                <select {...register("salary_type")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black">
                    {salaryTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Maosh</label>
                    <input type="number" {...register("salary", { required: "Maosh kiritish shart" })} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                    {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Bonus</label>
                    <input type="number" {...register("bonus")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Jarima</label>
                    <input type="number" {...register("penalty")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="mb-1 text-sm font-medium">Hafta jadvali</label>
                {weekDays.map(day => (
                    <div key={day} className="flex items-center gap-2">
                        <span className="capitalize w-24">{day}</span>
                        <input type="time" {...register(`schedule.${day}.from` as const)} className="rounded-lg border border-gray-300 px-2 py-1" />
                        <span>-</span>
                        <input type="time" {...register(`schedule.${day}.to` as const)} className="rounded-lg border border-gray-300 px-2 py-1" />
                    </div>
                ))}
            </div>

            <button type="submit" className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 transition">
                Saqlash
            </button>
        </form>
    );
}
