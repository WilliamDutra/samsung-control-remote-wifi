import Params from './Params';
import Data from './Data';
import { KEYS } from '../Constantes/KEYS';
import { CMD } from '../Constantes/CMD';

export default class Command {
	
	public method: string;
	
	public params: Params;
	
	constructor(Method: string, Cmd?: CMD, DataOfCmd?: KEYS, Option?: boolean, TypeOfRemote?: string, Data?: Data, Event?: string, To?: string) {
		
		let parametros = new Params(Cmd, DataOfCmd, Option, TypeOfRemote, Data, Event, To);
			
		this.method = Method,
		this.params = parametros;
	}
	
}


