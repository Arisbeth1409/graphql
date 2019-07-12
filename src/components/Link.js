import React, { Component } from "react";
import { createFragmentContainer, graphql } from "react-relay";
import { GC_USER_ID } from "../constants";
import { timeDifferenceForDate } from "../utils";
import CreateVoteMutation from "../components/mutations/CreateVoteMutation";
import { fetch } from "../Environment";

const userId = localStorage.getItem(GC_USER_ID);
class Link extends Component {
  render() {
    console.log("sd", this.props.relay.environment._network);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span clas sName="gray">
            {this.props.index + 1}.
          </span>
          {userId && (
            <div className="ml1 gray f11" onClick={() => this._voteForLink()}>
              ▲
            </div>
          )}
        </div>
        <div className="ml1">
          {this.props.link.description} ({this.props.link.url})
          <div className="f6 lh-copy gray">
            {this.props.link.votes.count} votes | by{" "}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : "Unknown"}{" "}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    );
  }

  _userCanVoteOnLink = async (userId, linkId) => {
    const checkVoteQueryText = `
  query CheckVoteQuery($userId: ID!, $linkId: ID!) {
    viewer {
      allVotes(filter: {
        user: { id: $userId },
        link: { id: $linkId }
      }) {
        edges {
          node {
            id
          }
        }
      }
    }
  }`;
    const checkVoteQuery = { text: checkVoteQueryText };

    const result = await this.props.relay.environment._network.fetch(
      checkVoteQuery,
      { userId, linkId }
    );
    return result.data.viewer.allVotes.edges.length === 0;
  };

  _voteForLink = async () => {
    if (!userId) {
      console.log(`Can't vote without user ID`);
      return;
    }

    const linkId = this.props.link.id;

    const canUserVoteOnLink = await this._userCanVoteOnLink(userId, linkId);
    if (canUserVoteOnLink) {
      CreateVoteMutation(userId, linkId);
    } else {
      console.log(`Current already voted for that link`);
    }
  };
}

export default createFragmentContainer(Link, {
  link: graphql`
    fragment Link_link on Link {
      id
      url
      postedBy {
        id
        name
      }
      votes {
        count
      }
    }
  `
});
