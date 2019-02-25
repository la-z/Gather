import React from 'react';
import { Collection, CollectionItem, Col } from 'react-materialize';
import Row from 'react-materialize/lib/Row';

const Categories = ({ categories, getCategory }) => (
  <Row>
    <Col s={12} m={4}>
      <Collection header="Categories">
        {categories.map(category => <CollectionItem onClick={() => getCategory(category.id)}>{category.name}</CollectionItem>)}
      </Collection>
    </Col>
  </Row>
);
export default Categories;
