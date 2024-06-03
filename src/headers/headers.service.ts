import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Header } from './entities/header.entity'
import { Repository } from 'typeorm';
import { CreateHeaderItemDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';

@Injectable()
export class HeadersService {
  constructor(
    @InjectRepository(Header)
    private headersRepository: Repository<Header>,
  ) {}

  async create(itemsData: CreateHeaderItemDto) : Promise<Header> {
    const items = this.headersRepository.create(itemsData);
    return await this.headersRepository.save(items);
  }

  async findAll() : Promise<Header[]> {
    const items = await this.headersRepository.find()
    return items
  }

  async findOne(id: number) : Promise<Header> {
    const item = await this.headersRepository.findOne({ where: { id } })
    return item
  }

  async update(id: number, updateHeaderDto: UpdateHeaderDto) : Promise<Header> {
    await this.headersRepository.update(id, updateHeaderDto)
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.headersRepository.delete(id);
    return;
  }
}
