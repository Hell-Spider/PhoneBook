import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from './contact';
import { from } from 'rxjs';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(contacts: Contact[], searchterm: string):Contact[] {

    if(!contacts || !searchterm) return contacts;
    return contacts.filter( contact => contact.lname.toLowerCase().indexOf(searchterm.toLowerCase()) !== -1);
  }
}
