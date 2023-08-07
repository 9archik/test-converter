import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Converter from './Components/Converter';
import { CssBaseline, OutlinedInput, Paper, ThemeProvider, createTheme } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { dark } from '@mui/material/styles/createPalette';
import { appTheme } from './Theme/theme';

function App() {
	const checkLocalStorageTheme = () => {
		const ls = localStorage.getItem('theme');
		if (ls === 'true') return true;
		return false;
	};

	const [theme, setTheme] = useState<boolean>(checkLocalStorageTheme());

	return (
		<ThemeProvider theme={appTheme(theme)}>
			<CssBaseline />
			<div className="max-w-7xl px-3 m-auto w-full h-full flex-col flex">
				<Header theme={theme} setTheme={setTheme} />
				<Converter />
			</div>
		</ThemeProvider>
	);
}

export default App;
