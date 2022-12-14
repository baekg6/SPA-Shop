class Router {
    // routes
    // const router = new Router({
    //     "/": ProductPage,
    //     "/detail": ProductDetail,
    // });
    constructor(routes) {
        if (!routes) {
            console.error("Can not initialize routes, need routes!");
        }
        this.routes = routes;

        for (const key in routes) {
            const route = routes[key];
            if (key.indexOf(":") > -1) {
                const [_, routeName, param] = key.split("/");
                this.routes["/" + routeName] = route; // ProductDetail로 연결
                delete this.routes[key];
            }
        }

        // console.log(this.routes);
    }
    init(rootElementId) {
        if (!rootElementId) {
            console.error("Can not initialize Routes, not define rootElementId!");
            return null;
        }
        this.rootElementId = rootElementId;

        // 라우팅 되는 부분
        // about:blank 의 window.location.pathname은 blank
        // http://paullab.co.kr/abc 의 window.location.pathname은 /abc
        //routing 메소드는 주소를 파싱하고 주소에 해당하는 컴포넌트를 가져와서 렌더링을 진행한다.
        this.routing(window.location.pathname);

        window.addEventListener("click", (e) => {
            // 정확하게 a를 눌러야 이동 -> 가장 근접한 조상 중 a를 찾도록 설계
            // if (e.target.tagName.toLowerCase() === "a") {
            //     e.preventDefault();
            //     this.routePush(e.target.href); //url 변경
            // }
            if (e.target.closest("a")) {
                e.preventDefault();
                this.routePush(e.target.closest("a").href);
            }
        });

        window.onpopstate = () => this.routing(window.location.pathname); // 뒤로가기
    }

    routePush(pathname) {
        window.history.pushState({}, null, pathname);
        this.routing(window.location.pathname);
    }

    routing(pathname) {
        const [_, routeName, ...param] = pathname.split("/");

        let page = "";
        if (this.routes[pathname]) {
            const component = new this.routes[pathname]();
            page = component.render(); //컴포넌트(Product, Detail) 렌더링
        } else if (param) {
            const component = new this.routes["/" + routeName](param);
            page = component.render();
        }

        if (page) {
            this.render(page); //라우터 메소드
        }
    }

    render(page) {
        const rootElement = document.querySelector(this.rootElementId);
        rootElement.innerHTML = "";
        rootElement.appendChild(page);
    }
}

export default Router;
