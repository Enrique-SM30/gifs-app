import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@Angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { ListComponent } from "../../components/side-menu/list/list.component";

@Component({
  selector: 'app-gif-history',
  standalone: true,
  templateUrl: './gif-history.component.html',
  imports: [ListComponent],
})
export default class GifHistoryComponent {

  gifsService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'] ?? 'No Query')
    )
  );

  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));
}
