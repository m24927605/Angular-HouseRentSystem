import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'RolePipe' })
export class RolePipe implements PipeTransform {
    transform(value: number): string {
        let result: string = '';
        switch (value) {
            case 1: {
                result = '最高權限管理員';
                break;
            }
            case 2: {
                result = '僅能查看';
                break;
            }
            default: {
                result = '未知角色';
                break;
            }
        }
        return result;
    }
}