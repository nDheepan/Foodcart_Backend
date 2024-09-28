import { Injectable } from '@nestjs/common';
import { CreateDealerQueryDto } from '../../../dtos/create-dealer_query.dto';
import { UpdateDealerQueryDto } from '../../../dtos/update-dealer_query.dto';

@Injectable()
export class DealerQueriesService {
  create(createDealerQueryDto: CreateDealerQueryDto) {
    return 'This action adds a new dealerQuery';
  }

  findAll() {
    return `This action returns all dealerQueries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dealerQuery`;
  }

  update(id: number, updateDealerQueryDto: UpdateDealerQueryDto) {
    return `This action updates a #${id} dealerQuery`;
  }

  remove(id: number) {
    return `This action removes a #${id} dealerQuery`;
  }
}
