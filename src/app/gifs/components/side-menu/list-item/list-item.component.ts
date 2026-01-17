import { Component, input } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-list-item',
  standalone: true,
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
  imageUrl = input.required<string>();
}
