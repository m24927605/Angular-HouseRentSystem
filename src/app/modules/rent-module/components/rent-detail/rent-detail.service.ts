import { Injectable } from '@angular/core';
import { DataAccessService } from '../../../../shared/services/collection';
import { Observable } from 'rxjs/Observable';
import { RentDetailVM } from './view-models/rent-detail-vm';
import { Page } from '../../../../shared/models/paged';
@Injectable()
export class RentDetailService {

  constructor(private dataAccessService: DataAccessService) { }

  getOneRentDetail(RoomID): Observable<RentDetailVM> {
    return this.dataAccessService.getData(`/rentDetail/${RoomID}`);
  }

  getAllRentDetail(input, pageSize, currentPage): Observable<Page<RentDetailVM>> {
    return this.dataAccessService.getData(`/rentDetail/${pageSize}/${currentPage}?RoomNo=${input}`);
  }

  addRentDetail(data: RentDetailVM): Observable<RentDetailVM> {
    return this.dataAccessService.postData(data, '/rentDetail');
  }

  editRentDetail(RoomID, data: RentDetailVM): Observable<RentDetailVM> {
    return this.dataAccessService.patchData(data, `/rentDetail/${RoomID}`);
  }
}
