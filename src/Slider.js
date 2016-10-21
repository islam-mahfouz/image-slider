import React from 'react';

export default class Slider extends React.Component {
  
 constructor() {
    super()
    this.state = {
     	imgArray: [ "/img/work1.jpg", "/img/work2.jpg", "/img/work3.jpg"],
     	imgNo: 0,
     	current: "/img/work1.jpg"
    };
  }

  nextImg(){
  	if(this.state.imgNo < 2 && this.state.imgNo >=0 ){
	  	this.setState({
	    imgNo : ++this.state.imgNo ,
	    current: this.state.imgArray[this.state.imgNo]
	  })
	  	console.log(this.state.imgNo);
	  }
 }

  prevImg(){
  	if(this.state.imgNo >= 1  && this.state.imgNo < 3 ){
	  	this.setState({
	    imgNo : --this.state.imgNo,
	    current: this.state.imgArray[this.state.imgNo]
	  })
	  	console.log(this.state.imgNo);
	  }
  }


 render(){

    return(

      	<div class="slider ">
      		<div class="img-container">
      			<img src={this.state.current} class="main-img" />
      			<p class="headline">i have nothing to say</p>
      		</div>
      		<img src="/img/slider-left.png" class="slider-arrow" onClick={this.prevImg.bind(this)} />
      		<img src="/img/slider-right.png" class="slider-arrow slider-right" onClick={this.nextImg.bind(this)} />
      	</div>
      	
      );
  }
}
 