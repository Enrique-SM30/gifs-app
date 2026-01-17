import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { Observable, map, tap } from 'rxjs';

const loadFromLocalStorage = () => {

  const history = localStorage.getItem('history');

  return history ? JSON.parse(history) : {};
}


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    return this.groupGifs(this.trendingGifs());
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    if( this.trendingGifsLoading() ) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update(currentGifs =>[
        ...currentGifs,
        ...gifs,
      ]);
      this.trendingPage.update(pagina => pagina + 1);
      console.log(this.trendingPage());
      this.trendingGifsLoading.set(false);
    });

  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map( ({ data }) => data),
      map( (items) => GifMapper.mapGiphyItemsToGifArray(items)),

      tap(items => {
        this.searchHistory.update( history => ({
          ...history,
          [query.toLowerCase()]: items
        }))

      })
    );
  }

  getHistoryGifs( query: string ): Gif[][] {
    const gifsHistory = this.searchHistory()[query] ?? [];
    return this.groupGifs(gifsHistory);
  }

  private groupGifs(gifs: Gif[]) {
    const groups = [];

    for (let i = 0; i < gifs.length; i+= 3) {
      groups.push(gifs.slice(i, i + 3));
    }
    return groups;
  }

  saveToLocalStorage = effect(() =>
    localStorage.setItem('history', JSON.stringify(this.searchHistory()))
  );

}
