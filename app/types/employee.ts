export type WorkTimeType = "ODATIY" | "MAXSUS" | "ERKIN";
export type SalaryType = "Oylik" | "Soatlik" | "Kunlik";

export interface ScheduleDay {
    from: string;
    to: string;
}

export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    phone_primary: string;
    phone_secondary?: string | null;
    branch: string;
    position: string;
    work_type: WorkTimeType;
    salary_type: SalaryType;
    salary: number;
    bonus?: number;
    penalty?: number;
    schedule?: Record<string, ScheduleDay>;
    created_at: string;
}

export type Option = {
    value: string;
    label: string;
};
