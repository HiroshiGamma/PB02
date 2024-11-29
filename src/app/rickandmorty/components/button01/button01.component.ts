import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RickandmortyServiceService } from '../../rickandmorty-service.service';

@Component({
  selector: 'app-button01',
  imports: [HttpClientModule],
  providers: [RickandmortyServiceService],
  templateUrl: './button01.component.html',
  styleUrl: './button01.component.css'
})
export class Button01Component {


  private RickandmortyServiceService: RickandmortyServiceService = inject(RickandmortyServiceService);
  constructor(){}

  obtenerPersonajes(){
    this.RickandmortyServiceService.getAllCharacters().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }


}
