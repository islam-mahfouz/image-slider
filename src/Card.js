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
              <li key={ index } class="card">
                <img src={ item.image } class="card-img" />
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
      <ul class="card-list center">
        { itemslist }
       </ul> 
        
      );

  }
}
