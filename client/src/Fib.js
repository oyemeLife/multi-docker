import React, { Component } from "react";
import axois from "axios";

export default class Fib extends Component {
    state = {
        seeIndexes: [],
        values: {},
        index: "",
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axois.get("/api/values/current");
        this.setState({
            values: values.data,
        });
    }

    async fetchIndexes() {
        const seenIndexes = await axois.get("/api/values/all");
        this.setState({
            seeIndexes: seenIndexes.data,
        });
    }

    renderSeenIndexes() {
        return this.state.seeIndexes.map((value) => value.number).join(", ");
    }

    renderValues() {
        const entries =[];

        for(let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For  index {key} I Calculate {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        await axois.post("/api/values",{
            index: this.state.index
        });

        this.setState({index:""});

        this.fetchValues();
        this.fetchIndexes();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index here</label>
                    <input 
                        value={this.state.index}
                        onChange={event => this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen</h3>
                {this.renderSeenIndexes()}

                <h3>Calculate values</h3>
                {this.renderValues()}

            </div>
        );
    }
}
