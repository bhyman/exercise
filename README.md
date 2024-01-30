# Expected Behavior/Features
> To help shape the design of your application, please start by outlining the expected behavior and features of the table and graph, such as data representation, sorting, filtering, or editing functionalities. This would serve as your notional requirements, guiding the design and implementation of the table.

There are many reasons not to reinvent the wheel. For both the table and the graph, I ought to use existing libraries rather than roll my own. 

In a real-world setting, I would specify requirements first, and use that to determine which libraries are suitable. 

However, in a highly time-constrained setting such as this one, I'm reliant on what each library provides out of the box.

That said, it behooves me to pick well-known, feature-complete libraries. I've chosen [Material React Table](http://material-react-table.com) and [Recharts](http://recharts.org).
* Material React Table provides searching, sorting, filtering, and a variety of editing modalities. It does not provide export functionality out of the box.
* Recharts supports basic bar charts (among several other types of charts). This is all I plan to need for this application.


# Assumptions/Decisions
> Please document any assumptions you've made during the design and implementation of the UI. This open-ended exercise provides us an insight into your decision-making process and problem-solving abilities.

I made a number of simplifying assumptions/decisions. None of them would fly in a production app! However, under these artificial (and time-constrained) circumstances, I thought it would be okay to simply note and proceed:
* There is no persistent backend, nor even a fascimile such as  `localStorage` or `sessionStorage`.
* I elected to get the core functionality down, rather than spending time on additional styling/CSS.
* Event datetime, source, content, and number of followers/following are all provided by the user in a free-form text input box. There is NO validation for input types or presence.
    * This is probably the first thing I'd improve, given more time. Some possibilities: a datetime picker, date parsing, numeric validation for the two number fields, `__ is required` validation for everything, etc.
* `Topic`, however, is not free-form. It's selected from a drop-down list. In an attempt to inject some whimsy, which hopefully won't fall flat, the options are taken from [the Wikipedia page describing people with the surname Topić](https://en.wikipedia.org/wiki/Topi%C4%87).
* Because the dates are currently stored as strings rather than actual dates, sorting is lexicographical, i.e. correctness is at the mercy of the user entering dates in ISO format.
* I elected to assign each data point an `id`, but not display these IDs in the table or chart. A corollary is that the table can feature duplicate rows, i.e. two data points that are otherwise identical but for their IDs.
    * I rejected the alternative approach of requiring each data point to be unique across the combination of all or some of its attributes.
    * At the moment, ID generation is random, and not _guaranteed_ to be distinct. Collision is unlikely but possible. If two data points end up with the same IDs, editing or deleting one point will have the identical effect on the other point.
    * I'll own up to a bug I stumbled across: it's possible to display the hidden `id` column in the table after all. From the `Show/Hide columns` button, select `Hide All` and then `Show All`.



# Time
Estimated total number of programming hours: 3

Actual total number of programming hours: 3.5

(Actual time was probably about 5 hours, once you account for the time spent researching and settling on the framework and packages, setting up my dev environment, writing these notes, deploying, etc.)

This is greater than the 2 hour limit suggested in the exercise email, but in line with the 4 hour estimate provided to me by Laura B.

# Development/Execution

After downloading/cloning the repo, install dependencies:

```
npm i
```

Start a local web server by running:

```
npm start
```

And then open http://localhost:3000/exercise/ to view it in the browser.

Alternatively, to run in production mode, execute `npm run build` followed by `npm run serve`, whereupon the application will be accessible from http://localhost:4173/exercise/.

The application is also available at https://bhyman.github.io/exercise/.

# Credits

Crucial inspiration/code was provided from the following template/example code:

* https://github.com/SafdarJamal/vite-template-react/tree/main
* https://www.material-react-table.com/docs/guides/editing
* https://recharts.org/en-US/examples/SimpleBarChart
