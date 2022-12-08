import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const FilteredProducts = (paramData, idx, paramSetFilter) => {
	let filterProducts = paramData.filter((value) => {
		return value.category === idx;
	});
	paramSetFilter(filterProducts);
};

export const DetailProducts = async () => {
	try {
		let response = await axios.get(
			"https://my-json-server.typicode.com/veanusnathan/json-server-E-Commerce/products"
		);
		return response.data;
	} catch (error) {}
};

export const GetData = async (paramSetData, paramSetFilter, paramSetCategory) => {
	try {
		let response = await axios.get(
			"https://my-json-server.typicode.com/veanusnathan/json-server-E-Commerce/products"
		);
		let resCategory = await axios.get(
			"https://my-json-server.typicode.com/veanusnathan/json-server-E-Commerce/categories"
		);

		let filterProducts = response.data.filter((value) => {
			return value.category === 0;
		});

		paramSetData(response.data);
		paramSetFilter(filterProducts);
		paramSetCategory(resCategory.data);
	} catch (error) {}
};

export const onSubmit = async (
	paramFirstName,
	paramSetFirstName,
	paramLastName,
	paramSetLastName,
	paramEmail,
	paramSetEmail,
	paramPassword,
	paramSetPassword,
	paramSetErrMsg,
	paramSetDisabledButton
) => {
	const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
	try {
		paramSetDisabledButton(true);
		// let checkEmail = await axios.get(`http://localhost:5000/users?email=${paramEmail}`);
		// let errEmail = { message: "Email already exist" };
		let errPassMin = { message: "Password must have atleast 8 characters" };
		let errPassNaN = { message: "Password must contain atleast a number" };
		let errEmailAt = { message: "Invalid Email" };

		// if (checkEmail.data.length !== 0) {
		// 	throw errEmail;
		// } else
		if (!paramEmail.includes("@")) {
			throw errEmailAt;
		} else if (paramPassword.length < 8) {
			throw errPassMin;
		} else if (!regex.test(paramPassword)) {
			throw errPassNaN;
		} else {
			// await axios.post("http://localhost:5000/users", {
			// 	paramFirstName,
			// 	paramLastName,
			// 	paramEmail,
			// 	paramPassword,
			// });
			await createUserWithEmailAndPassword(auth, paramEmail, paramPassword);

			paramSetFirstName("");
			paramSetLastName("");
			paramSetEmail("");
			paramSetPassword("");
			paramSetErrMsg("");
		}
	} catch (error) {
		paramSetErrMsg(error.message);
	} finally {
		paramSetDisabledButton(false);
	}
};
