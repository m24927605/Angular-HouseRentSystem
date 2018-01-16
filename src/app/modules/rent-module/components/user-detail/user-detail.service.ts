import { Injectable } from '@angular/core';
import { DataAccessService } from '../../../../shared/services/collection';
import { Observable } from 'rxjs/Observable';
import { UserDetailVM } from './view-models/user-detail-vm';
import { Page } from '../../../../shared/models/paged';
@Injectable()
export class UserDetailService {

  constructor(private dataAccessService: DataAccessService) { }

  getAllUserDetail(input, pageSize, currentPage): Observable<Page<UserDetailVM>> {
    return this.dataAccessService.getData(`/userDetail/${pageSize}/${currentPage}?UserName=${input}`);
  }
}
