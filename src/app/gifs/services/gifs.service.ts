import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchGifsResponse, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _baseURL = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'JAJT42P3eRVSa05FobGt2ybmbmP4nskM';
  private _history: string[] = [];
  private _lastTermSearch: string = '';

  public results: Gif[] = [];

  constructor(private _http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this._lastTermSearch = localStorage.getItem('last_term')! || '';

    if (this._history.length > 0) {
      this.searchGifs(this._history[0]);
    }
  }

  get searchHistory() {
    return [...this._history];
  }

  get lastTermSearch() {
    return this._lastTermSearch;
  }

  searchGifs(query: string = '') {

    query = query.trim().toLowerCase();

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', query)
      .set('limit', '10');

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    this._http.get<SearchGifsResponse>(`${this._baseURL}/search`, { params })
      .subscribe(resp => this.results = resp.data);

    this._lastTermSearch = query;
    localStorage.setItem('last_term', this._lastTermSearch);

  }

}
