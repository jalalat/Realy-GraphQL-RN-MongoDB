/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import 'isomorphic-fetch';
import models from './models/index';

import express from 'express';
import graphQLHTTP from 'express-graphql';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import {schema} from './schema/schema';

const MongoStore = connectMongo(session);
const GRAPHQL_PORT = 8080;
// Expose a GraphQL endpoint
const app = express();
// Replace with your mongoLab URI
const MONGO_URI = 'YOUR SERVER URI';
// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
		.once('open', () => console.log('Connected to MongoLab instance.'))
		.on('error', error => console.log('Error connecting to MongoLab:', error));

// app.use(cors());
app.use('/', graphQLHTTP({
	schema, 
	graphiql: true, 
	pretty: true,
}));

app.listen(GRAPHQL_PORT, () => console.log(
	`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

export default app;
