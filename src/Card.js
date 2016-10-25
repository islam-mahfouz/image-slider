import React from 'react';

export default class Card extends React.Component {

 render(){
  /**
   * Populates list items according to data passed
   * on to resultsArray.
   */
    var items = this.props.resultsArray;
    var itemslist = items.map(function(item, index){
          return(
              <li key={ index } class="card" >
                <div class="card-header">
                    <span class="hour-price"><span>{ item.hourPrice } &euro; /hour</span></span>
                    <img src={ item.image } class="card-img" />
                    <a href="javascript:" class="book-button">Book</a>
                  </div>
                <div>
                  <div class="card-info">
                    <p class="workplace-name">{ item.name }</p>
                    <span class="score">{ item.score } &#9733;</span>
                    <p class="location">{ item.location }</p>
                  </div>
                  <div class="card-footer">
                    <p class="price">{ item.price } &euro; / Day</p>
                  </div>
                </div>
              </li>
          );})
    return(
      <div class="results-container">
        <ul class="card-list center">
          { itemslist }
         </ul>
      </div>   
      );

  }
}
