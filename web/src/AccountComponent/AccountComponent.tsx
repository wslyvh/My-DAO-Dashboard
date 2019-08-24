import React from "react";
import {connect} from "react-redux";
import {State} from "../backbone/State";
import {ThunkDispatch} from "redux-thunk";
import * as account from "../backbone/account";

interface StateProps {
    account: string | undefined
}

interface DispatchProps {
    getAddress: () => void
}

export class AccountComponent extends React.Component<DispatchProps & StateProps> {
    componentDidMount(): void {
        this.props.getAddress()
    }

    render() {
        if (this.props.account) {
            return this.props.children
        } else {
            return <p>Connecting to web3...</p>
        }
    }
}

function stateToProps (state: State): StateProps {
    return {
        account: state.account.address
    }
}

function dispatchToProps (dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        getAddress: () => {
            return dispatch(account.getAddress.action())
        },
    }
}

export default connect(stateToProps, dispatchToProps)(AccountComponent)
