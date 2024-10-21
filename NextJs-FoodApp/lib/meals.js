import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'

const db = sql('meals2.db')

export default function getMeals(){
    return db.prepare('SELECT * from meals2').all()
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals2 where slug = ? ').get(slug)
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower:true})
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const filename = `${meal.slug}.${extension}`
    const stream = fs.createWriteStream(`public/images/${filename}`)
    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error('Saving image failed')
        }
    })
    meal.image = `/images/${filename}`

    db.prepare(`
        INSERT INTO meals2 (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug) 
        `).run(meal)
}   