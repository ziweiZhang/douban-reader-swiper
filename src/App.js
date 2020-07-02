import React from 'react';
import { connect } from 'react-redux';
import { fetchList } from './actions';
import List from './components/List';
import './App.css';

const MAX_NUM = 7;
class App extends React.Component {
  constructor() {
    super();
    this.changeNums = this.changeNums.bind(this);
  }
  render() {
    let info = this.props.pictureList;
    if (info && info.books) {
      info = {...info, books: info.books.slice(0, this.state.num)};
    }
    return (
      <div className="App">
        <div className="demo-setting">
          <label>输入展示书本的个数,最多{MAX_NUM}个</label><input onInput={e => this.changeNums(e)}></input>
        </div>
        <List info={info}></List>
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      num: MAX_NUM
    });
    //  获取数据
    this.props.dispatch(fetchList('picture'));
  }
  changeNums(e) {
    let n = e.target.value || MAX_NUM;
    n = n < 1 ? 1 : n > MAX_NUM ? MAX_NUM : n;
    this.setState({
      ...this.state,
      num: n
    });
  }
}
const mapStateToProps = state => {
  let {picture: pictureList} = state.fetchListReducer
  return {
    pictureList: pictureList
  }
}
export default connect(
  mapStateToProps,
)(App);
