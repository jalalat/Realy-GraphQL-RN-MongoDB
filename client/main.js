import 'isomorphic-fetch';
import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Text, View } from 'react-native';

import PostListScreen from './screens/PostListScreen';
import Api from './api/Api';

const baseUrl = 'http://192.168.1.132:8080';

// const baseUrl = 'http://172.20.10.4:8080';
//const baseUrl = 'http://172.26.130.43:8080';

class Main extends Component {
	render() {
		const environment = Api.create({ baseUrl }).environment;
		return (
			<QueryRenderer
				environment={environment}
				query={graphql`
					query mainQuery {
						posts {
							id
							title
							details
							...PostListScreen_posts
						}
					}
				`}
				variables={{}}
				render={({error, props}) => {
					if (props) {
						return <PostListScreen posts={props.posts} />;

					} else if (error) {
						console.log(error);
						return <View><Text> error </Text></View>;
					}
					return <View><Text> Loading </Text></View>;
				}}
			/>
		);
	}
}

export default Main;