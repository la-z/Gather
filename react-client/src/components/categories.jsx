import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

const Categories = ({ categories }) => (
  <Collection>
    {categories.map(category => <CollectionItem>{category.name}</CollectionItem>)}
  </Collection>
);
export default Categories;
