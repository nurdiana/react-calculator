import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one :0,
      isOne :false,
      two : 0,
      isTwo : false,
      three : 0,
      isThree : false,
      count: 0,
      hasil : 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  count (checked, name) {
    let { count } = this.state
    if (checked) {
      if(name === "one") {
        this.setState({
          isOne: true
        });
      }
      if(name === "two") {
        this.setState({
          isTwo: true
        });
      }
      if(name === "three") {
        this.setState({
          isThree: true
        });
      }
    	count ++
		} else {
      if(name === "one") {
        this.setState({
          isOne: false
        });
      }
      if(name === "two") {
        this.setState({
          isTwo: false
        });
      }
      if(name === "three") {
        this.setState({
          isThree: false
        });
      }
    	count --
    }

    this.setState({count})
  }

  render() {
    let arrs = [
      {
        index:0,
        name: "one",
        isChecked : 0,
        value : 0
      },
      {
        index:1,
        name: "two",
        isChecked : 0,
        value : 0
      },
      {
        index: 2,
        name: "three",
        isChecked : 0,
        value : 0
      }
    ];
    
    return (
      <div>
        {arrs.map(a => 
          <div>
            <input
              name={a.name}
              type="number"
              defaultValue={a.value}
              onChange={this.handleInputChange} 
            />
            <Checkbox name={a.name}
              count={this.count.bind(this)} />
          </div>
        
        )}

        <button onClick={() => this.handleClick("plus")}>
          +
        </button>

        <button onClick={() => this.handleClick("minus")}>
          -
        </button>

        <button onClick={() => this.handleClick("multiply")}>
          x
        </button>

        <button onClick={() => this.handleClick("divide")}>
          /
        </button>
        <div>Hasil : {this.state.hasil}</div>
      </div>
    );
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick (operation) {
    console.log(this.state);

    if(this.state.count > 1) {
      if(operation === "plus") {
        this.setState({
          hasil: (this.state.isOne ? parseFloat(this.state.one) : 0) + 
          (this.state.isTwo ? parseFloat(this.state.two) : 0) + 
          (this.state.isThree ? parseFloat(this.state.three) : 0)
        });
      } else if(operation === "minus") {
        this.setState({
          hasil: (this.state.isOne ? parseFloat(this.state.one) : 0) -
          (this.state.isTwo ? parseFloat(this.state.two) : 0) -
          (this.state.isThree ? parseFloat(this.state.three) : 0)
        });
      } else if(operation === "multiply") {
        this.setState({
          hasil: (this.state.isOne ? parseFloat(this.state.one) : 1) *
          (this.state.isTwo ? parseFloat(this.state.two) : 1) *
          (this.state.isThree ? parseFloat(this.state.three) : 1)
        });
      } else if (operation === "divide") {
        this.setState({
          hasil: (this.state.isOne ? parseFloat(this.state.one) : 1) /
          (this.state.isTwo ? parseFloat(this.state.two) : 1) /
          (this.state.isThree ? parseFloat(this.state.three) : 1)
        });
      }
    } else {
      this.state.error = ""
    }
  }
}

export default App;

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      checked: false
    }
  }
  handleCheck () {
    let checked = !this.state.checked
    
    if (checked) {
      this.props.count(true, this.props.name)
    } else {
      this.props.count(false, this.props.name)
    }
    this.setState({checked})
  }
  render () {
    return (
          <input type='checkbox' checked={this.state.checked} onChange={() => this.handleCheck()}/>
    )
  }
}