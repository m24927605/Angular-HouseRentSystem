import { Injectable } from '@angular/core';
import { DataAccessService } from '../../../../shared/services/collection';
import { Observable } from 'rxjs/Observable';
import { ManagerVM } from './view-models/manager-vm';
import { Page } from '../../../../shared/models/paged';
@Injectable()
export class ManagerService {

    constructor(private dataAccessService: DataAccessService) { }

    getOneManager(BackerID): Observable<ManagerVM> {
        return this.dataAccessService.getData(`/Manager/${BackerID}`);
    }

    getAllManagerNoPage(): Observable<Page<ManagerVM>> {
        return this.dataAccessService.getData(`/Manager`);
    }

    getAllManager(pageSize, currentPage): Observable<Page<ManagerVM>> {
        return this.dataAccessService.getData(`/Manager/${pageSize}/${currentPage}`);
    }

    addManager(data: ManagerVM): Observable<ManagerVM> {
        return this.dataAccessService.postData(data, '/Manager');
    }

    editManager(BackerID, data: ManagerVM): Observable<ManagerVM> {
        return this.dataAccessService.patchData(data, `/Manager/${BackerID}`);
    }
}
