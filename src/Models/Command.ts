import Params from './Params';

export default class Command {
	
	public method: string;
	
	public params: Params;
	
	constructor(Method: string, Cmd: string, DataOfCmd: string, Option: boolean, TypeOfRemote: string) {
		
		let parametros = new Params(Cmd, DataOfCmd, Option, TypeOfRemote);
			
		this.method = Method,
		this.params = parametros;
	}
	
}


