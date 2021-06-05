import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import Movies from "./components/Movies"
import SingleMovieComponent from "./components/SingleMovieComponent"
import SearchComponent from "./components/SearchComponent"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faHeart, faUsers, faSearch, faStar } from "@fortawesome/free-solid-svg-icons"

library.add(faHeart, faUsers, faSearch, faStar)

function App() {
	return (
		<div>
			<SearchComponent />

			<Router>
				<Switch>
					<Route path="/" exact>
						<Movies />
					</Route>
				</Switch>
				<Switch>
					<Route path={"/movie/:id"}>
						<SingleMovieComponent />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
