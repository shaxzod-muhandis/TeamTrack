import { supabase } from "@/app/lib/storage";
import { Employee } from "@/app/types/employee";

export const getEmployees = async (): Promise<Employee[]> => {
    const { data, error } = await supabase.from("employees").select("*");
    if (error) throw error;
    return data as Employee[];
};

export const addEmployee = async (employee: Omit<Employee, "id">) => {
    const { data, error } = await supabase
        .from("employees")
        .insert(employee)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data as Employee;
};

export const updateEmployee = async (id: string, employee: Partial<Employee>) => {
    const { data, error } = await supabase
        .from("employees")
        .update(employee)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const deleteEmployee = async (id: string) => {
    const { error } = await supabase.from("employees").delete().eq("id", id);
    if (error) throw error;
};
