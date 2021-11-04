import Params from './Params';
import { KEYS } from '../Constantes/KEYS';
import { CMD } from '../Constantes/CMD';

export default class Command {
	
	public method: string;
	
	public params: Params;
	
	constructor(Method: string, Cmd: CMD, DataOfCmd: KEYS, Option: boolean, TypeOfRemote: string) {
		
		let parametros = new Params(Cmd, DataOfCmd, Option, TypeOfRemote);
			
		this.method = Method,
		this.params = parametros;
	}
	
}


