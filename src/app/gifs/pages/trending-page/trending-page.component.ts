import { Component, computed, inject } from '@angular/core';
import { ListComponent } from "../../components/side-menu/list/list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [
    ListComponent
],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {

  gifsService = inject(GifsService);
 }
