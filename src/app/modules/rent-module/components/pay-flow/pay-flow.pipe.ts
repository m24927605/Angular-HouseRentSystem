import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TVCostPipe' })
export class TVCostPipe implements PipeTransform {
    transform(value: number): string {
        console.log(value);
        let result: string = '';
        if (!value) {
            result = '未看有線電視'
        }
        else {
            result = `${value}`;
        }
        return result;
    }
}