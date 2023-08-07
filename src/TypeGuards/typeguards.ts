import { ICurrencySelect } from '../Components/Converter/interfaces';

export function isCurrencySelect(obj: any): obj is ICurrencySelect {
	return obj.img && obj.value;
}
