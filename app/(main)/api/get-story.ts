import Story from "./Story"

export async function getAllStories() {
    const response = await fetch('http://localhost:9090/story')
    return { stories: await response.json() as Story[] }
}
