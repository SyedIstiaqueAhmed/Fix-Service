import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MechanicService } from './Services/Mechanicservices';
import { tblMechanic } from './Entity/Mechanic';
import { MechanicDTO } from './Dto/MechanicDto';


@Controller('mechanics')
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Get()
  async findAll(): Promise<tblMechanic[]> {
    return this.mechanicService.findAll();
  }

  // @Get('/:id')
  // async find(@Param('id') MechanicId: number): Promise<tblMechanic> {
  //   return this.mechanicService.find(MechanicId);
  // }
  @Post('/get/:id')
  async findName(@Param('id') MechanicId: number, @Body() mechanicDTO: MechanicDTO): Promise<tblMechanic> {
    console.log("id",mechanicDTO);
    return this.mechanicService.findName(MechanicId, mechanicDTO);
  }

  

  @Post('/create')
  async create(@Body() mechanicDTO: MechanicDTO): Promise<tblMechanic> {
    return this.mechanicService.create(mechanicDTO);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() mechanicDTO: MechanicDTO): Promise<void> {
    await this.mechanicService.update(id, mechanicDTO);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.mechanicService.delete(id);
  }
  @Post('/city')
    async findByCity(@Body() mechanicDTO: MechanicDTO): Promise<tblMechanic[]> {
        return this.mechanicService.findByCity(mechanicDTO);
        }
}
