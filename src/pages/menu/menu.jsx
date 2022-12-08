import "./menu.css";
import { useState, useEffect } from "react";
import { GetData, FilteredProducts } from "../../supports/contants/function";
import { Link } from "react-router-dom";

export default function Menu() {
	const [data, setData] = useState([]);
	const [category, setCategory] = useState([]);
	const [filter, setFilter] = useState([]);

	useEffect(() => {
		GetData(setData, setFilter, setCategory);
	}, []);

	return (
		<>
			<div className="flex pt-28">
				<div className="basis-1/6 flex flex-col">
					{category.map((value, index) => {
						return (
							<button
								onClick={() => FilteredProducts(data, index, setFilter)}
								className="my-3 mr-3"
								key={index}
							>
								{value}
							</button>
						);
					})}
				</div>
				<div className="basis-5/6 flex flex-wrap">
					{" "}
					{filter.map((value, index) => {
						return (
							<button
								key={index}
								className="basis-1/4 flex flex-col justify-center items-center mb-5"
							>
								<Link to={`/productdetails/${value.id}`}>
									<div>
										<img
											src={`${value.image}`}
											width={"200px"}
											className="rounded-full"
											alt="drinks"
										/>
									</div>
									<div>
										<p className="pt-3">{value.name}</p>
									</div>
								</Link>
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
}
