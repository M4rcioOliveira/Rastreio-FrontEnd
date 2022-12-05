import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Track } from '../model/track';
import { Evento } from '../model/evento';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  public url: string = 'http://localhost:8080/track/evento/';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}


  //pegando o rastreio  a partir do código
  getTrackByCode(code:string): Observable<Evento[]> {
    return this.httpClient
      .get<Evento[]>(this.url+code)
      .pipe(retry(2), catchError(this.handleError));

  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor

      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
