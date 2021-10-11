import { Pipe, PipeTransform } from '@angular/core';
import { Speaker } from './interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(speakers: Speaker[], search = ''): Speaker[] {
    if (!search.trim()) {
      return speakers;
    }
    return speakers.filter((speaker) => {
      return speaker.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
