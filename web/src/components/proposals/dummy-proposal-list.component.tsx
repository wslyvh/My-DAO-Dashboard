import React from "react";
import ProposalTableComponent from "./proposal-table.component";
import { ProposalColumn } from "../../model/proposal-column";

interface Props {
  openProposals: ProposalColumn[]
  proposals: ProposalColumn[]
}

export class DummyProposalListComponent extends React.Component<Props> {
  public renderActiveProposals() {
    if (this.props.openProposals.length > 0) {
      return <>
        <div className="proposals">
          <h3>Active Proposals</h3>
          <ProposalTableComponent open={true} source={this.props.openProposals} />
        </div>
      </>
    } else {
      return <></>
    }
  }

  public render() {
      return <>
        {this.renderActiveProposals()}
        <div className="proposals">
          <h3>Sealed Proposals</h3>
          <ProposalTableComponent open={false} source={this.props.proposals} />
        </div>
      </>
  }
}
