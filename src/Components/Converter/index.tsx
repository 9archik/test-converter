import {
	Box,
	Button,
	ClassNameMap,
	InputLabel,
	Menu,
	MenuItem,
	Select,
	TextField,
	Theme,
	selectClasses,
} from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import makeStyles from '@material-ui/styles/makeStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CurrencyField from './CurrencyField';
import axios, { AxiosError } from 'axios';
import { currencyOptions } from './options';

interface IResponse {
	[key: string]: number;
}

const checkLocalStorageFromCur = () => {
	const ls = localStorage.getItem('fromCur');
	if (ls) return ls;
	return 'USDT';
};

const checkLocalStorageToCur = () => {
	const ls = localStorage.getItem('toCur');
	if (ls) return ls;
	return 'ETH';
};

const Converter = () => {
	const [fromCurrency, setFromCurrency] = useState<string>(
		currencyOptions[checkLocalStorageFromCur()] ? checkLocalStorageFromCur() : 'USDT',
	);
	const [toCurrency, setToCurrency] = useState<string>(
		currencyOptions[checkLocalStorageToCur()] ? checkLocalStorageToCur() : 'ETH',
	);
	const [fromValue, setFromValue] = useState<string>('0');
	const [toValue, setToValue] = useState<string>('0');

	function onChangeFrom(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		axios
			.get<IResponse>(
				`https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USDT,BTC,ETH&api_key=ce47e41736d8d982b63486e8fbf3894848071d358131084472e991c9e11a703`,
			)
			.then((response) => {
				setToValue(
					`${
						Math.round(
							((Number(event.target.value) * response.data[toCurrency]) /
								response.data[fromCurrency]) *
								1000000,
						) / 1000000
					}`,
				);
			})
			.catch((error: AxiosError) => console.log(error.code));
	}

	function onChangeCurFrom(value: string) {
		setFromCurrency(value);
		axios
			.get<IResponse>(
				`https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USDT,BTC,ETH&api_key=ce47e41736d8d982b63486e8fbf3894848071d358131084472e991c9e11a703`,
			)
			.then((response) => {
				setToValue(
					`${
						Math.round(
							((Number(fromValue) * response.data[toCurrency]) / response.data[value]) * 1000000,
						) / 1000000
					}`,
				);
			})
			.catch((error: AxiosError) => console.log(error.code));
	}

	function onChangeCurTo(value: string) {
		setToCurrency(value);

		axios
			.get<IResponse>(
				`https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USDT,BTC,ETH&api_key=ce47e41736d8d982b63486e8fbf3894848071d358131084472e991c9e11a703`,
			)
			.then((response) => {
				setToValue(
					`${
						Math.round(
							((Number(fromValue) * response.data[value]) / response.data[fromCurrency]) * 1000000,
						) / 1000000
					}`,
				);
			})
			.catch((error: AxiosError) => console.log(error.code));
	}

	function onChangeTo(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		axios
			.get<IResponse>(
				`https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USDT,BTC,ETH&api_key=ce47e41736d8d982b63486e8fbf3894848071d358131084472e991c9e11a703`,
			)
			.then((response) => {
				setFromValue(
					`${
						Math.round(
							((Number(event.target.value) * response.data[fromCurrency]) /
								response.data[toCurrency]) *
								1000000,
						) / 1000000
					}`,
				);
			})
			.catch((error: AxiosError) => console.log(error.code));
	}

	function swapCurrency() {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);

		axios
			.get<IResponse>(
				`https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USDT,BTC,ETH&api_key=ce47e41736d8d982b63486e8fbf3894848071d358131084472e991c9e11a703`,
			)
			.then((response) => {
				setToValue(
					`${
						Math.round(
							((Number(fromValue) * response.data[fromCurrency]) / response.data[toCurrency]) *
								1000000,
						) / 1000000
					}`,
				);
			})
			.catch((error: AxiosError) => console.log(error.code));
	}

	console.log('value', fromValue);

	useEffect(() => {
		localStorage.setItem('fromCur', fromCurrency);
		localStorage.setItem('toCur', toCurrency);
	}, [fromCurrency, toCurrency]);

	return (
		<div className={`w-full flex-auto flex items-center justify-center`}>
			<div className="w-full bg-neutral-950 rounded-3xl border-solid border-zinc-600 border-[1px] md:w-2/3">
				<div className="py-5 text-left border-b-2 border-zinc-600 border-solid border-t-0 border-l-0 border-r-0">
					<span className="ml-8 text-xl text-zinc-500 font-bold">Currency converter</span>
				</div>
				<div className="py-10 px-8">
					<CurrencyField
						value={fromValue}
						setValue={setFromValue}
						activeCur={fromCurrency}
						onChange={onChangeFrom}
						onChangeCur={onChangeCurFrom}
					/>
					<div className="w-full text-center sm:my-[-12px]">
						<Button
							style={{
								maxWidth: 48,
								maxHeight: 48,
								minWidth: 48,
								minHeight: 48,
								borderRadius: '50%',
							}}
							onClick={() => {
								swapCurrency();
							}}
							className="bg-neutral-900 border border-solid">
							<FontAwesomeIcon icon={faArrowsRotate} />
						</Button>
					</div>
					<CurrencyField
						value={toValue}
						setValue={setToValue}
						activeCur={toCurrency}
						onChange={onChangeTo}
						onChangeCur={onChangeCurTo}
					/>
				</div>
			</div>
		</div>
	);
};

export default Converter;
