import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  standalone: true,
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
  imageUrl = input.required<string>();
}
