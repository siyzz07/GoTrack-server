

export interface IBaseRepository<T> {
   findBy(filter: Partial<T>): Promise<T | null>; 
  findAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}