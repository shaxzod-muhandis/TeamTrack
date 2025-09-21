import { Employee } from "@/app/types/employee"
import {supabase} from "@/app/lib/storage";

export async function addEmployee(employee: Omit<Employee, "id" | "created_at">) {
    const { data, error } = await supabase
        .from("employees")
        .insert(employee)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function getEmployees(): Promise<Employee[]> {
    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) throw error
    return data ?? []
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single()

    if (error) throw error
    return data
}

export async function updateEmployee(id: string, employee: Omit<Employee, "id" | "created_at">) {
    const { data, error } = await supabase
        .from("employees")
        .update(employee)
        .eq("id", id)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function deleteEmployee(id: string) {
    const { error } = await supabase
        .from("employees")
        .delete()
        .eq("id", id)

    if (error) throw error
}
