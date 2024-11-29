import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this import
import { Button01Component } from '../../components/button01/button01.component';
import { CardComponent } from '../../components/card/card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { RickandmortyServiceService } from '../../rickandmorty-service.service';
import { ResponseAPICharacter, Result } from '../../interface/character';

@Component({
  selector: 'app-rickandmorty-home',
  imports: [CommonModule, FormsModule, Button01Component, CardComponent, SearchBarComponent], // Add FormsModule here
  providers: [RickandmortyServiceService],
  templateUrl: './rickandmorty-home.component.html',
  styleUrls: ['./rickandmorty-home.component.css']
})
export class RickandmortyHomeComponent implements OnInit {
  characters: Result[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchQuery: string = '';

  private RickandmortyServiceService: RickandmortyServiceService = inject(RickandmortyServiceService);

  ngOnInit() {
    this.obtenerPersonajes();
  }

  obtenerPersonajes() {
    this.RickandmortyServiceService.getAllCharacters(this.currentPage).then((response: ResponseAPICharacter) => {
      this.characters = response.results;
      this.totalPages = response.info.pages;
      console.log(this.characters);
    }).catch((error) => {
      console.log(error);
    });
  }

  searchCharacters() {
    if (this.searchQuery.trim() === '') {
      this.obtenerPersonajes();
    } else {
      this.RickandmortyServiceService.searchCharacters(this.searchQuery).subscribe((results: Result[]) => {
        this.characters = results;
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.obtenerPersonajes();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.obtenerPersonajes();
    }
  }
}
