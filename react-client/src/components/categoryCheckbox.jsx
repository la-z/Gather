import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import Input from 'react-materialize/lib/Input';

class CategoryCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.select = this.select.bind(this);
  }

  select(event) {
    const { checked } = this.state;
    const { state } = this;
    const { getEvents, selected } = this.props;
    const eventValue = event.target.value;
    if (selected[eventValue]) {
      delete selected[eventValue];
      this.setState({ checked: !checked }, () => {
        this.setState(state, () => {
          console.log(selected, '====================');
          getEvents(selected);
        });
      });
    } else {
      selected[eventValue] = eventValue;
      this.setState({ checked: !checked }, () => {
        console.log(selected, '====================');
        getEvents(selected);
      });
    }
  }

  render() {
    const { category } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <Input name="group1" type="checkbox" key={category.id} value={category.id} label={category.name} onClick={this.select} checked={checked} />
      </div>
    );
  }
}

export default CategoryCheckbox;
