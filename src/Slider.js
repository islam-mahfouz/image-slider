import React from 'react';
import Card from './Card.js';

export default class Slider extends React.Component {
  
 constructor() {
  super()
  this.state = {
    imgArray: [ "/img/work1.jpg", "/img/work2.jpg", "/img/work3.jpg"],
    imgNo: 0,
    imgArrayLength: 3,
    url: "https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753%2C4.634942&ne=52.455562%2C5.162286&ids=17201%2C19640%2C13692%2C13691%2C12136%2C17938%2C15292%2C14886%2C14885%2C14884%2C14883%2C15730%2C15353%2C15351%2C15330%2C15080%2C17290%2C15454%2C15451%2C15379",
    search: '',
    resultObject: null,
    resultsArray: [],
    headlines: ["Pink Floyd Office", "Led Zeppelin Mania", "Central Perk Friends"]
  };
}


  /**
   * Fetches the json file and stores its data in an object variable.
   * Sets the state of the resultObject to contain the fetched object
   */
   componentDidMount(){
     this.serverRequest = $.get(this.state.url, function(result){
       var info =  result;
       this.setState({
        resultObject:info
      })
     }.bind(this));
   }


 /**
   * Changes the image on the slider based on
   * the arrow clicked whether its left or right
   * by passing in an index.
   */
   changeImg(index) {
    var {
      imgArrayLength, imgNo
    } = this.state;

    var current = (imgArrayLength + imgNo + index) % imgArrayLength;

    this.setState({
      imgNo: current
    })
  }


  /**
   * Sets the search state to the current value typed in search-box.
   */
   searchQuery(e){
    this.setState({
      search: e.target.value
    })
  }


  /**
   * Sets the city name from the search bar to lower case.
   * fetches all data that matches the city name.
   * checks if data is not missing and then shows results
   * if a city name that doesn't match is entered an error is shown.
   */
   showResult() {
    var search = this.state.search.toLowerCase();
    var resultsArray = this.state.resultObject.rows
    .filter(row => search == row.location_city.toLowerCase())
    .map(row => ({
      price: row.day_price,
      location: row.location_name,
      image: row.image_urls2[0],
      name:  row.name,
      score: Math.round(row.location_rating * 10) / 10
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
          $(".alert-box, .cancel").animate( { "opacity": "show"} , 1250 );
          $(".alert-box, .cancel").animate( { "opacity": "hide"} , 3750 );
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
      			<img src={ this.state.imgArray[ this.state.imgNo ] } class="main-img" />
      			<div class="headline"><span>{ this.state.headlines[ this.state.imgNo ] }</span></div>
      		</div>
      		<img src="/img/slider-left.png" class="slider-arrow" onClick={ this.changeImg.bind(this, -1) } />
      		<img src="/img/slider-right.png" class="slider-arrow slider-right" onClick={ this.changeImg.bind(this,  1) } />
          <div class="search-container">
            <img src="/img/cancel.png" class="cancel hide"/>
            <span class="alert-box hide">No offices available in this city, please try another one!</span>
            <input onChange={ this.searchQuery.bind(this) } value={ this.state.search } type="text" name="search"  placeholder="City name..." class="search-bar" />
            <button disabled={ !this.state.search } onClick={ this.showResult.bind(this) } class="search-button">Sit me!</button>
          </div>
      	</div>
        <Card resultsArray={ this.state.resultsArray }></Card>
      </div>	
      );
  }
}
 