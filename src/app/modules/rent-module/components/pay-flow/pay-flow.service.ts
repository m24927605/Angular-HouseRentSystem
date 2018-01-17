import { Injectable } from '@angular/core';
import { DataAccessService } from '../../../../shared/services/collection';
import { Observable } from 'rxjs/Observable';
import { PayFlowVM } from './view-models/pay-flow-vm';
import { Page } from '../../../../shared/models/paged';
@Injectable()
export class PayFlowService {

  constructor(private dataAccessService: DataAccessService) { }

  getAllPayFlow(searchType,input, pageSize, currentPage): Observable<Page<PayFlowVM>> {
    if(searchType && input){
      return this.dataAccessService.getData(`/payFlow/${pageSize}/${currentPage}?${searchType}=${input}`);
    }
    return this.dataAccessService.getData(`/payFlow/${pageSize}/${currentPage}`);  
  }
}
