import React from 'react';
import Navbar from './Navbar.js';
import Slider from './Slider.js';


export default class Application extends React.Component {

 render(){
    return(
	    <div>	
	      <Navbar></Navbar>
	      <Slider></Slider>
	    </div>
      );
  }
}
