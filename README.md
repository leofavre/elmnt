# Elmnt

### Yet another abstraction layer for creating web components.

[![Build Status](https://travis-ci.com/leofavre/elmnt.svg?branch=master)](https://travis-ci.com/leofavre/elmnt) [![Coverage Status](https://coveralls.io/repos/github/leofavre/elmnt/badge.svg?branch=master)](https://coveralls.io/github/leofavre/elmnt?branch=master)

Elmnt is an abstraction layer that lets you set and reflect attributes and properties on web components and react to their changes.

One key difference from other libraries is that it doesn't assume that attributes always derive from properties. It also doesn't delay changes from being applied.

Elmnt comes with a set of decorators that can be combined to add common functionalities like dispatching DOM Events or handling state like React does.