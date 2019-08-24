import { Tag } from "antd";
import React, { Component } from "react";

interface IProps {
  type: string;
}

export default class DaoTag extends Component<IProps> {
  public render() {
    return (
      <>
        <Tag color={this.color()}>{this.props.type}</Tag>
      </>
    );
  }

  private color = () => {
    switch (this.props.type) {
      case "ARAGON":
        return "cyan";
      case "MOLOCH":
        return "red";
      default:
        return "blue";
    }
  };
}
