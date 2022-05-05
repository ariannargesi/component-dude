import ReactDOM from "react-dom"
import "./styles.sass"
import App from "./App"
import store from "./redux"
import "antd/dist/antd.min.css"
import { Provider } from "react-redux"
import { HashRouter, Route, Routes } from "react-router-dom"
import Export from "./component/Export"
const root = document.getElementById("root")

const Main = () => {
 
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/export" element={<Export />} />
                </Routes>
            </HashRouter>
        </Provider>
    )
}

ReactDOM.render(<Main />, root)
