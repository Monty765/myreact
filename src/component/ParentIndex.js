import React from 'react';
import ItemsPerpage from './ItemsPerpage';
import Paginations from './Paginations';
import Pokelist from './Pokelist';

const ParentIndex = ({display, options, selectedValue, allValue, onOptionSelected, listOfPokemon, toggleModal,btnSize, totalPages, activePage, onSelect}) => {

  let style ={ display: 'none' }

  if (display) {
    style.display = 'initial'
  } else {
    style.display = 'none'
  }

  return (
    <div style={style} >
      <ItemsPerpage
        options={options}
        selectedValue={selectedValue}
        allValue={allValue}
        onOptionSelected={onOptionSelected} />

      <Pokelist
        listOfPokemon={listOfPokemon}
        toggleModal={toggleModal}/>

      <Paginations
        btnSize='medium'
        totalPages={totalPages}
        activePage={activePage}
        onSelect={onSelect} />
    </div>
  )
}

export default ParentIndex;
