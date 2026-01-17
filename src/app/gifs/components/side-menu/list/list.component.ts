import { Component, input } from '@angular/core';
import { ListItemComponent } from "../list-item/list-item.component";
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  standalone: true,
  templateUrl: './list.component.html',
  imports: [ListItemComponent]
})
export class ListComponent {
  gifs = input.required<Gif[]>();
}
