class Component {
    constructor(props) {
        // 하나의 객체를 받는다
        this.props = props;
    }

    render() {
        // rende의 구현이 비어있는 경우 오류 처리가 가능하다
        // throw new Error("render가 비어있습니다!");
    }
}

export default Component;
