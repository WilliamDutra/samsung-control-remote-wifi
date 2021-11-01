import Params from './Params';

export default class Command {
	
	public Method: string;
	
	public Params: Params;
	
	constructor(Method: string, Cmd: string, DataOfCmd: string, Option: boolean, TypeOfRemote: string) {
		
		let parametros = new Params(Cmd, DataOfCmd, Option, TypeOfRemote);
			
		this.Method = Method,
		this.Params = parametros;
	}
	
}


