import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from './components/header/header';
import Footer from './components/footer/footer'
import Home from './views/home/home';
import Login from './views/login/login';
import Profile from './views/profile/profile';
// import RouteProtector from './utils/route_protector';

//Rendre profile inacessible si non connecté

function App() {
  return (
		<div id="App">
			<BrowserRouter>
				<Header />
				
				<main className="main-container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/index" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						{/* <Route element={<RouteProtector />} >
							<Route path="/profile" element={<Profile />} />
						</ Route> */}
						<Route path="*" element={<Home />} />
					</ Routes>
				</main>

				<Footer />
			</ BrowserRouter>
		</div>
  );
}

export default App;
