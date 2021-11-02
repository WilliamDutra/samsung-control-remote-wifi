import { KEYS } from '../Constantes/KEYS';

export default class Params {
	
	public Cmd: string;

	public DataOfCmd: KEYS;
	
	public Option: boolean;
	
	public TypeOfRemote: string;
	
	constructor(Cmd: string, DataOfCmd: KEYS, Option: boolean, TypeOfRemote: string){
		this.Cmd = Cmd;
		this.DataOfCmd = DataOfCmd;
		this.Option = Option;
		this.TypeOfRemote = TypeOfRemote;
	}
	
}