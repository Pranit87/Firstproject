import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: this.props.counter.value
    };

    handleIncrement = () => {
        this.setState({count: this.state.count +1});

    }
    


    render() {


        
        return <div>
            <span className = {this.getbadgeclasess()}>{this.formatCount()}</span>
            <button onClick={this.handleIncrement} className='btn btn-primary btn-sm '>Increment</button>
            <button onClick = {() => this.props.onDelete(this.props.counter.id)} className = "btn btn-warning btn-sm">Delete</button>
            </div> 
    }

    getbadgeclasess() {
        let classes = "badge m-2  badge-";
        classes += (this.formatCount() === 0) ? "warning" : "primary";
    }

    formatCount() {
        const {count} = this.state;
        return count === 0 ? 'zero' : count;
    }
}

export default Counter;
