import { HttpClientModule } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickandmortyServiceService } from '../../rickandmorty-service.service';
import { ResponseAPICharacter, Result } from '../../interface/character';

@Component({
  selector: 'app-card',
  imports: [HttpClientModule, CommonModule],
  providers: [RickandmortyServiceService],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() characters: Result[] = [];
  
  private RickandmortyServiceService: RickandmortyServiceService = inject(RickandmortyServiceService);
  
  constructor() {}

  obtenerPersonajes() {
    this.RickandmortyServiceService.getAllCharacters().then((response: ResponseAPICharacter) => {
      this.characters = response.results;
      console.log(this.characters);
    }).catch((error) => {
      console.log(error);
    });
  }
}
