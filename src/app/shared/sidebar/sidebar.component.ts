import { Component } from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private _gifsService: GifsService) {
    this.lastTermSearch;
  }

  get lastTermSearch() {
    return this._gifsService.lastTermSearch;
  }

  get searchHistory() {
    return this._gifsService.searchHistory;
  }

  reSearchGifs(query: string) {
    this._gifsService.searchGifs(query);
  }

}
