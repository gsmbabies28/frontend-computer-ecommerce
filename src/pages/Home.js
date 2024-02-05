import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
// import FeaturedProducts from '../components/FeaturedProducts';

export default function Home(){

	const data = {
			title: "Computer E-commerce",
			content: "Shop your computer accessories here!",
			destination: "/products",
			label: "Shop Now"
		}

	return (
			<div className='home'>
				<div className='d-flex flex-column'>
					<Banner error={data} />
					{/*<FeaturedProducts />*/}
					<div className="mt-5 p-2">
						<Highlights  />
					</div>
				</div>
			</div>
		)
}