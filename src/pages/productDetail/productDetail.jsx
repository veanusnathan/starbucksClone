import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailProducts } from "../../supports/contants/function";

export default function ProductDetails() {
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState([]);
	let { id } = useParams();

	useEffect(() => {
		setData(DetailProducts());
		setFilter(
			data.filter((value) => {
				return value.id === id;
			})
		);
	}, []);
	return (
		<>
			{console.log(data)}
			<div className="w-screen bg-[#1F3933] pt-28 text-white flex">
				{filter.map((value, index) => {
					return (
						<>
							<div className="basis-1/2">
								<img src={`${value.image}`} alt="product" />
							</div>
							<div className="basis-1/2">
								<div>${value.name}</div>
								<div>${value.size?.calories}</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}
