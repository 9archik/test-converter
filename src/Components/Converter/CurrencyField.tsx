import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, Select, TextField, styled } from '@mui/material';
import { useState, useImperativeHandle, forwardRef, FC } from 'react';
import { currencyOptions } from './options';
import styles from './style.module.css';
import { grey, orange } from '@mui/material/colors';
import { isCurrencySelect } from '../../TypeGuards/typeguards';

interface ICurrencyProps {
	activeCur: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onChangeCur: (value: string) => void;
}

const CustomSelect = styled(Select)(() => ({
	width: 300,
	'&.MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'black',
		},
		'&:hover fieldset': {
			borderColor: grey[600],
		},
		'&.Mui-focused fieldset': {
			borderColor: orange[900],
		},
	},
}));

const currencyOptionsArray = Object.values(currencyOptions);

const CurrencyField: FC<ICurrencyProps> = ({
	activeCur,
	value,
	setValue,
	onChange,
	onChangeCur,
}) => {
	const [openDropDown, setOpenDropDown] = useState<boolean>(false);

	function onChangeInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (event.target.value.length < value.length) {
			setValue(event.target.value === '' ? '0' : event.target.value);
			return;
		}

		if (event.target.value.slice(-1) === '0') {
			if (!event.target.value.match(/^00/) && !event.target.value.match(/^\d+\.\d{7}$/))
				setValue(event.target.value);
			return;
		}
		if (event.target.value.slice(-1) !== '.') {
			if (!event.target.value.match(/^\d+\.\d{7}$/)) {
				setValue(
					!isNaN(Number(event.target.value))
						? `${Math.round(Number(event.target.value) * 1000000) / 1000000}`
						: `${Math.round(Number(value) * 1000000) / 1000000}`,
				);
			}

			return;
		} else {
			setValue(value.match(/\./) ? value : event.target.value);
			return;
		}
	}

	return (
		<div className="flex items-center bg-neutral-800 rounded-2xl">
			<TextField
				className="w-2/3 rounded-xl h-full border-none border-b-0 outline-none"
				variant="standard"
				onKeyDown={(e) => {
					// if (
					// 	(e.keyCode < 48 || e.keyCode > 58 || e.key === '.') &&
					// 	e.keyCode !== 8 &&
					// 	e.key !== '.'
					// ) {
					// 	e.preventDefault();
					// }

					if (e.key === ',') {
						e.preventDefault();
					}
				}}
				onChange={(e) => {
					onChangeInput(e);
					onChange(e);
				}}
				value={value}
				inputProps={{
					className: 'rounded-xl text-slate-300',
					style: {
						border: 0,
					},
				}}
				autoComplete="off"
			/>
			<CustomSelect
				IconComponent={() => (
					<FontAwesomeIcon
						style={{ transform: openDropDown ? 'rotate(180deg)' : 'rotate(0deg)' }}
						className="mr-3 text-zinc-500"
						icon={faChevronUp}
					/>
				)}
				id={styles.select}
				className={`${styles.select} flex-grow w-1/3 my-2 mr-3 rounded-xl bg-neutral-900`}
				value={currencyOptions[activeCur]}
				onOpen={() => setOpenDropDown(true)}
				onClose={() => setOpenDropDown(false)}
				renderValue={(selected) => {
					if (isCurrencySelect(selected)) {
						return (
							<div className="flex  gap-3">
								<img src={selected.img} width={20} height={20} alt={''} />{' '}
								<span className={`text-white ${styles.activeValue}`}>{selected.value}</span>
							</div>
						);
					}
					return <></>;
				}}>
				{currencyOptionsArray.map((el, index) => {
					return (
						<MenuItem
							onClick={() => {
								onChangeCur(el.value);
							}}
							style={{ gap: 8 }}
							value={el.value}>
							<img className="mr-3" src={el.img} width={20} height={20} alt={el.value} />{' '}
							<span>{el.value}</span>
						</MenuItem>
					);
				})}
			</CustomSelect>
		</div>
	);
};

export default CurrencyField;
