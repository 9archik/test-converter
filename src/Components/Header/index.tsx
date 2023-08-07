import { FormControlLabel, Switch, Theme, createStyles, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styles from './style.module.css';
import { FC } from 'react';
import { grey, yellow } from '@mui/material/colors';
import { MaterialUISwitch } from '../../Theme/theme';



interface IHeaderProps {
	setTheme: React.Dispatch<React.SetStateAction<boolean>>;
	theme: boolean;
}

const Header: FC<IHeaderProps> = ({ setTheme, theme }) => {
	function swapTheme() {
		localStorage.setItem('theme', JSON.stringify(!theme));
		setTheme(!theme);
	}
	return (
		<div className={`py-5 flex justify-between items-center ${styles.logo}`}>
			<span className="text-3xl font-normal tracking-wider flex flex-row text-orange-600 sm:text-4xl">
				Converter
			</span>
			<FormControlLabel
				onChange={() => swapTheme()}
				checked={theme}
				label={''}
				style={{ margin: 0 }}
				control={<MaterialUISwitch />}
			/>
		</div>
	);
};

export default Header;
