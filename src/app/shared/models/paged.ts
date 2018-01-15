export interface Page<T> {
    size: number;
    current: number;
    total: number;
    data: T[];
}