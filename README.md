This is a flashcard web app frontend, built with React.js and node.js / express.js.

response: flashcards => a flashcard:

    {
        "domain" : "Programming languages",
        "subdomain" : "C++",
        "topic" : "operators",
        "front of card" : "arrow operator",
        "back of card" : "A means of accessing a class member from outside the
                            class.&#09;Automatically dereferences the pointer
                            variable that points to the class."
    }
    back of card may be composed of multiple terms separated by a TAB
        ascii / javascript character: &#09; or \t whichever is better (?)

    when the app first loads, it asks the backend for all of the domains,
        subdomains, and topics.

    create nested accordians.
    2 accordians, one nested within the other (domain > subdomain)

    when you click on a topic in the subdomain, it is added to your "cart" on
        the right.

    cart items show subdomain and topic.

    when you close the modal, the frontend looks at what you've selected,
    compares it with what you already have in your flashcard deck and
    asks the backend for the new / missing cards if there are any.

    maybe display a fetching / loading graphic if the flashcard deck
        is currently empty.

    buttons to implement:
        shuffle flashcards.
        remove current flashcard from deck.
        light / dark mode buttons
