import { Component, input } from '@angular/core';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'gif-list',
  standalone: true,
  templateUrl: './list.component.html',
  imports: [ListItemComponent]
})
export class ListComponent {
  gifs = input.required<string[]>();
}
