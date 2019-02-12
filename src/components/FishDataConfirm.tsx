import React, { useState, Component } from "react";
import styled from "styled-components";
import Reward from "react-rewards";

import { strings, fao3AMap } from "../_data";

export class FishDataConfirm extends Component {
  state = {
      done: false
  };

  componentWillMount() {
    const { steps } = this.props as any;

    const { add_catch, add_quantity, add_preservation } = steps;

    const fishStore = JSON.parse(localStorage.getItem("FISH_STORE") as any) || { catches: [] };

    const label = `${add_quantity.value} ${add_preservation.value} ${add_catch.value}`;

    fishStore.catches.push({
        value: label,
        label
    })

    localStorage.setItem("FISH_STORE", JSON.stringify(fishStore));
}

  render() {
    return (
      <Reward
        ref={(ref: any) => {
            if(ref && !this.state.done) {
                ref.rewardMe()
                this.setState({done: true})
            }
        }}
        type="emoji"
        config={{
          emoji: ["🐟", "🦐", "🐙", "🦀", "🐳", "🐋", "🐬", "🦑", "🐡", "🦈"]
        }}
      >
        <div>{strings.prompt_catchCongrat}</div>
      </Reward>
    );
  }
}
