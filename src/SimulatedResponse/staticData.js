// export const data = {
export const cards = [
    {
        "domain": "Programming languages",
        "subdomain": "C++",
        "topic": "Operators",
        "front": "arrow operator",
        "back": "A means of accessing a class member from outside the class.&#09;Automatically dereferences the pointer variable that points to the class.",
        flagged: false
    }
];

const dict = cards.reduce((acc, card) => {
    const { domain, subdomain, topic } = card;
    if (!acc[domain]) {
        acc[domain] = { [subdomain]: { [topic]: true } }
    } else if (!acc[domain][subdomain]) {
        const subdomains = acc[domain];
        acc = { ...acc, [domain]: { ...subdomains, [subdomain]: { [topic]: true } } }
    } else if (!acc[domain][subdomain][topic]) {
        const subdomains = acc[domain];
        const topics = acc[domain][subdomain];
        acc = { ...acc, [domain]: { ...subdomains, [subdomain]: { ...topics, [topic]: true } } }
    }
    return acc;
}, {});

export const tabs = Object.keys(dict).map(domain => {
    const subdomains = Object.keys(dict[domain]).map(subdomain => {
        const topics = Object.keys(dict[domain][subdomain]).map(topic => ({ tabName: topic }));
        return { tabName: subdomain, content: topics };
    });
    return { tabName: domain, content: subdomains };
});




/*
export const tabs = [
    {
        tabName: "Programming languages", content:
            [
                {
                    tabName: "C++",
                    content: [
                        { tabName: "Operators" },
                        { tabName: "Variables" }
                    ]
                },
                {
                    tabName: "Python",
                    content: [
                        { tabName: "Decorators" },
                        { tabName: "Classes" }
                    ]
                },
                {
                    tabName: "C#",
                    content: [
                        { tabName: "Garbage collection" },
                        { tabName: "Variables" }
                    ]
                },
            ]
    }
]
*/

// export tabs;