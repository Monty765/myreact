import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
// import {Col,Pagination} from 'react-bootstrap/lib/';
import ParentIndex from './component/ParentIndex';
import PokemonModal from './component/PokemonModal';
// import {Col} from 'react-bootstrap/lib/';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      pokemon:[],
      activePage:1,
      offset:0,
      limit:50,
      pages:0,
      count:0,
      loaded:false,
      showModel:false,
      selectedPokemon:null
    };
    this.loadPokemon=this.loadPokemon.bind(this);
    this.handleSelect=this.handleSelect.bind(this);
    this.handleLimitChange=this.handleLimitChange.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.closeModel=this.closeModel.bind(this);
  }
  loadPokemon(url){
    fetch(url)
    .then(response=>{
      return response.json();
    }).then(json => {
      let pages = Math.round(json.count / this.state.limit);
      this.setState({
        pokemon:json.results,
        pages:pages,
        count:json.count,
        loaded:true
      })
      // console.log(this.state)
    }).catch(err => {
      console.log(err)
    })
  }
componentWillMount(){
  this.loadPokemon(`${this.props.BaseUrl}/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`);
}
handleSelect(selectedPage){
  let offsett = this.state.limit*selectedPage;
  this.loadPokemon(`${this.props.BaseUrl}/pokemon/?limit=${this.state.limit}&offset=${offsett}`)
  this.setState({
    activePage:selectedPage
  })
}
handleLimitChange(event){
  this.setState({
    limit:+event.target.innerHTML || this.state.count,
    activePage:1
  },()=>{
    this.loadPokemon(`${this.props.BaseUrl}/pokemon/?limit=${this.state.limit}&offset=0`)
  })
}
toggleModal(pokemon){
  if(pokemon.url!== undefined){
    fetch(`${pokemon.url}`)
    .then(response=>{
      return response.json()
    }).then(json=>{
      this.setState({
        selectedPokemon:json,
        showModel:true
      })
    })
  }
}
closeModel(){
  console.log("close clicked");
this.setState({
  showModel:false
})
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        {this.state.loaded ? null : "Loading..."}
        <ParentIndex
          display={this.state.loaded}
          options={[10,50,100,200]}
          selectedValue={this.state.limit}
          allValue={this.state.count}
          onOptionSelected={this.handleLimitChange}
          listOfPokemon={this.state.pokemon}
          toggleModal={this.toggleModal}
          bsSize="small"
          items={this.state.pages}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
          totalPages={this.state.pages}
      />

      <PokemonModal
    showModel={this.state.showModel}
    closeModel={this.closeModel}
    pokemon={this.state.selectedPokemon}/>

      </div>
    );
  }
}

export default App;
