export class PageableDTO<T>{
    public currentPage: number;
    public totalPages: number;
    public data:T;
}