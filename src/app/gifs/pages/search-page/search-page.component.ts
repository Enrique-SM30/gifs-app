import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/side-menu/list/list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent
],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string){
    this.gifsService.searchGifs(query).subscribe( (resp) => {
        this.gifs.set(resp);
      });;
  }

}
