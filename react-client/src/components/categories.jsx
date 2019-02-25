import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

const Categories = ({ categories, getCategory }) => (
  <Collection>
    {categories.map(category => <CollectionItem onClick={() => getCategory(category.id)}>{category.name}</CollectionItem>)}
  </Collection>
);
export default Categories;
