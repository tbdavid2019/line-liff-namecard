function createAnnouncement(data) {
    return {
        type: 'bubble',
        hero: {
            type: 'image',
            url: data.imageUrl,
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'cover',
            action: {
                type: 'uri',
                uri: data.url
            }
        },
        body: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'text',
                    text: data.title,
                    weight: 'bold',
                    size: 'xl'
                },
                {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'lg',
                    spacing: 'sm',
                    contents: [
                        {
                            type: 'box',
                            layout: 'baseline',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'text',
                                    text: 'Place',
                                    color: '#aaaaaa',
                                    size: 'sm',
                                    flex: 1
                                },
                                {
                                    type: 'text',
                                    text: data.place,
                                    wrap: true,
                                    color: '#666666',
                                    size: 'sm',
                                    flex: 5
                                }
                            ]
                        },
                        {
                            type: 'box',
                            layout: 'baseline',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'text',
                                    text: 'Time',
                                    color: '#aaaaaa',
                                    size: 'sm',
                                    flex: 1
                                },
                                {
                                    type: 'text',
                                    text: data.time,
                                    wrap: true,
                                    color: '#666666',
                                    size: 'sm',
                                    flex: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'text',
                    text: data.description,
                    wrap: true,
                    color: '#666666',
                    size: 'sm',
                    margin: 'md'
                }
            ]
        },
        footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
                {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                        type: 'uri',
                        label: 'WEBSITE',
                        uri: data.url
                    }
                },
                {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                        type: 'uri',
                        label: 'SHARE',
                        uri: 'https://line.me/R/nv/recommendOA/@790mnyda'
                    }
                },
                {
                    type: 'spacer',
                    size: 'sm'
                }
            ],
            flex: 0
        }
    }
}

function createStaffList(data) {
    const peopleBubbles = data.people.map(person => ({
        type: 'box',
        layout: 'horizontal',
        contents: [
            {
                type: 'text',
                text: person.name,
                size: 'sm',
                color: '#555555',
                flex: 1
            },
            {
                type: 'text',
                text: person.time,
                size: 'sm',
                color: '#111111',
                align: 'end',
                flex: 2
            }
        ]
    }))

    return {
        type: 'bubble',
        body: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'text',
                    text: data.title,
                    weight: 'bold',
                    size: 'xl'
                },
                {
                    type: 'text',
                    text: data.activity,
                    size: 'xs',
                    color: '#aaaaaa',
                    margin: 'xs'
                },
                {
                    type: 'separator',
                    margin: 'md'
                },
                {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'md',
                    spacing: 'sm',
                    contents: peopleBubbles
                }
            ]
        },
        footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'button',
                    action: {
                        type: 'uri',
                        label: 'Location',
                        uri: data.map
                    }
                },
                {
                    type: 'button',
                    action: {
                        type: 'uri',
                        label: 'Website',
                        uri: data.url
                    }
                }
            ]
        }
    }
}

function createCard(data) {
    return {
        type: 'bubble',
        body: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'image',
                    url: data.back,
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '1:1',
                    gravity: 'center'
                },
                {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                        {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                                {
                                    type: 'image',
                                    url: data.avatar,
                                    aspectMode: 'cover',
                                    size: 'full'
                                }
                            ],
                            cornerRadius: '100px',
                            width: '72px',
                            height: '72px'
                        },
                        {
                            type: 'text',
                            text: data.title,
                            size: 'xl',
                            weight: 'bold',
                            margin: 'md'
                        },
                        {
                            type: 'text',
                            text: data.description,
                            size: 'sm',
                            color: '#999999',
                            margin: 'xs',
                            wrap: true
                        },
                        {
                            type: 'button',
                            action: {
                                type: 'uri',
                                label: 'Follow',
                                uri: data.followUrl
                            },
                            style: 'secondary',
                            margin: 'md'
                        }
                    ],
                    position: 'absolute',
                    offsetBottom: '0px',
                    offsetStart: '0px',
                    offsetEnd: '0px',
                    backgroundColor: '#ffffffaa',
                    paddingAll: '20px',
                    paddingTop: '18px'
                }
            ],
            paddingAll: '0px'
        }
    }
}

function createNews(data) {
    return {
        type: 'bubble',
        size: 'micro',
        hero: {
            type: 'image',
            url: data.image,
            size: 'full',
            aspectMode: 'cover',
            aspectRatio: '320:213'
        },
        body: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'text',
                    text: data.tag,
                    weight: 'bold',
                    color: '#1DB446',
                    size: 'sm'
                },
                {
                    type: 'text',
                    text: data.description,
                    weight: 'bold',
                    size: 'sm',
                    margin: 'md',
                    wrap: true,
                    maxLines: 2
                },
                {
                    type: 'text',
                    text: data.date,
                    size: 'xs',
                    color: '#aaaaaa',
                    margin: 'xs',
                    align: 'end'
                }
            ],
            action: {
                type: 'uri',
                uri: data.link
            },
            paddingAll: '13px'
        }
    }
}

module.exports = function transform(input) {
    const { data } = input
    data.template = String(data.template) // Ensure string comparison

    let flexContent = null

    if (data.template === '1') {
        flexContent = createAnnouncement(data)
    } else if (data.template === '2') {
        flexContent = createStaffList(data)
    } else if (data.template === '3') {
        flexContent = createCard(data)
    } else if (data.template === '4') {
        flexContent = createNews(data)
    } else {
        // Fallback or Error
        return { error: 'Unknown template type' }
    }

    // Wrap in Flex Container
    return {
        type: 'flex',
        altText: data.title || 'Flex Message',
        contents: flexContent
    }
}
