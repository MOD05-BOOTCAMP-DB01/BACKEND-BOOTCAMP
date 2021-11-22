import { Injectable } from '@nestjs/common';

import { Objective } from 'src/objectives/objective.entity';

@Injectable()
export class YearsService {
  async findYear() {
    return Objective.find({
      select: ['year'],
    });
  }
}
