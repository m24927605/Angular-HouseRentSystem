import { Injectable } from '@angular/core';
import { DataAccessService } from '../../../../shared/services/collection';
import { Observable } from 'rxjs/Observable';
import { PayFlowVM } from './view-models/pay-flow-vm';
import { Page } from '../../../../shared/models/paged';
@Injectable()
export class PayFlowService {

  constructor(private dataAccessService: DataAccessService) { }

  getAllRentDetail(input, pageSize, currentPage): Observable<Page<PayFlowVM>> {
    return this.dataAccessService.getData(`/payFlow/${pageSize}/${currentPage}?RoomNo=${input}`);
  }
}
