import { input } from '@inquirer/prompts'
import fs from 'fs'
import https from 'https'
import sharp from 'sharp'
import utils from '../utils.js'

export default async (__siteroot) => {
    const projectUrl = await input({ message: 'Link' })
    const imageName = await input({ message: 'Image Name' })
    let projects = utils.getProjectsData(__siteroot)

    let newProject = await utils.fetchPageData(projectUrl, ['title', 'image', 'description'])
    const imageUrl = newProject.image
    
    newProject.link = projectUrl
    newProject.image = imageName

    https.get(imageUrl, (res) => {
        const path = `${__siteroot}/src/assets/projects/${imageName}.jpg`
        const tempPath = `${__siteroot}/src/assets/projects/${imageName}-tmp.jpg`
        const filePath = fs.createWriteStream(tempPath)
        res.pipe(filePath)
        filePath.on('finish',() => {
            filePath.close()
            sharp(tempPath)
                .resize(600)
                .toFile(path)
                .then(() => {
                    fs.unlinkSync(tempPath)
                    projects.featured.unshift(newProject)
                    projects.featured.pop()
                    projects.current.splice(1, 0, newProject)

                    fs.writeFileSync(`${__siteroot}/src/_data/site/projects.json`, JSON.stringify(projects, null, 2), { flag: "w" })
                })
        })
    })
}