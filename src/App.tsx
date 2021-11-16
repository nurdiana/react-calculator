import React from 'react';
import './App.css';

class App extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      one :0,
      isOne :true,
      two : 0,
      isTwo : true,
      three : 0,
      isThree : true,
      count: 3,
      hasil : 0,
      errorText: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  count (checked:any, name:any) {
    let { count } :any = this.state
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
        value : 0
      },
      {
        index:1,
        name: "two",
        value : 0
      },
      {
        index: 2,
        name: "three",
        value : 0
      }
    ];
    
    return (
      <div className="parent">
        {arrs.map(a => 
          <div key={a.index}>
            <input
              name={a.name}
              id={a.name + "-text"}
              type="number"
              defaultValue={a.value}
              onChange={this.handleInputChange} 
            />
            <Checkbox name={a.name} id={a.name + "-check"}
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
        <div>{this.state.errorText}</div>
      </div>
    );
  }
  handleInputChange(event:any) {
    const target = event.target;
    const value:any = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick (operation:any) {
    if(this.state.count > 1) {
      this.setState({
        errorText: ""
      });
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
      this.setState({
        hasil: "-",
        errorText: "Minimal checklist adalah 2"
      });
    }
  }
}

export default App;

interface IChildComponentProps extends React.Props<any> {
  name: any
  id: any
  count:any
}

class Checkbox extends React.Component <IChildComponentProps, any> {
  constructor(props:any) {
    super(props)
    this.state ={
      checked: true,
      name: "",
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
      <input type='checkbox' id={this.props.id} checked={this.state.checked} onChange={() => this.handleCheck()}/>
    )
  }
}