import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RickandmortyServiceService } from '../../rickandmorty-service.service';
import { ResponseAPICharacter, Result } from '../../interface/character';

@Component({
  selector: 'app-search-bar',
  imports: [HttpClientModule],
  providers: [RickandmortyServiceService],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<Result[]>();

  constructor(private rickandmortyService: RickandmortyServiceService) {}

  onSearch(searchTerm: string) {
    this.rickandmortyService.searchCharacters(searchTerm).subscribe({
      next: response => {
        console.log('Character data:', response);
        this.searchEvent.emit(response);
      },
      error: error => {
        console.error('There was an error!', error.message);
        if (error.status === 0) {
          console.error('Network error - please check your internet connection or CORS configuration.');
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
      }
    });
  }
}
