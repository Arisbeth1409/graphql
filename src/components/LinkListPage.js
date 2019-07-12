import React, { Component } from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../Environment";
import LinkList from "./LinkList";
const LinkListPageQuery = graphql`
  query LinkListPageQuery {
    viewer {
      ...LinkList_viewer
    }
  }
`;

console.log(LinkListPageQuery);

class LinkListPage extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={LinkListPageQuery}
        render={({ error, props }) => {
          console.log("interno", props);
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <LinkList viewer={props.viewer} />;
          }
          return <div>Loading</div>;
        }}
      />
    );
  }
}

export default LinkListPage;
