import People from "../components/People";
import Header from "../components/Header";
import LeftBar from "../components/LeftBar";
import Background from "../components/Background";
import MainContent from "../components/MainContent";

export const Home = () => {

	return (
		<div className="text-center">
			<Background />
			<Header />
			<LeftBar />
			<MainContent />
		</div>
	);
}; 