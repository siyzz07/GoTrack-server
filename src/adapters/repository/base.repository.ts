
import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../../domain/interface/Irepositroy/IBase.repository.js';

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

async findBy(filter: Partial<T>): Promise<T | null> {
  return this.model.findOne(filter);
}

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}