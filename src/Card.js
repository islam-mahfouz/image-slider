import React from 'react';

export default class Card extends React.Component {

  constructor(){
    super()
    this.state = {
      name: null,
      image: null,
      price: null,
      location: null,
      score: null
    };
  }


/**
* opens modal to show more info.
*/
openModal(index){
  var x = index;
  var results = this.props.resultsArray;
  this.setState({
    name: results[x].name,
    image: results[x].image,
    price: results[x].price,
    location: results[x].location,
    score: results[x].score
  })
  var modal = $('.modal');
  modal.show();
  $(".modal-close").click(function(){
    modal.hide();
  });
}

 render(){
  /**
   * Populates list items according to data passed
   * on to resultsArray.
   */
    var items = this.props.resultsArray;
    var that = this;
    var itemslist = items.map(function(item, index){
          return(
              <li key={ index } id={index} class="card" >
                <div class="card-header">
                    <span class="hour-price"><span>{ item.hourPrice } &euro; /hour</span></span>
                    <img src={ item.image } class="card-img" />
                    <a href="javascript:"  onClick={that.openModal.bind(that, index)} class="book-button">More..</a>
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
         <div class="modal">
           <div class="modal-content">
            <div class="modal-header">
              <img class="modal-img" src={this.state.image} />
              <img src="/img/error.png" class="modal-close" />
            </div>
            <div class="modal-body">

            </div>
           </div>
         </div>
      </div>   
      );

  }
}
