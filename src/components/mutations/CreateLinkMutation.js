// 1
import { commitMutation, graphql } from "react-relay";
import environment from "../../Environment";

// 2
const mutation = graphql`
  mutation CreateLinkMutation($input: CreateLinkInput!) {
    createLink(input: $input) {
      link {
        id
        createdAt
        url
        postedBy {
          id
          name
        }
      }
    }
  }
`;

export default (postedById, url, callback) => {
  const variables = {
    input: {
      postedById,
      url,
      clientMutationId: ""
    }
  };

  commitMutation(environment, {
    mutation,
    variables,
    // 6
    onCompleted: () => {
      //callback();
      console.log("texto");
    },
    onError: err => console.error(err)
  });
};
