import React from 'react';
import './List.scss';
import Swiper from './Swiper';
// 一页展示书本的个数
const LIST_NUM = 3;
class List extends React.Component {
    render() {
        let {title, link, books} = this.props.info || {};
        let swiperOptions = {
            // 默认隐藏左右按钮
            defaultShowButtons: false
        };
        if (this.props.info) {
            let page = Math.ceil(books.length / LIST_NUM);
            let items = this.renderBooks(books, page);
            return (
                <div className="widget-list"
                onMouseEnter={() => this.refs.swiper.changeButtons(true)}
                onMouseLeave={() => this.refs.swiper.changeButtons(false)}>
                    <div className="widget-list-head">
                        <h2 className="widget-list-title">{title}</h2>
                        <div className="widget-list-link">
                            <a href={link}>更多{title}</a>
                        </div>
                    </div>
                    <div className="widget-list-body">
                        <Swiper options={swiperOptions} ref="swiper">
                            {
                            items.map((item, index) => (
                                <div className="book-wrap" key={index}>{item}</div>
                            ))}
                        </Swiper>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
    /**
     * 渲染书本
     * @param {array} books 
     * @param {number} page 
     */
    renderBooks(books, page) {
        let items = [];
        // 每3张为一页
        for (let i = 0; i < page; i++) {
            items[i] = [];
            for (let j = 0; j < LIST_NUM; j++) {
                let book = books[i*LIST_NUM + j];
                if (!book) {
                    break;
                }
                items[i].push(
                <div className="book-container" key={book.id}>
                    <div className="book-container-main">
                        <div className="description">
                            <h4 className="title"><a title={book.title} href={book.link} >{book.title}</a></h4>
                            <div className="author"><a href={book.author_link} >{book.author[0]} {book.author.length > 1 ? '等' : ''}</a></div>
                        </div>
                        <div className="cover">
                            <a href={book.link}>
                                <img src={book.cover}></img>
                            </a>
                        </div>
                    </div>
                    <div className="price">{book.price}元</div>
                </div>);
            }
        }
        return items;
    }
}
export default List;
