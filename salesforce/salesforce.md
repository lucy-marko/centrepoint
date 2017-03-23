# Querying salesforce

### Summary
- The two best options seem to be Salesforce REST APIs and Heroku Connect
- Of those two, Salesforce REST APIs seems to be scaled most appropriately to this project
- There appears to be a cost implication as both methods work with Heroku Enterpise, which is $25+ per month

### Heroku Connect
- Set up Heroku Enterprise, which offers Heroku Connect, which would make a copy of the salesforce data into a local postgres database, which can be queried
- Upsides are that this is built in and offers low latency for frequent requests
- One of the benefits is the ability for the postgres database to feed data back into Salesforce.

<div style="width:450px;margin-left:30px;"><img src="https://res.cloudinary.com/hy4kyit2a/image/upload/v1487707380/doc/trailhead/staging/team-trailhead_heroku_en-us_salesforce_heroku_integration_images_heroku_connect_9a2f45995ace0d67430eb1d1e5ec14ef.jpg" alt="map of heroku connect"/></div>

###### Verdict
Given this is an optimised solution for high-traffic apps, it seems like this might be overkill.

###### Links
- [Salesforce tutorial]( https://trailhead.salesforce.com/trails/heroku_enterprise/modules/salesforce_heroku_integration/units/integrating_with_heroku_connect)
- [Heroku tutorial](https://www.heroku.com/connect)

## Salesforce REST APIs
- Provides heroku apps with access to Salesforce data through JSON http requests
- Can use Salesforce's OAuth to authorize users in a custom user interface (and interact with Salesforce data on their behalf)

<div style="width:500px;margin-left:30px;"><img src="https://res.cloudinary.com/hy4kyit2a/image/upload/v1487707381/doc/trailhead/staging/team-trailhead_heroku_en-us_salesforce_heroku_integration_images_salesforce_rest_apis_328717f90a5da6133f2e3fa1db331f2d.jpg" alt="map of heroku connect"/></div>

##### Verdict
This seems like the best option in this case as it doesn't involve a large duplicate database, data is up to date and as high traffic isn't really an issue, this is scaled more appropriately to the project.

###### Links
- [Salesforce tutotial](https://trailhead.salesforce.com/trails/heroku_enterprise/modules/salesforce_heroku_integration/units/rest_apis_with_heroku)
- [Heroku tutorial]( https://devcenter.heroku.com/articles/integrating-force-com-and-heroku-apps)

### Other methods
###### Salesforce Connect
This seems to be primarily for pulling external data into Salesforce with the appearance of integration. Not a useful option in this case as external data isn't required.
###### Callouts
This is designed for Salesforce to trigger a process on heroku, so not suitable here.
###### Canvas
This is aimed at Salesforce users rather than customers so it's not suitable in this case.

### Comparison of the different methods

<div class="data colSort">
<table class="featureTable sort_table" summary="">
  <thead class="thead sorted" align="left">
  <tr>
    <th class="featureTableHeader"></th>
    <th class="featureTableHeader">Heroku Connect</th>
    <th class="featureTableHeader">Salesforce Connect</th>
    <th class="featureTableHeader">REST APIs</th>
    <th class="featureTableHeader">Callouts</th>
    <th class="featureTableHeader">Canvas</th>
  </tr>
  </thead>
  <tbody class="tbody">
  <tr>
    <td style="font-weight:bold;" class="entry" headers="d28603e127" data-title="Type">Security Model</td>
    <td class="entry" headers="d28603e127" data-title="Type">Integration user</td>
    <td class="entry" headers="d28603e127" data-title="Type">Various (including integration user and named principal)</td>
    <td class="entry" headers="d28603e127" data-title="Type">OAuth</td>
    <td class="entry" headers="d28603e127" data-title="Type">App user</td>
    <td class="entry" headers="d28603e127" data-title="Type">App user</td>
  </tr>
  <tr>
    <td style="font-weight:bold;" class="entry" headers="d28603e127" data-title="Type">Limits</td>
    <td class="entry" headers="d28603e127" data-title="Type">Excluded from limits</td>
    <td class="entry" headers="d28603e127" data-title="Type">Max # of sources, objects, and fields</td>
    <td class="entry" headers="d28603e127" data-title="Type">API limits</td>
    <td class="entry" headers="d28603e127" data-title="Type">API limits</td>
    <td class="entry" headers="d28603e127" data-title="Type">Request limits</td>
  </tr>
  <tr>
    <td style="font-weight:bold;" class="entry" headers="d28603e127" data-title="Type">SObject Features</td>
    <td class="entry" headers="d28603e127" data-title="Type">All standard features</td>
    <td class="entry" headers="d28603e127" data-title="Type">Read only<br>No formula and roll-up summary fields<br>No triggers, workflow, approvals process<br>No Validation Rules<br>Field history tracking<br>No notes, attachments</td>
    <td class="entry" headers="d28603e127" data-title="Type">All standard features</td>
    <td class="entry" headers="d28603e127" data-title="Type">N/A</td>
    <td class="entry" headers="d28603e127" data-title="Type">All standard features</td>
  </tr>
  <tr>
    <td style="font-weight:bold;" class="entry" headers="d28603e127" data-title="Type">Data Strategy</td>
    <td class="entry" headers="d28603e127" data-title="Type">Real-time BiDi sync or OData</td>
    <td class="entry" headers="d28603e127" data-title="Type">OData or proxy</td>
    <td class="entry" headers="d28603e127" data-title="Type">Read &amp; copy</td>
    <td class="entry" headers="d28603e127" data-title="Type">Payload</td>
    <td class="entry" headers="d28603e127" data-title="Type">Canvas API</td>
  </tr>
  <tr>
    <td style="font-weight:bold;" class="entry" headers="d28603e127" data-title="Type">End Users</td>
    <td class="entry" headers="d28603e127" data-title="Type">Anonymous, customers</td>
    <td class="entry" headers="d28603e127" data-title="Type">Salesforce users</td>
    <td class="entry" headers="d28603e127" data-title="Type">Any</td>
    <td class="entry" headers="d28603e127" data-title="Type">No</td>
    <td class="entry" headers="d28603e127" data-title="Type">Salesforce users</td>
  </tr>
  <tr>
    <td style="font-weight:bold;" class="entry" headers="d28603e127" data-title="Type">Protocol</td>
    <td class="entry" headers="d28603e127" data-title="Type">SQL</td>
    <td class="entry" headers="d28603e127" data-title="Type">Apex</td>
    <td class="entry" headers="d28603e127" data-title="Type">HTTP</td>
    <td class="entry" headers="d28603e127" data-title="Type">HTTP</td>
    <td class="entry" headers="d28603e127" data-title="Type">HTTP</td>
  </tr>
