import React from 'react';
import config from '../../../config/config.json';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getNews } from "../../../_dux/action/newsAction";
import "./news.css"
import {
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);
ReactGA.pageview(window.location.pathname);

let displayNews;


class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        emiten: "IHSG"
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getNews(this.state.emiten));
  }

  init() {
    if(this.props.news){

      displayNews = this.props.news.message.map( (news) => {
        let source = news.date.split(" yang lalu");
        return(
          <div className="news-item" key={news.title}>

            <div className='news-image float-left'>
              <img src={news.img} width={"100px"} height={"100px"}/>
            </div>

            <div className='news-title'>
              <a target='_blank' href={news.link}>{news.title}</a>
            </div>

            <div className="news-source">
              {source[0]} yang lalu
            </div>

            <div className="news-desc">
              {news.text}
            </div>
            <br />
          </div>
        )

      });

    }
  }

  handleInput(e){
    let value = e.target.value;
    let name = e.target.name;

    this.setState(
      prevState => ({
        ...prevState,
        [name]: value.toUpperCase()
      })
    );
  }
  handleSubmit(){
    // console.log(this.state.emiten);
    this.props.dispatch(getNews(this.state.emiten));
  }

  render() {
    this.init();
    return(
      <div className="animated fadeIn" style={{height: '100%'}}>
        <div className="no-gutters" style={{height:'100%'}}>

          <Col sm={12} md={4} className="content-holder white-text float-right mb-3">
            <div>
              <Col>
                <InputGroup>

                  <Input type="text" id="input1-group1" name="input1-group1" placeholder="search emiten news" name="emiten" value={this.state.emiten} onChange={this.handleInput}  />

                  <InputGroupAddon addonType="append" onClick={this.handleSubmit}>
                    <InputGroupText>
                      <i className="fa fa-search"></i>
                    </InputGroupText>
                  </InputGroupAddon>

                </InputGroup>
                <div style={{fontSize: 10, width: '100%', textAlign: 'center', color: 'rgba(0,0,0,.5)'}}> you can input emiten code like "BBRI" and click the search icon</div>
              </Col>
            </div>
          </Col>

          <Col sm={12} md={8} className="content-holder white-text float-left">
            <Col style={{fontSize: '20px'}}>
              <Card>
                <CardBody>
                  <div style={{ borderBottom: '1px solid gray', paddingBottom: '3px' }}>
                    NEWS
                  </div>

                  {displayNews}
                </CardBody>
              </Card>
            </Col>
          </Col>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.news.data,
  // token: state.user.data.token
});

export default connect(mapStateToProps)(News);
