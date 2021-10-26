import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  constructor(private _gifsService: GifsService) { }

  get gifResults() {
    return this._gifsService.results;
  }

}
