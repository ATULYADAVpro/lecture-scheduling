import { connect } from 'mongoose'

async function connectDb() {
    try {
        await connect(process.env.DB_URL)
        console.log(`Database connect success`)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDb;