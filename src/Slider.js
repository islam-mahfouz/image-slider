import React from 'react';
import Card from './Card.js';

export default class Slider extends React.Component {
  
 constructor() {
    super()
    this.state = {
     	imgArray: [ "/img/work1.jpg", "/img/work2.jpg", "/img/work3.jpg"],
     	imgNo: 0,
      url: "https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753%2C4.634942&ne=52.455562%2C5.162286&ids=17201%2C19640%2C13692%2C13691%2C12136%2C17938%2C15292%2C14886%2C14885%2C14884%2C14883%2C15730%2C15353%2C15351%2C15330%2C15080%2C17290%2C15454%2C15451%2C15379",
     	current: "/img/work1.jpg",
      search: '',
      resultObject: null,
      resultsArray: [],
      headlines: ["Pink Floyd Office", "Led Zeppelin Mania", "Central Perk Friends"],
      headline : "Pink Floyd Office"
    };
  }

  componentDidMount(){
  this.serverRequest = $.get(this.state.url, function(result){
    var info =  result;
    console.log(info);
    this.setState({
      resultObject:info
    })
  }.bind(this));
  
 }

  nextImg(){
  	if(this.state.imgNo < 2 && this.state.imgNo >=0 ){
	  	this.setState({
	    imgNo : ++this.state.imgNo ,
	    current: this.state.imgArray[this.state.imgNo],
      headline: this.state.headlines[this.state.imgNo]
	  })
	  }
 }

  prevImg(){
  	if(this.state.imgNo >= 1  && this.state.imgNo < 3 ){
	  	this.setState({
	    imgNo : --this.state.imgNo,
	    current: this.state.imgArray[this.state.imgNo],
      headline: this.state.headlines[this.state.imgNo]
	  })
	  }
  }

  searchQuery(e){
    this.setState({
      search: e.target.value
    })
  }

  showResult() {
    var search = this.state.search.toLowerCase();
    var resultsArray = this.state.resultObject.rows
      .filter(row => search == row.location_city.toLowerCase())
      .map(row => ({
        price: row.day_price,
        location: row.address.slice(0,3).join(', '),
        image: row.image_urls2[0],
        name:  row.location_name,
        score: Math.round(row.location_rating * 100) / 100
      }))
      .filter(user => user.price != null &&
        user.image != null &&
        user.name != null &&
        user.score != 0
      );


    this.setState(
      {
        resultsArray,
        search: resultsArray.length > 0 ? this.state.search : '',
      },
      () => {
        // This is executed after the component updates
        if (resultsArray.length > 0) {
          $(".card-list").show();
          $('html,body').animate({
            scrollTop: $(".card-list").offset().top
          }, 'slow');
        } else {
          $(".alert-box, .cancel").animate( { "opacity": "show", bottom:"0"} , 1250 );
          $(".alert-box, .cancel").animate( { "opacity": "hide", bottom:"0"} , 3750 );
          $(".card-list").hide();
        }
      }
    );
}

 

 render(){

    return(
      <div>
      	<div class="slider flow-text ">
      		<div class="img-container">
      			<img src={this.state.current} class="main-img" />
      			<div class="headline"><span>{this.state.headline}</span></div>
      		</div>
      		<img src="/img/slider-left.png" class="slider-arrow" onClick={this.prevImg.bind(this)} />
      		<img src="/img/slider-right.png" class="slider-arrow slider-right" onClick={this.nextImg.bind(this)} />
          <div class="search-container">
            <img src="/img/cancel.png" class="cancel hide"/>
            <span class="alert-box hide">No offices available in this city, please try another one!</span>
            <input onChange={this.searchQuery.bind(this)} value={this.state.search} type="text" name="search"  placeholder="City name..." class="search-bar" />
            <button disabled={!this.state.search} onClick={this.showResult.bind(this)} class="search-button">Sit me!</button>
          </div>
      	</div>
        <Card resultsArray={this.state.resultsArray}></Card>
      </div>	
      );
  }
}
 