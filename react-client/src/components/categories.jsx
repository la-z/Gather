import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import Input from 'react-materialize/lib/Input';
import CategoryCheckbox from './categoryCheckbox.jsx';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };
  }

  // search(event) {
  //   const { categories, getEvents } = this.props;
  //   if (selected[event.target.value]) {
  //     delete selected[event.target.value];
  //   } else {
  //     selected[event.target.value] = event.target.value;
  //   }
  //   console.log(selected, '====================');
  //   getEvents(selected);
  // }

  render() {
    const { categories, getEvents } = this.props;
    const { selected } = this.state;
    return (
      <div>
        <h2>Categories</h2>
        {categories.map(category => <CategoryCheckbox key={category.id} category={category} selected={selected} getEvents={getEvents} />)}
      </div>
    );
  }
}
export default Categories;
