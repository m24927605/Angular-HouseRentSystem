import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'StatusPipe' })
export class StatusPipe implements PipeTransform {
    transform(value: number): string {
        if (value === 0) {
            return '已搬離'
        }
        return '入住中'
    }
}