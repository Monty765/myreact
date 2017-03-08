import React from 'react';
import { Pagination, Col } from 'react-bootstrap/lib/';

const Paginations = ({totalPages, btnSize, activePage, onSelect}) => {
console.log(totalPages);
  return (
    <Col sm={12} >
      {totalPages > 1 ?
      <Pagination bsSize={btnSize} items={totalPages} activePage={activePage} onSelect={onSelect} />
      : null }
    </Col>
  )
}

export default Paginations;
