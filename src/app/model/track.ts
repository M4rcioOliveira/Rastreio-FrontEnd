import { Evento } from "./evento";

export interface Track {

  codigo:string;
  host:string;
	time:string;
	quantidade:string;
	eventos:Evento[];
  servico:string;
	ultimo:string;

}
