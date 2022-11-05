import { ProductPage, ProductDetail } from "./pages/index.js";
import { Router } from "./utils/index.js";

export default class App {
    constructor(props) {
        this.props = props;
    }
    async setup() {
        const { el } = this.props; //구조 분해 할당(#root)

        const router = new Router({
            "/": ProductPage,
            // "/detail": ProductDetail,
            "/detail/:id": ProductDetail,
        });
        router.init(el);
    }
}
