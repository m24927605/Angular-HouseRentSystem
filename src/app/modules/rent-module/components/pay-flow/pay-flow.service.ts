import { Injectable } from '@angular/core';
import { DataAccessService } from '../../../../shared/services/collection';
import { Observable } from 'rxjs/Observable';
import { PayFlowVM } from './view-models/pay-flow-vm';
import { Page } from '../../../../shared/models/paged';
import { addPayFlowVM } from './view-models/pay-flow-add-vm';
@Injectable()
export class PayFlowService {

  constructor(private dataAccessService: DataAccessService) { }

  getAllPayFlow(pageSize, currentPage, searchType, input): Observable<Page<PayFlowVM>> {
    if (searchType && input) {
      return this.dataAccessService.getData(`/payFlow/${pageSize}/${currentPage}?${searchType}=${input}`);
    }
    return this.dataAccessService.getData(`/payFlow/${pageSize}/${currentPage}`);
  }

  getAllPayFlowNoPage(UserID): Observable<PayFlowVM[]> {
    return this.dataAccessService.getData(`/payFlow/NoPage?UserID=${UserID}`);
  }

  addPayFlow(data: addPayFlowVM): Observable<PayFlowVM> {
    return this.dataAccessService.postData(data, '/payflow');
  }

  updatePayFlow(data: any, ID: number): Observable<PayFlowVM> {
    return this.dataAccessService.patchData(data, `/PayFlow/pay/${ID}`);
  }
}
