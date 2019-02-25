import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

const Categories = ({ categories, getCategory }) => (
  <Collection header="Categories">
    {categories.map(category => <CollectionItem className="clickable" onClick={() => getCategory(category.id)}>{category.name}</CollectionItem>)}
  </Collection>
);
export default Categories;
