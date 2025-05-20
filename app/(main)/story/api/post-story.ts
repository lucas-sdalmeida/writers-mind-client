import Story from "../model/Story";

export async function postStory(story: Story) {
    const response = await fetch('http://localhost:9090/story', {
        method: 'POST',
        body: JSON.stringify(story),
    })
    return { code: response.status, content: await response.json() }
}