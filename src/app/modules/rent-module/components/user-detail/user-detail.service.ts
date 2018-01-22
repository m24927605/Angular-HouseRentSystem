import { Injectable } from '@angular/core';
import { DataAccessService } from '../../../../shared/services/collection';
import { Observable } from 'rxjs/Observable';
import { UserDetailVM } from './view-models/user-detail-vm';
import { Page } from '../../../../shared/models/paged';
@Injectable()
export class UserDetailService {

  constructor(private dataAccessService: DataAccessService) { }

  getOneUserDetail(UserID): Observable<UserDetailVM> {
    return this.dataAccessService.getData(`/UserDetail/${UserID}`);
  }

  getAllUserDetailNoPage(): Observable<Page<UserDetailVM>> {
    return this.dataAccessService.getData(`/userDetail`);
  }

  getAllUserDetail(input, pageSize, currentPage): Observable<Page<UserDetailVM>> {
    return this.dataAccessService.getData(`/userDetail/${pageSize}/${currentPage}?UserName=${input}`);
  }

  addUserDetail(data: UserDetailVM): Observable<UserDetailVM> {
    return this.dataAccessService.postData(data, '/userDetail');
  }

  editUserDetail(UserID,data:UserDetailVM):Observable<UserDetailVM>{
    return this.dataAccessService.patchData(data, `/userDetail/${UserID}`);
  }
}
