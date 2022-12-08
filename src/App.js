import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import Menu from "./pages/menu/menu";
import Register from "./pages/register/register";
import SignIn from "./pages/signin/signin";
import { useState, useEffect } from "react";
import axios from "axios";
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { auth } from "../src/firebase";
import ProductDetails from "./pages/productDetail/productDetail";

function App() {
	const [username, setUsername] = useState("");
	const [redirect, setRedirect] = useState(false);

	let OnLogin = async (inputEmail, inputPassword) => {
		// const err = { message: "Account Not Found" };
		try {
			let response = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
			// axios.get(
			// 	`http://localhost:5000/users?email=${inputEmail}&password=${inputPassword}`
			// );
			// if (response.data.length === 0) throw err;
			// localStorage.setItem("token", `${response.data[0].id}`);
			// setUsername(response.data[0].firstName);
			localStorage.setItem("tokenUID", `${response.user.uid}`);
			setUsername(response.user.email);
			setTimeout(() => {
				setRedirect(true);
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	const GLogin = async () => {
		const provider = new GoogleAuthProvider();
		try {
			let response = await signInWithPopup(auth, provider);
			localStorage.setItem("tokenUID", response.user.uid);
			setUsername(response.user.email);
		} catch (error) {
			console.log(error);
		}
	};

	let onLogout = () => {
		// localStorage.removeItem("token");
		// setRedirect(false);
		// setUsername("");
		localStorage.removeItem("tokenUID");
		localStorage.removeItem("token");
		signOut(auth);
		setRedirect(false);
		setUsername("");
	};
	async function checkIsLogin() {
		try {
			let getToken = localStorage.getItem("token");
			if (getToken) {
				let response = await axios.get(`https://my-json-server.typicode.com/veanusnathan/json-server-E-Commerce/users?id=${getToken}`);
				setUsername(response.data[0].username);
				setRedirect(true);
			}
		} catch (error) {}
	}

	useEffect(() => {
		checkIsLogin();
		if (localStorage.getItem("tokenUID")) {
			onAuthStateChanged(auth, (user) => {
				setUsername(user.email);
			});
		}
	}, []);

	return (
		<>
			<script src="../path/to/flowbite/dist/flowbite.js"></script>
			<Navbar data={{ username }} myFunc={{ onLogout, GLogin }} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignIn myFunc={{ OnLogin }} isRedirect={{ redirect }} />} />
				<Route path="/register" element={<Register isRedirect={{ redirect }} />} />
				<Route path="/menu" element={<Menu />} />
				<Route path="/productdetails/:id" element={<ProductDetails />} />
			</Routes>
		</>
	);
}

export default App;
