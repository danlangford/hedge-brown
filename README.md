hedge-brown
===========

gatekeeper + reverse proxy

start by running and inspecting test/usage.js. its an example of hoe this might be used.

fakeserver is just that, a fake server used for simple testing of the idea

id like this to do a few things:
 * http to https redirection
 * http communication from proxy back to apps
 * handle the access to apps
 * inject some user info into the headers back to the apps
