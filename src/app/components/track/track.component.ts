import { Evento } from '../../model/evento';
import { Track } from './../../model/track';
import { TrackService } from './../../service/trackservice';
import { Component, OnInit } from '@angular/core';
import { TrackResult } from 'src/app/model/track-result';
import * as $ from 'jquery';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent implements OnInit {
  public code: string = '';

  public exibirHistoricoRecente: boolean = false;

  public exibirHistoricoCompleto: boolean = false;

  public exibirStatusNaoAchado: boolean = false;

  public exibirLoading: boolean = false;

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {}

  public eventTrackResult: Array<Evento> = [];
  public tamanho: number = 0;

  public funcExibirHistoricoCompleto(): void {
    this.exibirHistoricoRecente = false;
    this.exibirHistoricoCompleto = true;
  }

  public funcExibirHistoricoRecente(): void {
    this.exibirHistoricoRecente = true;
    this.exibirHistoricoCompleto = false;
  }

  public getTrackByCode(): void {
    if (this.code.length == 13) {
      this.exibirLoading = true;
      this.trackService.getTrackByCode(this.code).subscribe({
        next: (result) => {
          if (result.length == 0) {
            this.exibirHistoricoRecente = false;
            this.exibirHistoricoCompleto = false;
            this.exibirLoading = false;
            this.exibirStatusNaoAchado = true;
            this.code = '';
          } else {
            this.exibirStatusNaoAchado = false;
            this.exibirLoading = false;
            this.eventTrackResult = result;
            this.exibirHistoricoRecente = true;
            this.code = '';
          }
        },

        error: (error) => {
          this.exibirHistoricoRecente = false;
          this.exibirHistoricoCompleto = false;
          this.exibirLoading = false;
          this.exibirStatusNaoAchado = true;
          this.code = '';
        },
      });
    } else {
      this.exibirHistoricoRecente = false;
      this.exibirHistoricoCompleto = false;
      this.exibirStatusNaoAchado = false;
    }
  }
}
