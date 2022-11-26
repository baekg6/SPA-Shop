import Component from '../../core/Component.js';

class ProductLikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.checkLikeList(),
        };
    }

    checkLikeList() {
        if (!localStorage.getItem('likeList')) {
            localStorage.setItem('likeList', JSON.stringify([]));
        }
        const likeList = JSON.parse(localStorage.getItem('likeList'));
        return likeList.includes(this.props.productId);
    }

    changeLike() {
        const likeList = JSON.parse(localStorage.getItem('likeList'));
        if (this.checkLikeList()) {
            //좋아요 취소
            const newLikeList = likeList.filter((id) => id !== this.props.productId);
            localStorage.setItem('likeList', JSON.stringify(newLikeList));
        } else {
            //좋아요 추가
            likeList.push(this.props.productId);
            localStorage.setItem('likeList', JSON.stringify(likeList));
        }
        this.setState({ like: this.checkLikeList() });
    }

    // state가 바뀔 때 리렌더링이 필요
    setState(newState) {
        this.state = newState;
        const rendered = this.render();
        this.lastRendered.replaceWith(rendered);
        this.lastRendered = rendered;
    }

    render() {
        const likeButton = document.createElement('button');
        likeButton.setAttribute('class', 'like-btn');
        this.state.like && likeButton.classList.add('on');

        const likeButtonIr = document.createElement('span');
        likeButtonIr.setAttribute('class', 'ir');
        likeButtonIr.textContent = '좋아요 버튼';

        likeButton.appendChild(likeButtonIr);
        likeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.changeLike();
        });
        return likeButton;
    }

    initialize() {
        // 컴포넌트가 초기화될 때, 렌더된 값을 저장
        const rendered = this.render();
        this.lastRendered = rendered;

        return this.lastRendered;
    }
}

export default ProductLikeButton;
