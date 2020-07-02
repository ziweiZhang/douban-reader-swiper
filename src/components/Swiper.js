import React from 'react';
import './Swiper.scss';
class Swiper extends React.Component {
    constructor() {
        super();
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.changeButtons = this.changeButtons.bind(this);
        this.state = {
            pageSize: 1,
            page: 1,
            showButtons: true,
            animate: false,
        };
    }
    componentDidMount() {
        this.initState();
        window.onresize = this.resize.bind(this);
    }
    componentDidUpdate(prevProps) {
        // 更新，渲染
        if (prevProps.children.length !== this.props.children.length) {
            this.initState();
        }
    }
    componentWillUnmount() {
        window.onresize = null;
    }
    render() {
        return (
            <div className={`widget-swiper ${this.state.showButtons ? 'show' : ''}`}
                ref="swiper">
                <div className="swiper-prev">
                    <button className="btn-prev" disabled={this.prevDisabled()} onClick={this.prev}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 11" width="7" height="14"><path fill={this.getArrowColor('prev')} d="M4.894 10.986l1.1-.92-4.096-4.573L5.993.92 4.893 0 0 5.473l4.894 5.513z"></path></svg>
                    </button>
                </div>
                <div className="swiper-next">
                    <button className="btn-next" disabled={this.nextDisabled()} onClick={this.next}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 11" width="7" height="14" style={{transform: 'scaleX(-1)'}}><path fill={this.getArrowColor('next')} d="M4.894 10.986l1.1-.92-4.096-4.573L5.993.92 4.893 0 0 5.473l4.894 5.513z"></path></svg>
                    </button>
                </div>
                <div className="widget-swiper-inner">
                    {this.props.children.map((item, index) => (
                        <div className={`widget-swiper-item ${this.state.animate ? 'animate' : ''}`} key={index} ref={`item_${index + 1}`}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    /**
     * 初始化状态
     */
    initState() {
        this.setState({
            pageSize: this.props.children.length,
            page: 1,
            showButtons: this.props.options.defaultShowButtons,
            animate: false,
        });
        // 渲染子元素
        setTimeout(() => {
            this.initItems();
        }, 0);
    }
    /**
     * 初始化子元素
     */
    initItems() {
        this.swiperWidth = this.refs.swiper.clientWidth;
        let { pageSize } = this.state;
        // 设置子元素的位置
        this.refs['item_1'].style.left = 0;
        if (pageSize > 1) {
            for (let i = 2; i <= pageSize; i++) {
                this.refs[`item_${i}`].style.left = `${this.swiperWidth}px`;
            }
        }
        setTimeout(() => {
            this.setState({
                ...this.state,
                // 渲染完子元素后再加上过渡效果
                animate: true,
            });
        }, 100);
    }
    /**
     * 上一组
     */
    prev() {
        let currentPage = this.state.page,
        page = currentPage - 1;
        this.setState({
            ...this.state,
            page,
        });
        this.refs[`item_${page}`].style.left = 0;
        this.refs[`item_${currentPage}`].style.left = this.swiperWidth + 'px';
    }
    /**
     * 下一组
     */
    next() {
        let currentPage = this.state.page,
            page = currentPage + 1;
        this.setState({
            ...this.state,
            page,
        });
        this.refs[`item_${page}`].style.left = 0;
        this.refs[`item_${currentPage}`].style.left = -1 * this.swiperWidth + 'px';
    }
    /**
     * 上一组按钮禁止点击
     */
    prevDisabled() {
        return this.state.page > 1 ? '' : 'disabled';
    }
    /**
     * 下一组按钮禁止点击
     */
    nextDisabled() {
        return this.state.pageSize > this.state.page ? '' : 'disabled';
    }
    /**
     * 按钮显示隐藏
     */
    changeButtons(show) {
        if (this.state.showButtons !== show) {
            this.setState({
                ...this.state,
                showButtons: show
            });
        }
    }
    /**
     * 按钮显示隐藏的颜色
     */
    getArrowColor(direct) {
        if ((direct === 'prev' && !this.prevDisabled()) ||
        (direct === 'next' && !this.nextDisabled())) {
            return '#825807';
        } else {
            return '#aaa';
        }
    }
    /**
     * 窗口大小改变时重新计算子元素位置
     */
    resize() {
        this.initItems();
    }
}
export default Swiper;