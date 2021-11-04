import { KEYS } from '../Constantes/KEYS';
import { CMD } from '../Constantes/CMD';

export default class Params {
	
	public Cmd: CMD;

	public DataOfCmd: KEYS;
	
	public Option: boolean;
	
	public TypeOfRemote: string;
	
	constructor(Cmd: CMD, DataOfCmd: KEYS, Option: boolean, TypeOfRemote: string){
		this.Cmd = Cmd;
		this.DataOfCmd = DataOfCmd;
		this.Option = Option;
		this.TypeOfRemote = TypeOfRemote;
	}
	
}