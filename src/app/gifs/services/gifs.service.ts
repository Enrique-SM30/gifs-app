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
  trendingGifsLoading = signal(true);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i+= 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({ gifs });
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

  getHistoryGifs( query: string ): Gif[]{
    return this.searchHistory()[query] ?? [];
  }

  saveToLocalStorage = effect(() =>
    localStorage.setItem('history', JSON.stringify(this.searchHistory()))
  );

}
