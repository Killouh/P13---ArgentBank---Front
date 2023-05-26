import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Header from './components/header/header';
import Footer from './components/footer/footer'
import Home from './views/home/home';
import Login from './views/login/login';
import Profile from './views/profile/profile';
import { selectIsAuth } from './features/reducer/loginreducer';

//Verify if user is connected
function useIsAuthenticated() {
	const isAuth = useSelector(selectIsAuth);
	return isAuth === true;
}


function App() {
	const isAuthenticated = useIsAuthenticated();
	return (
		<div id="App">
			<BrowserRouter>
				<Header />

				<main className="main-container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/index" element={<Home />} />
						<Route path="/login" element={<Login />} />
						{isAuthenticated ? (
							<Route path="/profile" element={<Profile />} />
						) : (
							<Route path="/login" element={<Login />} />
						)}
						<Route path="*" element={<Home />} />
					</ Routes>
				</main>

				<Footer />
			</ BrowserRouter>
		</div>
	);
}

export default App;
